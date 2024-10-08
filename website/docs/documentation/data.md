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
- `color`: `string` (**optional**) the color to use for the bar as a CSS color. For example, this
  can be a color name (e.g 'red'), hex code (e.g. '#ff0000') or RGB color (e.g. 'rgb(255, 0, 0)').
- `group`: `string` (**optional**) a string representing a group for a number of names.
  This has One-to-Many relationship with `name`. A group (e.g. continent) can have many names (e.g. countries), but each name can be in one group.
- `icon`: `string` (**optional**) a string holding the URL of an icon that would be displayed in bars (e.g. country flag).
  This has One-to-One relationship to `name`.

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

This is represented in JSON like that:

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

#### JS array of objects

```js
import { race } from 'racing-bars';

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

race(data, '#race');
```

#### Load data from URL

Data can be loaded from a URL. The following formats are supported:
`json`, `csv`, `tsv` and `xml`.

Data type is automatically detected by file extension, otherwise `json` is assumed.

- Load JSON from URL

```js
import { race } from 'racing-bars';

race('long.json', '#race');
```

- Load CSV from URL

```js
import { race } from 'racing-bars';

race('long.csv', '#race', { dataType: 'csv' });
```

In addition, the [`loadData`](./api.md#loaddata) function can be used to load data from a URL into a JavaScript array.

```js
import { loadData, race } from 'racing-bars';

loadData('long.csv', 'csv').then((data) => {
  race(data);
});
```

## Wide Data

Alternatively "wide" data can be used. Internally, "wide" data will be transformed to "long" before running.

Each item (row), contains a `date` field and other fields with key (column name), value pairs representing `name` and `value` respectively.

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

For wide data to be processed, the [`options`](./options.md) object should have the field [`dataShape`](./options.md#datashape) set (or auto-detected) to `"wide"`

- JS array of objects

```js
import { race } from 'racing-bars';

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

race(data, '#race', { dataShape: 'wide' });
```

- Load JSON from URL

```js
import { race } from 'racing-bars';

race('wide.json', '#race', { dataShape: 'wide' });
```

- Load CSV from URL

```js
import { race } from 'racing-bars';

race('wide.csv', '#race', { dataType: 'csv', dataShape: 'wide' });
```

Additionally, the [`loadData`](./api.md#loaddata) function can be used to load data from a URL into a JavaScript array.

```js
import { loadData, race } from 'racing-bars';

loadData('wide.csv', 'csv').then((data) => {
  race(data, { dataShape: 'wide' });
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
    "icon": "https://flagsapi.com/EG/flat/64.png",
    "group": "Africa"
  },
  {
    "date": "2017-01-01",
    "name": "Singapore",
    "value": 5.61,
    "icon": "https://flagsapi.com/SG/flat/64.png",
    "group": "Asia"
  },
  {
    "date": "2017-01-01",
    "name": "Greece",
    "value": 10.75,
    "icon": "https://flagsapi.com/GR/flat/64.png",
    "group": "Europe"
  },
  {
    "date": "2017-01-01",
    "name": "Panama",
    "value": 4.11,
    "icon": "https://flagsapi.com/PA/flat/64.png",
    "group": "North America"
  },
  {
    "date": "2018-01-01",
    "name": "Greece",
    "value": 10.73,
    "icon": "https://flagsapi.com/GR/flat/64.png",
    "group": "Europe"
  },
  {
    "date": "2018-01-01",
    "name": "Singapore",
    "value": 5.64,
    "icon": "https://flagsapi.com/SG/flat/64.png",
    "group": "Asia"
  },
  {
    "date": "2018-01-01",
    "name": "Canada",
    "value": 37.06,
    "icon": "https://flagsapi.com/CA/flat/64.png",
    "group": "North America"
  },
  {
    "date": "2018-01-01",
    "name": "Egypt",
    "value": 98.42,
    "icon": "https://flagsapi.com/EG/flat/64.png",
    "group": "Africa"
  },
  {
    "date": "2017-01-01",
    "name": "Canada",
    "value": 36.54,
    "icon": "https://flagsapi.com/CA/flat/64.png",
    "group": "North America"
  },
  {
    "date": "2018-01-01",
    "name": "Panama",
    "value": 4.18,
    "icon": "https://flagsapi.com/PA/flat/64.png",
    "group": "North America"
  }
]
```

## How do I choose?

CSV files have a smaller file size but require extra client-side processing than JSON files.

Also "wide" data has smaller size than "long" data, but also requires extra client-side processing.

:::tip
**"Wide" CSV** data has the smallest file size but requires the most processing,
while **"long" JSON** data has largest file size but requires least processing.
:::

So you decide, based on how large is your data, network constraints and processing power of the browsers of your users.

:::caution
"Wide" data does not allow the use of optional fields (`group` and `icon`)
:::

## Cumulative Sum

You may frequently want to present the chart with cumulative sums (running totals), i.e. with each tick, the bar value increases with the new added value.
If the dataset includes only new values, they can be converted to cumulative sums by setting the option [`makeCumulative`](./options.md#makecumulative) to `true`.

## Filling gaps in data

Dates that are missing from data will be skipped.
If you need to fill date gaps, you may use the options [`fillDateGapsInterval`](./options.md#filldategapsinterval) and [`fillDateGapValue`](./options.md#filldategapsvalue).
Please check the [guide](../guides/fill-date-gaps.md) about filling date gaps and data interpolation.
