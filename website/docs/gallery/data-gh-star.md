---
title: GitHub Stars Dataset
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';

A demo showing the use of [Github Stars dataset](../sample-datasets.md#github-stars).

<!--truncate-->

### Chart

export const options = {
dateCounter: (currentDate, dateSlice, allDates) => {
const month = Number(currentDate.slice(5, 7));
const year = Number(currentDate.slice(0, 4));
const q = Math.floor(month / 3) + 1;
const quarter = q > 4? q - 4 : q;
return `Q${quarter} ${year}`
}
};

<div className="gallery">
  <RacingBars
    dataUrl="/data/gh-star.csv"
    dataType="csv"
    title="Top Programming Languages"
    subTitle="Github Stars"
    makeCumulative={true}
    dateCounter={options.dateCounter}
    dynamicProps={{dateCounter: `(currentDate, dateSlice, allDates) => {
    const month = Number(currentDate.slice(5, 7));
    const year = Number(currentDate.slice(0, 4));
    const q = Math.floor(month / 3) + 1;
    const quarter = q > 4 ? q - 4 : q;
    return \`Q\${quarter} \${year}\`;
  }`}}
  />
</div>
