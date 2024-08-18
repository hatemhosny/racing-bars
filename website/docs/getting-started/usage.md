---
title: Usage
---

## JavaScript Library

After [installation](./installation.md), you can use the library in JavaScript as follows:

### `race`

The library exports the [`race`](../documentation/api.md#race) function, which creates the bar chart race. It has the following signature:

Type: [`race(data, container?, options?): Promise<Race>`](/api/modules.md#race)

The function accepts the following parameters:

- `data`:

  Type: [`Data`](/api/interfaces/Data.md)[] | `Promise`&lt;[`Data`](/api/interfaces/Data.md)[]&gt; | [`WideData`](/api/interfaces/WideData.md)[] | `Promise`&lt;[`WideData`](/api/interfaces/WideData.md)[]&gt; | `string`

  The data object, a promise that resolves to it or a URL to it.  
  See [section about data](../documentation/data.md) for details.

- `container`:

  Type: `HTMLElement` | `string`

  The chart container HTML element or a string representing a CSS selector for it. If not provided, the document `body` element is used.

- `options`:

  Type: `Partial`&lt;[`Options`](/api/interfaces/Options.md)&gt;

  An optional configuration object.  
  See [section about options](../documentation/options.md) for details

Examples for usage:

```js title="fetch json data from url"
import { race } from 'racing-bars';

race('data/population.json', '#race', { title: 'World Population' });
```

```js title="fetch csv data from url"
import { race } from 'racing-bars';

const options = {
  dataType: 'csv',
  title: 'World Population',
  subTitle: 'in millions',
  autorun: false,
};
race('data/population.csv', '#race', options);
```

### `loadData`

For convenience, the library also exports the [`loadData`](../documentation/api.md#loaddata) function to allow fetching data from URL.

Type: [`loadData(URL, type?): Promise<Data[]> | Promise<WideData[]>`](/api/modules.md#loadData)

It supports the following data formats, by specifying the second optional parameter:

- `'json'` (default)
- `'csv'`
- `'tsv'`
- `'xml'`

The `loadData` method returns a promise with the fetched data converted to a javascript object.

Examples for usage:

```js
import { loadData, race } from 'racing-bars';

loadData('data/population.csv', 'csv').then((data) => {
  race(data, '#race', { title: 'World Population' });
});
```

## TypeScript Support

The library supports TypeScript. Documentation for the TypeScript definitions can be found [here](../api/modules.md).

```ts
import { race, type Options } from 'racing-bars';

const options: Options = {
  dataType: 'csv',
  title: 'World Population',
};

race('/data/population.csv', '#race', options);
```

## Framework Support

The library also supports rendering the bar chart race in React, Vue and Svelte.

### React

A wrapper React component is exported as the default export from `racing-bars/react`.

```jsx
import RacingBars from 'racing-bars/react';

export default function App() {
  const options = {
    dataUrl: '/data/population.json',
  };

  return <RacingBars {...options}>Loading...</RacingBars>;
}
```

### Vue

A wrapper Vue component is exported as the default export from `racing-bars/vue`.

```html
<script setup>
  import RacingBars from 'racing-bars/vue';

  const options = {
    dataUrl: '/data/population.json',
    title: 'World Population',
  };
</script>

<template>
  <RacingBars v-bind="options">Loading...</RacingBars>
</template>
```

### Svelte

The JS/TS library can be used directly in Svelte components without the need for any wrappers.

```html
<script>
  import { onMount } from 'svelte';
  import { race } from 'racing-bars';

  const options = {
    title: 'World Population',
  };

  onMount(() => {
    race('/data/population.json', '#race', options);
  });
</script>

<div id="race">Loading...</div>
```
