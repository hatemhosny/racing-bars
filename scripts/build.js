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

  if (devMode) {
    return rfs.copy(source, destination);
  }

  const cssnano = cssnanoPlugin({ preset: 'default' });
  const files = await fs.readdir(source);
  return Promise.all(
    files.map(async (file) => {
      const css = await fs.readFile(path.join(source, file));
      const result = await postcss([cssnano]).process(css, {
        from: path.join(source, file),
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

const copyLibToWebsite = async () => {
  const source = path.resolve('build');
  const destination = path.resolve('website/static/lib');
  return rfs.copy(source, destination);
};

const copyPackageJson = async () => {
  const source = path.resolve('src/package.lib.json');
  const destination = path.resolve('build/package.json');
  return fs.copyFile(source, destination);
};

Promise.all([cssBuild(), workerBuild()])
  .then(() => Promise.all([iifeBuild(), esmBuild(), reactBuild(), vueBuild()]))
  .then(() => Promise.all([copyLibToWebsite(), copyPackageJson()]));
