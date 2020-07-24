---
title: Events
---

When the chart loads and with each frame change (date change), a custom DOM event is fired.

Listening to these events allows getting the current state of the chart and can be used with [chart controls](../guides/chart-controls.md) to interact with the chart.
See the guide on creating a [slider](../guides/slider.md) for usage examples.

- Event type: `racingBars/dateChange`
- Event target: The DOM element specified by the [`selector` option](./options.md#selector).
- Event bubbling: `true`
- The `detail` property is an object that has the following properties:
  - `date`: string. A string representation of the current date in the format 'YYYY-MM-DD'.
  - `isFirst`: boolean. The value is `true` if the current date is the first date in the dataset, else `false`.
  - `isLast`: boolean. The value is `true` if the current date is the last date in the dataset, else `false`.

Example:

```js
const options = {
  selector: '#race',
};
racingBars.loadData('/data/population.csv', 'csv').then((data) => {
  racingBars.race(data, options);
});

document.addEventListener('racingBars/dateChange', (e) => {
  console.log(e.target);
  console.log(e.detail.date);
  console.log(e.detail.isFirst);
  console.log(e.detail.isLast);
});
```
