---
title: Usage
---

The main method that creates the bar chart race is [`race`](../documentation/api.md#racedata-options). It is used as follows:

```js
racingBars.race(data, options);
```

where:

- [`data`](../documentation/data.md) is the data object, and
- [`options`](../documentation/options.md) is an optional configuration object.

For convenience, the `racingBar` object also exposes the method [`loadData`](./loadData.md) to allow fetching data from URL.
It supports the following data formats, by specifying the second optional parameter:

- `json` (default)
- `csv`
- `tsv`
- `xml`

The `loadData` method returns a promise with the fetched data converted to a javascript object.

Examples for usage:

```js title="fetch json data from url"
racingBars.loadData('data/population.json').then((data) => {
  racingBars.race(data, { selector: '#race', title: 'World Population' });
});
```

```js title="fetch csv data from url"
const options = {
  selector: '#race',
  title: 'World Population',
  subTitle: 'in millions',
  autorun: false,
};
racingBars.loadData('data/population.csv', 'csv').then((data) => {
  racingBars.race(data, options);
});
```
