---
title: Options
---

## Usage

## Options

### `autorun`

If `true`, the bar chart race runs automatically on load.
If set to `false`, make sure you provide a way to run the chart using one of the methods described [here](../guides/chart-control).

- Type: boolean
- Default: true

### `caption`

If provided,

### `selector`

A CSS selector for the element to use as a container for the chart.
Note that any HTML inside that element will be deleted before embedding the chart.
If the selector evaluates to multiple elements, the first one will be used.
If no elements were found with the current selector, an error will be thrown.

- Type: string
- Default: '#race'
- Examples:

## Data Functions

Each of the options `title`, `subTitle`, `DateCounter` and `caption` can accept a function that takes arguments calculated from provided data and returns a string.
The function will be evaluated in every date and the returned string will be displayed.

### Arguments

- `currentDate`: `string`. A string representing the current date formatted as `YYYY-MM-DD`.
- `dateSlice`: `Data[]`. An array of data items filtered by the `currentDate`. This includes all data items not just those shown in the chart as stated by `topN`.
- `allDates`: `string[]`. An array of strings representing all dates in the dataset formatted as `YYYY-MM-DD`.

### Return

The function should return a string. This string will be displayed for the used option.

### Examples

This displays the `dateCounter` as 'count of total' instead of date

```javascript
const options = {
  dateCounter: (currentDate, dateSlice, allDates) =>
    `${dates.indexOf(currentDate) + 1} of ${dates.length}`,
};
```

This displays the total of data values for the current date in the `caption`

```javascript
const options = {
  caption: (currentDate, dateSlice, allDates) =>
    `Total: ${Math.round(dateSlice.reduce((acc, curr) => acc + curr.value, 0))}`,
};
```

This displays the mean of the displayed data values in the `caption`

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
