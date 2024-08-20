import fs from 'fs/promises';
import path from 'path';
import rfs from 'recursive-fs';
import * as esbuild from 'esbuild';
import postcss from 'postcss';
import cssnanoPlugin from 'cssnano';

const args = process.argv.slice(2);
const devMode = args.includes('--dev');

/** @type {Partial<esbuild.BuildOptions>} */
const baseOptions = {
  bundle: true,
  minify: devMode ? false : true,
  format: 'esm',
  target: 'es2020',
  sourcemap: devMode ? 'external' : false,
  loader: { '.worker.js': 'text', '.css': 'text' },
  // logLevel: 'error',
};

const cssBuild = async () => {
  const source = path.resolve('src/lib/css');
  const destination = path.resolve('tmp');

  await rfs.copy(source, destination);
  if (devMode) return;

  const cssnano = cssnanoPlugin({ preset: 'default' });
  const files = await fs.readdir(destination);
  return Promise.all(
    files
      .filter((file) => path.extname(file) === '.css')
      .map(async (file) => {
        const css = await fs.readFile(path.join(destination, file), 'utf-8');
        const result = await postcss([cssnano]).process(css, {
          from: path.join(destination, file),
          to: path.join(destination, file),
        });
        await fs.writeFile(path.join(destination, file), result.css);
      }),
  );
};

const workerBuild = () =>
  esbuild.build({
    ...baseOptions,
    entryPoints: ['src/lib/worker/index.ts'],
    outfile: 'tmp/racing-bars.worker.js',
    format: 'iife',
  });

const iifeBuild = () =>
  esbuild.build({
    ...baseOptions,
    entryPoints: ['src/index.ts'],
    outfile: 'build/racing-bars.umd.js',
    format: 'iife',
    globalName: 'racingBars',
    define: {
      'process.env.SCRIPT_URL': `document.currentScript.src`,
    },
  });

const esmBuild = () =>
  esbuild.build({
    ...baseOptions,
    entryPoints: ['src/index.ts'],
    outfile: 'build/racing-bars.js',
  });

const reactBuild = () =>
  esbuild.build({
    ...baseOptions,
    entryPoints: ['src/react.tsx'],
    outfile: 'build/react.js',
    external: ['react', 'react-dom'],
    jsx: 'automatic',
  });

const vueBuild = () =>
  esbuild.build({
    ...baseOptions,
    entryPoints: ['src/vue.ts'],
    outfile: 'build/vue.js',
    external: ['vue'],
    alias: {
      '@vue/runtime-core': 'vue',
    },
  });

const copyFiles = async () => {
  await fs.copyFile(path.resolve('src/package.lib.json'), path.resolve('build/package.json'));
  await fs.copyFile(path.resolve('README.md'), path.resolve('build/README.md'));
  await fs.copyFile(path.resolve('LICENSE'), path.resolve('build/LICENSE'));
};

const copyLibToWebsite = async () => {
  const source = path.resolve('build');
  const destination = path.resolve('website/static/lib');
  return rfs.copy(source, destination);
};

Promise.all([cssBuild(), workerBuild()])
  .then(() => Promise.all([iifeBuild(), esmBuild(), reactBuild(), vueBuild()]))
  .then(() => copyFiles())
  .then(() => copyLibToWebsite());
