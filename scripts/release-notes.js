import fs from 'fs';
import path from 'path';

const changelog = fs.readFileSync(path.resolve('./CHANGELOG.md'), 'utf8');
const changelogSeparator = '\n---';
const [_changelogHeader, releaseLog, ..._prevLog] = changelog.split(changelogSeparator);
fs.writeFileSync(path.resolve('./CHANGELOG.tmp.md'), releaseLog, 'utf8');
