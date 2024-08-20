---
title: Events
---

## Custom DOM Events

When the chart loads and with each frame change (date change), a custom DOM event is fired.

Listening to these events allows getting the current state of the chart and can be used with [chart controls](../guides/chart-controls.md) to interact with the chart.
See the example for creating a [slider](../gallery/slider.md).

- Event type:
  - `"dateChange"`: fires when the date changes.
  - `"firstDate"`: fires when the current date is the first date in the dataset.
  - `"lastDate"`: fires when the current date is the last date in the dataset.
  - `"play"`: fires when the chart starts running.
  - `"pause"`: fires when the chart is paused.
- Event target: The [container DOM element](../getting-started/usage.md#race).
- Event bubbling: `true`
- The `detail` property is an object that has the following properties:
  - `date`: `string`. A string representation of the current date in the format 'YYYY-MM-DD'.
  - `isFirstDate`: `boolean`. The value is `true` if the current date is the first date in the dataset, else `false`.
  - `isLastDate`: `boolean`. The value is `true` if the current date is the last date in the dataset, else `false`.
  - `isRunning`: `boolean`. The value is `true` if the chart is running, else `false`.
  - `allDates`: `string[]`. An array of strings, containing all unique dates in the dataset sorted in ascending order (formatted as 'YYYY-MM-DD').

Example:

```js
import { race } from 'racing-bars';

const racer = await race('/data/population.csv', '#race', { dataType: 'csv' });

document.addEventListener('dateChange', (e) => {
  console.log(e.target);
  console.log(e.detail.date);
  console.log(e.detail.isFirstDate);
  console.log(e.detail.isLastDate);
});
```

## API

In addition to custom DOM events, the [API](./api.md) also allows registering callback functions in response to certain events. (See [`on`](./api.md#on) and [`onDate`](./api.md#ondate) methods)
