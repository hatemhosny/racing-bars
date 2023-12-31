import fs from 'fs/promises';
import path from 'path';

const patchTypes = async () => {
  const dtsPath = 'build/racing-bars.d.ts';
  const content = await fs.readFile(path.resolve(dtsPath), 'utf-8');
  const patched = content
    .replace('declare module "index"', 'declare module "racing-bars"')
    .replace('from "index"', 'from "racing-bars"')
    .replace('declare module "react"', 'declare module "racing-bars/react"')
    .replace('declare module "vue"', 'declare module "racing-bars/vue"');
  fs.writeFile(path.resolve(dtsPath), patched);
};

patchTypes();
