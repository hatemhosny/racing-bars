---
title: Vue
---

A wrapper Vue 3 component is available for using RacingBars in Vue applications.

## Installation

```shell
npm install racing-bars
```

## Import

```js
import RacingBars from 'racing-bars/vue';
```

## Props

The Vue component accepts all [chart options](/documentation/options) plus the following component-specific props:

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `Data[] \| WideData[]` | — | Data array. If provided, `dataUrl` is ignored. |
| `dataUrl` | `string` | — | URL to fetch data from. Ignored if `data` is provided. |
| `dataType` | `'json' \| 'csv' \| 'tsv' \| 'xml'` | `'json'` | Type of data fetched from URL. |
| `elementId` | `string` | auto-generated | An `id` to assign to the container `<div>`. |
| `className` | `string` | `''` | A CSS class to assign to the container `<div>`. |
| `style` | `Record<string, string>` | `{}` | Inline styles for the container `<div>`. |
| `callback` | `(racer: Race, data: Data[]) => void` | — | Function called after the chart loads. Receives the chart API object and the data. |

## Usage

### Using dataUrl

```html
<script setup>
import RacingBars from 'racing-bars/vue';
</script>

<template>
  <RacingBars
    dataUrl="/data/population.json"
    title="World Population"
  >
    Loading...
  </RacingBars>
</template>
```

### Using data prop

```html
<script setup>
import RacingBars from 'racing-bars/vue';

const data = [
  { name: 'China', value: 1444216107, date: '2023' },
  { name: 'India', value: 1403800000, date: '2023' },
  { name: 'USA', value: 335893238, date: '2023' },
];
</script>

<template>
  <RacingBars :data="data" title="World Population" />
</template>
```

### Using callback

```html
<script setup>
import RacingBars from 'racing-bars/vue';

const handleCallback = (racer, data) => {
  console.log('Data:', data);
  racer.play();
  racer.on('dateChange', (date) => {
    console.log('Current date:', date);
  });
};
</script>

<template>
  <RacingBars
    dataUrl="/data/population.json"
    :callback="handleCallback"
    title="World Population"
  />
</template>
```

### With TypeScript

```html
<script setup lang="ts">
import RacingBars from 'racing-bars/vue';
import type { Race, Data } from 'racing-bars';

const handleCallback = (racer: Race, data: Data[]) => {
  console.log('Chart loaded with', data.length, 'rows');
  racer.play();
};
</script>

<template>
  <RacingBars
    dataUrl="/data/population.json"
    title="World Population"
    :callback="handleCallback"
    :loop="true"
    :topN="10"
    :tickDuration="500"
  />
</template>
```

### With className and style

```html
<script setup>
import RacingBars from 'racing-bars/vue';
</script>

<template>
  <RacingBars
    dataUrl="/data/population.json"
    className="my-chart"
    :style="{ height: '600px', border: '1px solid #ccc' }"
    title="World Population"
  />
</template>
```

### Changing Options at Runtime

The component automatically detects prop changes and updates the chart via `changeOptions()`.

```html
<script setup>
import { ref } from 'vue';
import RacingBars from 'racing-bars/vue';

const topN = ref(10);
</script>

<template>
  <div>
    <label>
      Top N:
      <input type="range" min="5" max="20" v-model.number="topN" />
      {{ topN }}
    </label>
    <RacingBars
      dataUrl="/data/population.json"
      title="World Population"
      :topN="topN"
    />
  </div>
</template>
```

### Multiple Charts

```html
<script setup>
import RacingBars from 'racing-bars/vue';
</script>

<template>
  <div>
    <RacingBars
      dataUrl="/data/population.json"
      title="Population"
      elementId="chart1"
      :loop="true"
    />
    <RacingBars
      dataUrl="/data/gdp.json"
      title="GDP"
      elementId="chart2"
      theme="dark"
      :loop="true"
    />
  </div>
</template>
```

## Notes

- The component accepts all chart options as props. See the [Options documentation](/documentation/options) for the full list.
- When `data` or `dataUrl` changes, the chart is re-created from scratch.
- Other prop changes are applied via `changeOptions()` without re-fetching data.
- Boolean props should be bound with `:` (e.g., `:loop="true"`) since Vue treats attribute values as strings by default.
- The default slot content is rendered inside the container and replaced by the chart once it loads.
