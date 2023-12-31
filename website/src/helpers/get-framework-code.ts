import type { Props } from '../../../src';

export const getFrameworkCode = (
  options: any,
  dynamicProps: Partial<Record<keyof Props, string>> = {},
) => {
  const dataUrl = options.dataUrl || '';

  const stringify = (obj: Partial<Props>) => JSON.stringify(obj, null, 2);

  const dynamicPropsTokens = Object.keys(dynamicProps).reduce(
    (acc, key) => ({ ...acc, [key]: `___${key}___` }),
    {},
  );

  options = { ...options, ...dynamicPropsTokens };

  const getOptions = (options: any, lang: 'js' | 'ts' | 'react' | 'vue' | 'svelte') => {
    const { data, dataUrl, ...codeOptions } = options;
    if (lang === 'react') {
      return `const options = ${stringify({ dataUrl, ...codeOptions })};`;
    }
    if (lang === 'vue') {
      return `\nconst options = ${stringify({ dataUrl, ...codeOptions })};`;
    }
    if (Object.keys(codeOptions).length === 0) return '\n';
    if (lang === 'ts') {
      return `\nconst options: Options = ${stringify(codeOptions)};`;
    }
    return `\nconst options = ${stringify(codeOptions)};`;
  };

  const getOptionsCode = (options: any, lang: 'js' | 'ts' | 'react' | 'vue' | 'svelte') => {
    let code = getOptions(options, lang);
    Object.keys(dynamicProps).forEach((key) => {
      code = code
        .replace(`"___${key}___"`, dynamicProps[key])
        .replace(`'___${key}___'`, dynamicProps[key])
        .replace(`\`___${key}___\``, dynamicProps[key]);
    });
    return code;
  };
  const getOptionsParam = (options: any, lang: 'js' | 'ts' | 'react' | 'vue' | 'svelte') => {
    if (getOptionsCode(options, lang) === '\n') return '';
    return `, options`;
  };

  const getOptionsType = (options: any, lang: 'js' | 'ts' | 'react' | 'vue' | 'svelte') => {
    if (getOptionsCode(options, lang) === '\n') return '';
    return `, type Options`;
  };

  const jsCode = `
import { race } from "racing-bars";
${getOptionsCode(options, 'js')}
race("${dataUrl}", "#race"${getOptionsParam(options, 'js')});
`.trimStart();

  const tsCode = `
import { race${getOptionsType(options, 'ts')} } from "racing-bars";
${getOptionsCode(options, 'ts')}
race("${dataUrl}", "#race"${getOptionsParam(options, 'ts')});
`.trimStart();

  const reactCode = `
import RacingBars from "racing-bars/react";

export default function App() {
  ${getOptionsCode(options, 'react')}
  return (<RacingBars {...options}>Loading...</RacingBars>);
}
`.trimStart();

  const vueCode = `
<script setup>
import RacingBars from "racing-bars/vue";
${getOptionsCode(options, 'vue')}
</script>
<template>
  <RacingBars v-bind="options">Loading...</RacingBars>
</template>
`.trimStart();

  const svelteCode = `
<script>
import { onMount } from "svelte";
import { race } from "racing-bars";
${getOptionsCode(options, 'svelte')}
onMount(() => {
  race("${dataUrl}", "#race"${getOptionsParam(options, 'svelte')});
});
</script>

<div id="race">Loading...</div>
`.trimStart();

  return {
    jsCode,
    tsCode,
    reactCode,
    vueCode,
    svelteCode,
  };
};
