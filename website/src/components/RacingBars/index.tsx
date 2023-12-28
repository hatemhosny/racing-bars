import React from 'react';
import type { Options, Props } from '../../../../src/index';
import RacingBarsReact from '../../../../build/react';
import ShowCode from '../ShowCode';
import styles from './styles.module.css';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function RacingBars(
  props: Props & {
    style?: Record<string, string>;
    className?: string;
    showCode?: 'open' | 'closed' | false;
  },
): JSX.Element {
  const stringify = (obj: Partial<Options>) => JSON.stringify(obj, null, 2);
  const { className, style, showCode, ...options } = props;
  const dataUrl = options.dataUrl || '';

  const getOptionsCode = (options: any, lang: 'js' | 'ts' | 'react' | 'vue' | 'svelte') => {
    const { data, dataUrl, ...codeOptions } = options;
    if (lang === 'ts') {
      return `\nconst options: Options = ${stringify(codeOptions)};`;
    }
    if (lang === 'react') {
      return `const options = ${stringify({ dataUrl, ...codeOptions })};`;
    }
    if (lang === 'vue') {
      return `\nconst options = ${stringify({ dataUrl, ...codeOptions })};`;
    }
    return `\nconst options = ${stringify(codeOptions)};`;
  };

  const jsCode = `
import { race } from "racing-bars";
${getOptionsCode(options, 'js')}
race("${dataUrl}", "#race", options);
`.trimStart();

  const tsCode = `
import { race, type Options } from "racing-bars";
${getOptionsCode(options, 'ts')}
race("${dataUrl}", "#race", options);
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
  race("${dataUrl}", "#race", options);
});
</script>

<div id="race">Loading...</div>
`.trimStart();

  return (
    <BrowserOnly>
      {() => {
        const RacingBarsComp = RacingBarsReact as React.ComponentType<
          Props & { children?: React.ReactNode }
        >;
        return (
          <div className={styles.container}>
            <RacingBarsComp
              className={`${props.className} racing-bars`}
              style={{
                height: options.height || '80vh',
                ...props.style,
              }}
              {...options}
            >
              Loading ...
            </RacingBarsComp>
            {props.showCode !== false && (
              <ShowCode
                js={jsCode}
                ts={tsCode}
                react={reactCode}
                vue={vueCode}
                svelte={svelteCode}
                open={props.showCode !== 'closed'}
              ></ShowCode>
            )}
          </div>
        );
      }}
    </BrowserOnly>
  );
}
