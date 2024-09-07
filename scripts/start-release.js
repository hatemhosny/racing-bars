import { confirm, input, select } from '@inquirer/prompts';
import conventionalChangelog from 'conventional-changelog';

import fs from 'fs';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pkgPath = '../src/package.lib.json';
const changelogPath = '../CHANGELOG.md';

const pkg = require(pkgPath);
const originalVersion = pkg.version;
const stringify = (obj) => JSON.stringify(obj, null, 2) + '\n';

const confirmCancel = async (continueFn) => {
  if (await confirm({ message: 'Do you want to cancel release and discard all changes?' })) {
    execSync(`git reset --hard`);
    console.log('Release cancelled!');
    process.exit(1);
  }
  return continueFn();
};

const checkIsDevelop = () => {
  const gitBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().replace(/\n/g, '');
  if (gitBranch !== 'develop') {
    console.log('Can only start a release from branch: develop');
    process.exit(1);
  }
};

const checkIsClean = () => {
  const gitStatus = execSync('git status -s').toString().replace(/\n/g, '').trim();
  if (gitStatus) {
    console.log('Please commit changes before starting a release.');
    process.exit(1);
  }
};

const performChecks = async () => {
  checkIsDevelop();
  checkIsClean();
};

const bumpVersion = (oldVersion, bump) => {
  if (!bump) return;
  let [major, minor, patch] = oldVersion.split('.');
  if (bump === 'major') {
    major = String(Number(major) + 1);
    minor = '0';
    patch = '0';
  }
  if (bump === 'minor') {
    minor = String(Number(minor) + 1);
    patch = '0';
  }
  if (bump === 'patch') {
    patch = String(Number(patch) + 1);
  }
  return `${major}.${minor}.${patch}`;
};

const specifyVersion = () =>
  input({
    message: 'Please specify the new version:',
    validate(value) {
      const version = value.startsWith('v') ? value.slice(1) : value;
      const parts = version.split('.');
      if (parts.length !== 3) return false;
      for (const part of parts) {
        if (isNaN(Number(part))) return false;
      }
      const originalVersionParts = originalVersion.split('.');
      if (Number(parts[0]) > Number(originalVersionParts[0])) return true;
      if (Number(parts[1]) > Number(originalVersionParts[1])) return true;
      if (Number(parts[2]) > Number(originalVersionParts[2])) return true;
      return false;
    },
  });

const getBump = async (releaseNotes) => {
  const suggestedBump = releaseNotes.includes('### BREAKING CHANGES')
    ? 'major'
    : releaseNotes.includes('### Features')
      ? 'minor'
      : 'patch';
  const hint =
    suggestedBump === 'major'
      ? ' (has breaking changes!)'
      : suggestedBump === 'minor'
        ? ' (includes new feature(s))'
        : '';

  const bump = await select({
    message: `Library version upgrade:${hint}`,
    default: suggestedBump,
    choices: [
      {
        name: 'Major',
        value: 'major',
      },
      {
        name: 'Minor',
        value: 'minor',
      },
      {
        name: 'Patch',
        value: 'patch',
      },
      {
        name: 'Specify version',
        value: 'specify',
      },
      {
        name: 'Cancel',
        value: 'cancel',
      },
    ],
  });
  if (bump === 'cancel') {
    return confirmCancel(() => getBump(releaseNotes));
  }
  return bump;
};

const changeVersion = async (releaseNotes) => {
  const bump = await getBump(releaseNotes);
  const selectedVersion =
    bump === 'specify' ? await specifyVersion() : bumpVersion(originalVersion, bump);
  const version = selectedVersion?.startsWith('v') ? selectedVersion.slice(1) : selectedVersion;
  const versionName = 'v' + version;
  pkg.version = version;
  if (!(await confirm({ message: `Creating version: ${versionName}\nProceed?` }))) {
    return confirmCancel(async () => changeVersion(releaseNotes));
  }
  fs.writeFileSync(new URL(pkgPath, import.meta.url), stringify(pkg), 'utf8');
  return releaseNotes;
};

const streamToString = (stream) => {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
};

const getReleaseNotes = async () =>
  streamToString(
    conventionalChangelog({
      preset: 'angular',
    }),
  );

const writeChangelog = async (releaseNotes) => {
  const version = 'v' + pkg.version;
  const changelog = fs.readFileSync(new URL(changelogPath, import.meta.url), 'utf8');
  const changelogSeparator = '\n---';
  const [changelogHeader, ...prevLogs] = changelog.split(changelogSeparator);
  const releaseChangelog =
    '\n\n#' + releaseNotes.replace('[0.0.0]', `[${version}]`).replace('v0.0.0', `${version}`);
  const newChangelog = [changelogHeader, releaseChangelog, ...prevLogs].join(changelogSeparator);
  fs.writeFileSync(new URL(changelogPath, import.meta.url), newChangelog, 'utf8');

  const waitForApproval = async () => {
    if (!(await confirm({ message: `Change log added to ./CHANGELOG.md\nProceed?` }))) {
      return confirmCancel(waitForApproval);
    }
    return version;
  };
  return waitForApproval();
};

const pushReleaseBranch = (version) => {
  if (!version) {
    console.log('Invalid version. Aborting.');
    process.exit(1);
  }
  const branchName = 'releases/' + version;
  execSync(`git checkout -b ${branchName}`);
  execSync(`git add -A && git commit -m "release: ${version}"`);
  execSync(`git push -u origin ${branchName}`);
};

const run = async () => {
  performChecks()
    .then(getReleaseNotes)
    .then(changeVersion)
    .then(writeChangelog)
    .then(pushReleaseBranch);
};

run();
