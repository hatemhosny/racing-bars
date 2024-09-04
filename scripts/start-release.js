import { confirm, input, select } from '@inquirer/prompts';
import conventionalChangelog from 'conventional-changelog';

import fs from 'fs';
import { execSync } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pkgPath = '../src/package.lib.json';
const changelogPath = '../CHANGELOG.md';

const pkg = require(pkgPath);

const checkIsDevelop = () => {
  const gitBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().replace(/\n/g, '');
  if (gitBranch !== 'develop') {
    console.log('Can only prepare a release from branch: develop');
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

const specifyVersion = () =>
  input({
    message: 'Please specify the new version:',
    validate(value) {
      const parts = value.split('.');
      if (parts.length !== 3) return false;
      for (const part of parts) {
        if (isNaN(Number(part))) return false;
      }
      return true;
    },
  });

const bumpVersion = (oldVersion, libBump) => {
  if (!libBump) return;
  let [major, minor, patch] = oldVersion.split('.');
  if (libBump === 'major') {
    major = String(Number(major) + 1);
    minor = '0';
    patch = '0';
  }
  if (libBump === 'minor') {
    minor = String(Number(minor) + 1);
    patch = '0';
  }
  if (libBump === 'patch') {
    patch = String(Number(patch) + 1);
  }
  return `${major}.${minor}.${patch}`;
};

const suggestBump = (releaseNotes) => {
  if (releaseNotes.includes('### BREAKING CHANGES')) {
    return { bump: 'major', message: 'Has breaking changes!' };
  }
  if (releaseNotes.includes('### Features')) {
    return { bump: 'minor', message: 'Includes new feature(s)' };
  }
  return { bump: 'patch', message: '' };
};

const getBump = async (defaultBump = {}) => {
  const message = defaultBump.message ? ` (${defaultBump.message})` : '';
  const bump = await select({
    message: `Library version upgrade:${message}`,
    default: defaultBump.bump,
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
    return confirmCancel(() => getBump(defaultBump));
  }
  return bump;
};

const stringify = (obj) => JSON.stringify(obj, null, 2) + '\n';

const confirmCancel = async (continueFn) => {
  if (await confirm({ message: 'Do you want to cancel release and discard all changes?' })) {
    execSync(`git reset --hard`);
    console.log('Release cancelled!');
    process.exit(1);
  }
  return continueFn();
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

const writeChangelog = async (releaseNotes, version) => {
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
  };
  return waitForApproval();
};

const changeVersion = async (libBump) => {
  pkg.version = libBump === 'specify' ? await specifyVersion() : bumpVersion(pkg.version, libBump);
  const version = 'v' + pkg.version;
  if (!(await confirm({ message: `Creating version: ${version}\nProceed?` }))) {
    return confirmCancel(async () => changeVersion(await getBump()));
  }
  fs.writeFileSync(new URL(pkgPath, import.meta.url), stringify(pkg), 'utf8');
  return version;
};

const pushReleaseBranch = (version) => {
  const branchName = 'releases/' + version;
  execSync(`git checkout -b ${branchName}`);
  execSync(`git add -A && git commit -m "release: ${version}"`);
  execSync(`git push -u origin ${branchName}`);
};

const run = async () => {
  // checkIsDevelop();
  // checkIsClean();
  const releaseNotes = await getReleaseNotes();
  const suggestedBump = suggestBump(releaseNotes);
  const libBump = await getBump(suggestedBump);
  const version = await changeVersion(libBump);
  writeChangelog(releaseNotes, version);
  pushReleaseBranch(version);
};

run();
