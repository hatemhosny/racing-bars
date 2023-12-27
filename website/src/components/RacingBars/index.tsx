import React from 'react';
import type { Options, Props } from '../../../../src/index';
import RacingBarsReact from '../../../../build/react';
import ShowCode from '../ShowCode';
import styles from './styles.module.css';

export default function RacingBars(
  props: Props & {
    style?: Record<string, string>;
    className?: string;
    showCode?: 'open' | 'closed' | false;
  },
): JSX.Element {
  const { className, style, showCode, ...options } = props;
  const { data, dataUrl, dataType = 'json', ...codeOptions } = options;
  const loadDataParams = dataType === 'json' ? `"${dataUrl}"` : `"${dataUrl}", "${dataType}"`;

  const stringify = (obj: Partial<Options>) => JSON.stringify(obj, null, 2);

  const jsCode = `
import { loadData, race } from "racing-bars";

const options = ${stringify({ selector: '#race', ...codeOptions })};
loadData(${loadDataParams}).then((data) => {
  race(data, options);
});
`.trimStart();

  const tsCode = `
import { loadData, race, type Options } from "racing-bars";

const options: Options = ${stringify({ selector: '#race', ...codeOptions })};
loadData(${loadDataParams}).then((data) => {
  race(data, options);
});
`.trimStart();

  const reactCode = `
import RacingBars from "racing-bars/react";

export default function App() {
  const options = ${stringify(options)};
  return (<RacingBars {...options}></RacingBars>);
}
`.trimStart();

  const vueCode = `
<script setup>
import RacingBars from "racing-bars/vue";

const options = ${stringify(options)};
</script>
<template>
  <RacingBars v-bind="options" />
</template>
`.trimStart();

  const svelteCode = `
<script>
import { onMount } from "svelte";
import { loadData, race } from "racing-bars";

const options = ${stringify({ selector: '#race', ...codeOptions })};
onMount(() => {
  loadData(${loadDataParams}).then((data) => {
    race(data, options);
  });
});
</script>

<div id="race"></div>
`.trimStart();

  const RacingBarsComp = RacingBarsReact as React.ComponentType<Props>;
  return (
    <div className={styles.container}>
      <RacingBarsComp
        className={`${props.className} racing-bars`}
        style={{
          height: options.height || '80vh',
          ...props.style,
        }}
        {...options}
      ></RacingBarsComp>
      {props.showCode !== false && (
        <ShowCode
          js={jsCode}
          ts={tsCode}
          react={reactCode}
          vue={vueCode}
          svelte={svelteCode}
          open={props.showCode === 'open'}
        ></ShowCode>
      )}
    </div>
  );
}
