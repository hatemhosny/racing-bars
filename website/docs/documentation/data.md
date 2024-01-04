---
title: Data
---

## Data Shape

Both <a href="https://en.wikipedia.org/wiki/Wide_and_narrow_data" target="_blank" className="external">"long" and "wide"</a> data shapes are supported.

## Long Data

Also known as <a href="https://vita.had.co.nz/papers/tidy-data.pdf" target="_blank" className="external">tidy data (pdf)</a>.

Each data item has the following fields:

- `date`: `string` (**required**) a string representation of a valid date (preferrably in 'YYYY-MM-DD' format).
  Passing this string to `new Date()` should return a date. If an entry cannot be parsed as date an error will be thrown.
- `name`: `string` (**required**) a string holding the name of each item (bar label). e.g. country name
- `value`: `number` (**required**) the value of the name in that date.
- `color`: `string` (**optional**) the color to use for the bar.
  can be color name (e.g 'red'), hex code (e.g. '#FF0000') or RGB code (e.g. 'rgb(255, 0, 0)').
- `group`: `string` (**optional**) a string representing a group for a number of names.
  This has One-to-Many relation with `name` A group can have many names, but each name can be in one group. e.g. continent
- `icon`: `string` (**optional**) a string holding the url of an icon that would be displayed in bars.
  This has One-to-One relation to `name`. e.g. country flag

### Example

This is an example:

| date       | name      | value |
| ---------- | --------- | ----: |
| 2017-01-01 | Egypt     | 96.44 |
| 2017-01-01 | Singapore |  5.61 |
| 2017-01-01 | Greece    | 10.75 |
| 2017-01-01 | Panama    |  4.11 |
| 2018-01-01 | Greece    | 10.73 |
| 2018-01-01 | Singapore |  5.64 |
| 2018-01-01 | Canada    | 37.06 |
| 2018-01-01 | Egypt     | 98.42 |
| 2017-01-01 | Canada    | 36.54 |
| 2018-01-01 | Panama    |  4.18 |

The order of the items is not important.

this is represented in JSON like that:

```json title="long.json"
[
  {
    "date": "2017-01-01",
    "name": "Egypt",
    "value": 96.44
  },
  {
    "date": "2017-01-01",
    "name": "Singapore",
    "value": 5.61
  },
  {
    "date": "2017-01-01",
    "name": "Greece",
    "value": 10.75
  },
  {
    "date": "2017-01-01",
    "name": "Panama",
    "value": 4.11
  },
  {
    "date": "2018-01-01",
    "name": "Greece",
    "value": 10.73
  },
  {
    "date": "2018-01-01",
    "name": "Singapore",
    "value": 5.64
  },
  {
    "date": "2018-01-01",
    "name": "Canada",
    "value": 37.06
  },
  {
    "date": "2018-01-01",
    "name": "Egypt",
    "value": 98.42
  },
  {
    "date": "2017-01-01",
    "name": "Canada",
    "value": 36.54
  },
  {
    "date": "2018-01-01",
    "name": "Panama",
    "value": 4.18
  }
]
```

and in CSV like that

```csv title="long.csv"
date,name,value
2017-01-01,"Egypt",96.44
2017-01-01,Singapore,5.61
2017-01-01,Greece,10.75
2017-01-01,Panama,4.11
2018-01-01,Greece,10.73
2018-01-01,Singapore,5.64
2018-01-01,Canada,37.06
2018-01-01,"Egypt",98.42
2017-01-01,Canada,36.54
2018-01-01,Panama,4.18
```

### Usage

#### Plain data object

```js
const data = [
  {
    date: '2017-01-01',
    name: 'Egypt',
    value: 96.44,
  },
  // ...
  {
    date: '2018-01-01',
    name: 'Panama',
    value: 4.18,
  },
];

racingBars.race(data);
```

#### Load data from URL

