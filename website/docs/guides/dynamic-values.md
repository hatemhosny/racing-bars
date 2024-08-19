---
title: Dynamic Values
---

import RacingBars from '../../src/components/RacingBars';

Dynamic values can be displayed in the [`title`](../documentation/options.md#title), [`subTitle`](../documentation/options.md#subtitle), [`DateCounter`](../documentation/options.md#datecounter) and [`caption`](../documentation/options.md#caption),
based on the data and the currently displayed date.

This can be achieved by using [data function](../documentation/options.md#data-function).

This example uses the [Github push events](../sample-datasets#github-push-events) dataset, and displays dynamic values in the 4 fields.

export const getYearRange = (currentDate, dateSlice, allDates) =>
`Top Languages (${allDates[0].slice(0, 4)} - ${allDates[allDates.length - 1].slice(0, 4)})`;

export const getTop5 = (currentDate, dateSlice, allDates) =>
`Top 5: ${dateSlice.slice(0, 5).map(d => d.name).join(', ')}`;

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
    subTitle={getTop5}
    dateCounter={getYearQuarter}
    caption={getTotal}
    dynamicProps={{title: `function getYearRange(currentDate, dateSlice, allDates) {
return \`Top Languages (\${allDates[0].slice(0, 4)} - \${allDates[allDates.length - 1].slice(0, 4)})\`;
}`,
subTitle: `function getTop5(currentDate, dateSlice, allDates) {
return \`Top 5: \${dateSlice.slice(0, 5).map(d => d.name).join(', ')}\`;
}`,
dateCounter: `function getYearQuarter(currentDate, dateSlice, allDates) {
  const month = Number(currentDate.slice(5, 7));
  const year = Number(currentDate.slice(0, 4));
  const q = Math.floor(month / 3) + 1;
  const quarter = q > 4 ? q - 4 : q;
  return \`Q\${quarter} \${year}\`;
}`,
caption: `function getTotal(currentDate, dateSlice, allDates) {
return \`Total: \${Math.round(dateSlice.reduce((acc, curr) => acc + curr.value, 0))}\`;
}`,
}}
  />
</div>
