---
title: Dynamic Values
---

import RacingBars from '../../racing-bars.js';

Dynamic values can be displayed in the [`title`](../documentation/options.md#title), [`subTitle`](../documentation/options.md#subtitle), [`DateCounter`](../documentation/options.md#datecounter) and [`caption`](../documentation/options.md#caption),
based on the data and the currently displayed date.

This can be achieved by using [data function](../documentation/options.md#data-function).

This example uses the [Github push events](../sample-datasets#github-push-events) dataset, and displays dynamic values in the 4 fields.

export const getYearRange = (currentDate, dateSlice, allDates) =>
`Top Languages (${allDates[0].slice(0, 4)} - ${allDates[allDates.length - 1].slice(0, 4)})`;

export const getTop3 = (currentDate, dateSlice, allDates) =>
`Top 3: ${dateSlice.slice(0, 3).map(d => d.name).join(', ')}`;

export const getYearQuarter = (currentDate, dateSlice, allDates) => {
const month = Number(currentDate.slice(5, 7));
const year = Number(currentDate.slice(0, 4));
const q = Math.floor(month / 3) + 1;
const quarter = q > 4 ? q - 4 : q;
return `Q${quarter} ${year}`;
};

export const getTotal = (currentDate, dateSlice, allDates) =>
`Total: ${Math.round(dateSlice.reduce((acc, curr) => acc + curr.value, 0))}`;

<div className="gallery">
  <RacingBars
    dataUrl="/data/gh-push.csv"
    dataType="csv"
    title={getYearRange}
    subTitle={getTop3}
    dateCounter={getYearQuarter}
    caption={getTotal}
  />
</div>

#### Code

```js
const getYearRange = (currentDate, dateSlice, allDates) =>
  `Top Languages (${allDates[0].slice(0, 4)} - ${allDates[allDates.length - 1].slice(0, 4)})`;

const getTop3 = (currentDate, dateSlice, allDates) =>
  `Top 3: ${dateSlice
    .slice(0, 3)
    .map((d) => d.name)
    .join(', ')}`;

const getYearQuarter = (currentDate, dateSlice, allDates) => {
  const month = Number(currentDate.slice(5, 7));
  const year = Number(currentDate.slice(0, 4));
  const q = Math.floor(month / 3) + 1;
  const quarter = q > 4 ? q - 4 : q;
  return `Q${quarter} ${year}`;
};

const getTotal = (currentDate, dateSlice, allDates) =>
  `Total: ${Math.round(dateSlice.reduce((acc, curr) => acc + curr.value, 0))}`;

const options = {
  selector: '#race',
  title: getYearRange,
  subTitle: getTop3,
  dateCounter: getYearQuarter,
  caption: getTotal,
};

racingBars.loadData('/data/gh-push.csv', 'csv').then((data) => {
  racingBars.race(data, options);
});
```
