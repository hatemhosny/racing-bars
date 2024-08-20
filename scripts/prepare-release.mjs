import { confirm, input, select } from '@inquirer/prompts';
import conventionalChangelog from 'conventional-changelog';

import fs from 'fs';
import { execSync } from 'child_process';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkgPath = '../src/package.lib.json';
const changelogPath = '../CHANGELOG.md';

const pkg = require(pkgPath);

const gitBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().replace(/\n/g, '');
if (gitBranch !== 'develop') {
  console.log('Can only prepare a release from branch: develop');
  process.exit(1);
}

const gitStatus = execSync('git status -s').toString().replace(/\n/g, '').trim();
if (gitStatus) {
  console.log('Please commit changes before starting a release.');
  process.exit(1);
}

const getVersion = () =>
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

const bumpVersion = (libBump) => {
  if (!libBump) return;
  let [major, minor, patch] = pkg.version.split('.');
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

const getBump = () =>
  select({
    message: 'Library version upgrade:',
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
    ],
  });

const stringify = (obj) => JSON.stringify(obj, null, 2) + '\n';

const cancelRelease = async () => {
  if (await confirm({ message: 'Cancelling release. Do you want to discard all changes?' })) {
    execSync(`git reset --hard && git clean -fxd`);
  }
  console.log('Release cancelled!');
  process.exit(1);
};

(async () => {
  const libBump = await getBump();
  const version = libBump === 'specify' ? await getVersion() : bumpVersion(libBump);
  pkg.version = version;
  if (!(await confirm({ message: `Creating library version: ${version}\nProceed?` }))) {
    await cancelRelease();
  }
  fs.writeFileSync(new URL(pkgPath, import.meta.url), stringify(pkg), 'utf8');

  const changelog = fs.readFileSync(new URL(changelogPath, import.meta.url), 'utf8');
  const changelogSeparator = '\n---';
  const [changelogHeader, ...prevLogs] = changelog.split(changelogSeparator);

  const releaseChangelog = await streamToString(
    conventionalChangelog({
      preset: 'angular',
    }),
  ).then((str) => {
    return '\n\n#' + str.replace('[0.0.0]', `[${version}]`).replace('v0.0.0', `${version}`);
  });

  const newChangelog = [changelogHeader, releaseChangelog, ...prevLogs].join(changelogSeparator);
  fs.writeFileSync(new URL(changelogPath, import.meta.url), newChangelog, 'utf8');

  if (!(await confirm({ message: `Change log added to ./CHANGELOG.md\nProceed?` }))) {
    await cancelRelease();
  }
})();

function streamToString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
}
