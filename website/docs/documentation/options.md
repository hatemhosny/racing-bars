---
title: Options
---

## Usage

An optional configuration object can be passed to the [`race`](../documentation/api.md#racedata-options) method.

```js
const options = {};
racingBars.race(data, options);
```

## Options

The configuration object may contain any of the following fields:

### autorun

If `true`, the bar chart race runs automatically on load.
If set to `false`, make sure you provide a way to run the chart using one of the methods described [here](../guides/chart-control).

- Type: boolean
- Default: true

### caption

If provided, displays below the date counter on the right lower corner of the chart

- Type: string | [data function](#data-function)
- Default: ""
- Examples:

[view in gallery](/gallery/caption-string)

```javascript
const options = {
  caption: 'Source: World Bank',
};
```

This uses a [data function](#data-function) to display the total of data values for the current date in the `caption`

[view in gallery](/gallery/caption-data-function)

```javascript
const options = {
  caption: (currentDate, dateSlice, allDates) =>
    `Total: ${Math.round(dateSlice.reduce((acc, curr) => acc + curr.value, 0))}`,
};
```

### dataShape

Instruction whether the data shape is <a href="https://en.wikipedia.org/wiki/Wide_and_narrow_data" target="_blank">"long" or "wide"</a>.
See ["Data" section](./data.md) for more details and examples.

- Type: string
- Valid values: ["long", "wide"]
- Default: "long"
- Examples:

This uses "wide" data shape

```javascript
const options = {
  dataShape: 'wide',
};
```

### dateCounter

Displays the date counter on the right lower corner of the chart.
If a string is used, the following will be replaced:

"MMM": month name, "DDD": day name, "YYYY": year, "MM": month, "DD": day

- Type: string | [data function](#data-function)
- Default: "MM/YYYY"
- Examples:

This displays formatted date

[view in gallery](/gallery/date-counter-format)

```javascript
const options = {
  dateCounter: 'MMM DD, YYYY 🌍',
};
```

This uses [data function](#data-function) to display the `dateCounter` as '[count] of [total]' instead of date

[view in gallery](/gallery/date-counter)

```javascript
const options = {
  dateCounter: (currentDate, dateSlice, allDates) =>
    `${dates.indexOf(currentDate) + 1} of ${dates.length}`,
};
```

### endDate

If provided, the data is filtered so that the `date` field of the data item is less than or equal to the given date.
It should be a string that can be parsed as date by `new Date()`, preferably formatted as 'YYYY-MM-DD'.
If it cannot be parsed as date, an error will be thrown.

- Type: string
- Default: ""
- Examples:

[view in gallery](/gallery/start-end-dates)

```javascript
const options = {
  endDate: '1999-12-31',
};
```

### selector

A CSS selector for the element to use as a container for the chart.
Note that any HTML inside that element will be deleted before embedding the chart.
If the selector evaluates to multiple elements, the first one will be used.
If no elements were found with the current selector, an error will be thrown.

- Type: string
- Default: '#race'
- Examples:

```javascript
const options = {
  selector: '#race',
};
```

```javascript
const options = {
  selector: '.mydiv',
};
```

### startDate

If provided, the data is filtered so that the `date` field of the data item is more than or equal to the given date.
It should be a string that can be parsed as date by `new Date()`, preferably formatted as 'YYYY-MM-DD'.
If it cannot be parsed as date, an error will be thrown.

- Type: string
- Default: ""
- Examples:

[view in gallery](/gallery/start-end-dates)

```javascript
const options = {
  startDate: '1970-01-01',
};
```

### subTitle

If provided, displays chart sub-title

- Type: string | [data function](#data-function)
- Default: ""
- Examples:

[view in gallery](/gallery/title-string)

```javascript
const options = {
  subTitle: 'in millions',
};
```

### title

If provided, displays chart title

- Type: string | [data function](#data-function)
- Default: ""
- Examples:

[view in gallery](/gallery/title-string)

```javascript
const options = {
  title: 'World Population',
};
```

### topN

Number of bars to show. This represents the number of data items with highest values in each date.

- Type: number
- Default: 10
- Examples:

[view in gallery](/gallery/top-n)

```javascript
const options = {
  topN: 5,
};
```

## Data Function

Each of the options `title`, `subTitle`, `DateCounter` and `caption` can accept a function that takes arguments calculated from provided data and returns a string.
The function will be evaluated in every date and the returned string will be displayed.

### Arguments

- `currentDate`: `string`. A string representing the current date formatted as 'YYYY-MM-DD'.
- `dateSlice`: `Data[]`. An array of data items filtered by the current date. This includes all data items not just those shown in the chart as stated by `topN`.
- `allDates`: `string[]`. An array of strings representing all dates in the dataset formatted as 'YYYY-MM-DD'.

### Return

The function should return a string. This string will be displayed for the used option.

### Examples

- This example displays the `dateCounter` as '[count] of [total]' instead of date

[view in gallery](/gallery/date-counter)

```javascript
const options = {
  dateCounter: (currentDate, dateSlice, allDates) =>
    `${dates.indexOf(currentDate) + 1} of ${dates.length}`,
};
```

- This example displays the total of data values for the current date in the `caption`

[view in gallery](/gallery/caption-data-function)

```javascript
const options = {
  caption: (currentDate, dateSlice, allDates) =>
    `Total: ${Math.round(dateSlice.reduce((acc, curr) => acc + curr.value, 0))}`,
};
```

- This example displays the mean of the displayed data values in the `caption`

```javascript
const barsToShow = 5;
function calculateMean(currentDate, dateSlice, allDates) => {
  const values = dateSlice
    .map((d) => d.value)
    .sort((a, b) => b > a)
    .slice(0, barsToShow);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  return `Mean of top ${barsToShow}: ${Math.round(mean)}`;
}

const options = {
  topN: barsToShow,
  caption: calculateMean,
};
```

- This example displays the `dateCounter` as quarter of year

[view in gallery](/gallery/data-gh-push)

```javascript
const getYearQuarter = (currentDate, dateSlice, allDates) => {
  const month = Number(currentDate.slice(5, 7));
  const year = Number(currentDate.slice(0, 4));
  const q = Math.floor(month / 3) + 1;
  const quarter = q > 4 ? q - 4 : q;
  return `Q${quarter} ${year}`;
};

const options = {
  dateCounter: getYearQuarter,
};
```

<!--
✔ autorun: true
✔ caption: ""
  colorMap: {}
  colorSeed: ""
✔ dataShape: "long"
  dataTransform: null,
✔ dateCounter: "MM/YYYY"
  disableClickEvents: true
  disableKeyboardEvents: true
✔ endDate: ""
  fillDateGaps: false
  fillDateGapsValue: "interpolate"
  fixedScale: false
  height: ""
  highlightBars: true
  injectStyles: true
  labelsOnBars: true
  labelsWidth: 150
  loop: false
  minHeight: 300
  minWidth: 500
  selectBars: true
✔ selector: "#race"
  showControls: "all"
  showGroups: true
  showIcons: false
  showOverlays: "none"
✔ startDate: ""
✔ subTitle: ""
  theme: "light"
  tickDuration: 500
✔ title: ""
✔ topN: 10
  width: ""
 -->
