---
title: JavaScript
---

RacingBars can be used in plain JavaScript projects via a bundler or directly from a CDN.

## Installation

### Using a bundler

```shell
npm install racing-bars
```

```js
import { race, loadData } from 'racing-bars';
```

### Load from CDN

#### ESM

```html
<div id="race" style="height: 80vh"></div>
<script type="module">
  import { race } from 'https://cdn.jsdelivr.net/npm/racing-bars';

  race('/data/population.json', '#race', { title: 'World Population' });
</script>
```

#### UMD

```html
<div id="race" style="height: 80vh"></div>
<script src="https://cdn.jsdelivr.net/npm/racing-bars/racing-bars.umd.js"></script>
<script>
  // the UMD version provides the global object `racingBars`
  racingBars.race('/data/population.json', '#race', { title: 'World Population' });
</script>
```

## Exports

### `race(data, container?, options?): Promise<Race>`

The main function that creates a bar chart race.

**Parameters:**

| Param | Type | Description |
|---|---|---|
| `data` | `Data[] \| WideData[] \| Promise \| string` | Data array, promise resolving to data, or a URL to a JSON/CSV/TSV/XML file. |
| `container` | `HTMLElement \| string` | The container element or a CSS selector. If omitted, a new `<div>` is appended to `<body>`. |
| `options` | `Partial\<Options\>` | Configuration object. See [Options documentation](/documentation/options). |

**Returns:** A promise that resolves to a [`Race`](/documentation/api) object for controlling the chart.

```js
import { race } from 'racing-bars';

// Using a URL
race('/data/population.json', '#race', {
  title: 'World Population',
  topN: 10,
  loop: true,
});
```

```js
// Using inline data
const data = [
  { name: 'China', value: 1444216107, date: '2023' },
  { name: 'India', value: 1403800000, date: '2023' },
  { name: 'USA', value: 335893238, date: '2023' },
];

race(data, '#race', {
  title: 'World Population',
});
```

```js
// Using the Race API
race('/data/population.json', '#race', { title: 'World Population' }).then((chart) => {
  chart.play();
  chart.on('dateChange', (date) => console.log(date));
});
```

### `loadData(url, type?): Promise<Data[]> | Promise<WideData[]>`

Fetches data from a URL. Supports JSON, CSV, TSV, and XML formats.

```js
import { loadData, race } from 'racing-bars';

loadData('/data/population.csv', 'csv').then((data) => {
  race(data, '#race', { title: 'World Population' });
});
```

### `generateId(prefix?, length?): string`

Generates a unique ID string. Useful when creating multiple charts without specifying element IDs.

```js
import { generateId } from 'racing-bars';

const id = generateId('race-'); // e.g. "race-a1b2c3d4"
```

### `defaultOptions: Options`

The default options object. Useful for inspecting defaults or creating modified copies.

```js
import { defaultOptions } from 'racing-bars';

console.log(defaultOptions.tickDuration); // 100
console.log(defaultOptions.topN); // 12
```

## The Race API Object

The `race()` function returns a promise that resolves to a `Race` object with methods to control the chart:

| Method | Description |
|---|---|
| `play()` | Start or resume animation |
| `pause()` | Pause animation |
| `toggle()` | Toggle play/pause |
| `skipBack()` | Go to the first date |
| `skipForward()` | Go to the last date |
| `inc(steps?)` | Advance N steps forward |
| `dec(steps?)` | Go back N steps |
| `setDate(date)` | Jump to a specific date |
| `getDate()` | Get the current date string |
| `getAllDates()` | Get all available dates |
| `isRunning()` | Check if the animation is running |
| `select(name)` | Select a bar by name |
| `unselect(name)` | Unselect a bar |
| `unselectAll()` | Clear all selections |
| `hideGroup(group)` | Hide a group |
| `showGroup(group)` | Show a group |
| `showOnlyGroup(group)` | Show only one group |
| `showAllGroups()` | Show all groups |
| `changeOptions(opts)` | Change options at runtime |
| `onDate(date, fn)` | Callback when a specific date is reached |
| `on(event, fn)` | Listen to chart events (`dateChange`, `play`, `pause`, etc.) |
| `destroy()` | Clean up and remove the chart |

See the full [API documentation](/documentation/api) for details.

## Examples

```js title="Chart with custom options"
import { race } from 'racing-bars';

race('/data/population.json', '#race', {
  title: 'World Population',
  subTitle: 'Top 10 most populous countries',
  theme: 'dark',
  topN: 10,
  tickDuration: 200,
  loop: true,
  showIcons: true,
  labelsPosition: 'outside',
});
```

```js title="Fetch CSV data and transform"
import { loadData, race } from 'racing-bars';

loadData('/data/data.csv', 'csv').then((data) => {
  race(data, '#race', {
    title: 'Custom Data',
    makeCumulative: true,
    fillDateGapsInterval: 'month',
  });
});
```
