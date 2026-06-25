---
title: TypeScript
---

RacingBars includes first-class TypeScript definitions, providing full type safety for all APIs.

## Installation

```shell
npm install racing-bars
```

## Types

The library exports the following key types:

| Type | Description |
|---|---|
| `Options` | Configuration object for the chart |
| `Props` | Props type for framework components (React/Vue) |
| `Race` | The chart API object returned by `race()` |
| `Data` | A single row in long-format data |
| `WideData` | A single row in wide-format data |
| `DOMCustomEvent` | Custom DOM event types |

## Usage

```ts
import { race, type Options } from 'racing-bars';

const options: Options = {
  title: 'World Population',
  topN: 10,
  theme: 'dark',
  loop: true,
};

race('/data/population.json', '#race', options);
```

### With the Race API

```ts
import { race, type Race, type Data } from 'racing-bars';

const chart: Race = await race('/data/population.json', '#race', {
  title: 'World Population',
});

chart.play();

chart.on('dateChange', (date: string) => {
  console.log('Current date:', date);
});
```

### Typed inline data

```ts
import { race, type Data } from 'racing-bars';

const data: Data[] = [
  { name: 'China', value: 1444216107, date: '2023' },
  { name: 'India', value: 1403800000, date: '2023' },
  { name: 'USA', value: 335893238, date: '2023' },
];

race(data, '#race', { title: 'World Population' });
```

### With `loadData`

```ts
import { loadData, race, type WideData } from 'racing-bars';

const data: WideData[] = await loadData('/data/population.csv', 'csv');

race(data, '#race', { title: 'World Population' });
```

### Using the `Options` interface for configuration

```ts
import { race, type Options } from 'racing-bars';

const options: Partial<Options> = {
  title: 'World Population',
  subTitle: 'Top 10',
  theme: 'dark',
  topN: 10,
  tickDuration: 200,
  loop: true,
  showIcons: true,
  labelsPosition: 'outside',
  colorSeed: 42,
  fixedScale: true,
};

race('/data/population.json', '#race', options);
```

For component usage with TypeScript in React and Vue, see the [React](/packages/react) and [Vue](/packages/vue) documentation.

## Type Definitions

Full generated TypeScript API documentation is available [here](/api).
