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

  const stringify = (obj: Partial<Options>) => JSON.stringify(obj, null, 2);

  const jsCode = `
import { createPlayground } from 'livecodes';

const options = ${stringify(options)};
createPlayground('#container', options);

`.trimStart();

  const tsCode = `
import { createPlayground, type EmbedOptions } from 'livecodes';

const options: EmbedOptions = ${stringify(options)};
createPlayground('#container', options);

`.trimStart();

  const reactCode = `
import LiveCodes from 'livecodes/react';

export default function App() {
  const options = ${stringify(options)};
  return (<LiveCodes {...options}></LiveCodes>);
}

`.trimStart();

  const vueCode = `
<script setup>
import LiveCodes from "livecodes/vue";

const options = ${stringify(options)};
</script>
<template>
  <LiveCodes v-bind="options" />
</template>

`;

  const svelteCode = `
<script>
import { onMount } from 'svelte';
import { createPlayground } from 'livecodes';

const options = ${stringify(options)};
let container;
onMount(() => {
  createPlayground(container, options);
});
</script>

<div bind:this="{container}"></div>

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