The [`loadData`](./api.md#loaddataurltype) method can be used
to load `json`, `csv`, `tsv` or `xml` data from URL into a javascript object.

- Load JSON from URL

```js
racingBars.loadData('long.json').then((data) => {
  racingBars.race(data);
});
```

- Load CSV from URL

```js
racingBars.loadData('long.csv', 'csv').then((data) => {
  racingBars.race(data);
});
```

## Wide Data

Alternatively "wide" data can be used. Internally, "wide" data will be transformed to "long" before running.

Each item (row), contains `date` field and other fields with key (column name), value pairs representing `name` and `value` respectively.

### Example

| date       | Canada | Egypt | Greece | Panama | Singapore |
| ---------- | -----: | ----: | -----: | -----: | --------: |
| 2017-01-01 |  36.54 | 96.44 |  10.75 |   4.11 |      5.61 |
| 2018-01-01 |  37.06 | 98.42 |  10.73 |   4.18 |      5.64 |

JSON:

```json title="wide.json"
[
  {
    "date": "2017-01-01",
    "Canada": 36.54,
    "Egypt": 96.44,
    "Greece": 10.75,
    "Panama": 4.11,
    "Singapore": 5.61
  },
  {
    "date": "2018-01-01",
    "Canada": 37.06,
    "Egypt": 98.42,
    "Greece": 10.73,
    "Panama": 4.18,
    "Singapore": 5.64
  }
]
```

CSV:

```csv title="wide.csv"
date,Canada,Egypt,Greece,Panama,Singapore
2017-01-01,36.54,96.44,10.75,4.11,5.61
2018-01-01,37.06,98.42,10.73,4.18,5.64
```

### Usage

For wide data to be processed, the [`options`](./options.md) object should have the field [`dataShape`](./options.md#datashape) set to `wide`

- Plain data object

```js
const data = [
  {
    date: '2017-01-01',
    Canada: 36.54,
    Egypt: 96.44,
    Greece: 10.75,
    Panama: 4.11,
    Singapore: 5.61,
  },
  {
    date: '2018-01-01',
    Canada: 37.06,
    Egypt: 98.42,
    Greece: 10.73,
    Panama: 4.18,
    Singapore: 5.64,
  },
];

racingBars.race(data, { dataShape: 'wide' });
```

- Load JSON from URL

```js
racingBars.loadData('wide.json').then((data) => {
  racingBars.race(data, { dataShape: 'wide' });
});
```

- Load CSV from URL

```js
racingBars.loadData('wide.csv', 'csv').then((data) => {
  racingBars.race(data, { dataShape: 'wide' });
});
```

## Optional fields

Example for long data with [optional fields](#long-data):

```json
[
  {
    "date": "2017-01-01",
    "name": "Egypt",
    "value": 96.44,
    "icon": "https://www.countryflags.io/eg/flat/64.png",
    "group": "Africa"
  },
  {
    "date": "2017-01-01",
    "name": "Singapore",
    "value": 5.61,
    "icon": "https://www.countryflags.io/sg/flat/64.png",
    "group": "Asia"
  },
  {
    "date": "2017-01-01",
    "name": "Greece",
    "value": 10.75,
    "icon": "https://www.countryflags.io/gr/flat/64.png",
    "group": "Europe"
  },
  {
    "date": "2017-01-01",
    "name": "Panama",
    "value": 4.11,
    "icon": "https://www.countryflags.io/pa/flat/64.png",
    "group": "North America"
  },
  {
    "date": "2018-01-01",
    "name": "Greece",
    "value": 10.73,
    "icon": "https://www.countryflags.io/gr/flat/64.png",
    "group": "Europe"
  },
  {
    "date": "2018-01-01",
    "name": "Singapore",
    "value": 5.64,
    "icon": "https://www.countryflags.io/sg/flat/64.png",
    "group": "Asia"
  },
  {
    "date": "2018-01-01",
    "name": "Canada",
    "value": 37.06,
    "icon": "https://www.countryflags.io/ca/flat/64.png",
    "group": "North America"
  },
  {
    "date": "2018-01-01",
    "name": "Egypt",
    "value": 98.42,
    "icon": "https://www.countryflags.io/eg/flat/64.png",
    "group": "Africa"
  },
  {
    "date": "2017-01-01",
    "name": "Canada",
    "value": 36.54,
    "icon": "https://www.countryflags.io/ca/flat/64.png",
    "group": "North America"
  },
  {
    "date": "2018-01-01",
    "name": "Panama",
    "value": 4.18,
    "icon": "https://www.countryflags.io/pa/flat/64.png",
    "group": "North America"
  }
]
```

## How do I choose?

CSV files have smaller file size but require extra client-side processing than JSON files.

Also "wide" data has smaller size than "long" data, but also requires extra client-side processing.

:::tip
"Wide" CSV data has the smallest file size but requires the most processing,
while "long" JSON data has largest file size but requires least processing.
:::

So you decide, based on how large is your data, network constraints and processing power of the browsers of your users.

:::caution
"Wide" CSV data does not allow the use of optional fields (`group`, `icon`)
:::

## Cumulative Sum

You may frequently want to present the chart with cumulative sums (running totals), i.e. with each tick, the bar value increases with the new added value.
If the dataset includes only new values, they can be converted to cumulative sums by setting the option [`makeCumulative`](./options.md#makecumulative) to `true`.

## Filling gaps in data

Dates that are missing from data will be skipped.
If you need to fill date gaps, you may use the options [`fillDateGaps`](./options.md) and [`fillDateGapValue`](./options.md).
Please check the [guide](../guides/fill-date-gaps.md) about filling date gaps and data interpolation.
