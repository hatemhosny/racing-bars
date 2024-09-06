---
title: Data Transformation
---

By, default, the [loaded data](../documentation/data.md) is used as is.

However, it is possible to transform the data before it is used in the chart, by one of these ways:

## `dataTransform` function

The [chart options](../documentation/options.md) can have a [`dataTransform`](../documentation/options.md#datatransform) function which can be used to transform the data before it is used in the chart. It receives the loaded data and returns the transformed data.

Example:

```js
import { race } from 'racing-bars';

const options = {
  dataTransform: (data) =>
    data.map((d) => ({
      ...d,
      icon: `https://flagsapi.com/${d.code}/flat/64.png`,
    })),
  title: 'World Population',
  // ...
};

race('/data/population.csv', '#race', options);
```

## Manually loading and transforming data

The [`loadData`](../documentation/api.md#loaddata) function can be used to load data. It can then be transformed before it is used in the chart.

```js
import { loadData, race } from 'racing-bars';

const data = await loadData('/data/population.csv', 'csv');
const transformedData = data.map((d) => ({
  ...d,
  icon: `https://flagsapi.com/${d.code}/flat/64.png`,
}));

const options = {
  title: 'World Population',
  // ...
};

race(transformedData, '#race', options);
```

## `valueDecimals` option

In case you just need to control the number of decimal places to display for values, you do not need to transform the data. You may just use the [`valueDecimals`](../documentation/options.md#valuedecimals) option.

```js
import { race } from 'racing-bars';

const options = {
  title: 'World Population',
  valueDecimals: 0,
  // ...
};

race('/data/population.csv', '#race', options);
```
