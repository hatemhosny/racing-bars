import * as esbuild from 'esbuild';

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

const workerBuild = () =>
  esbuild.build({
    ...baseOptions,
    entryPoints: ['src/lib/worker/index.ts'],
    outfile: 'build/racing-bars.worker.js',
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

workerBuild().then(() => {
  iifeBuild();
  esmBuild();
  reactBuild();
  vueBuild();
});
