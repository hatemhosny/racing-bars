---
title: GitHub Push Events Dataset
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars';

A demo showing the use of [Github Push Events dataset](/docs/sample-datasets#github-push-events).

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
    dataUrl="/data/gh-push.csv"
    dataType="csv"
    title="Top Programming Languages"
    subTitle="Github Push Events"
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

### Code

```html
<div id="race"></div>
<script>
  const getYearQuarter = (currentDate, dateSlice, allDates) => {
    const month = Number(currentDate.slice(5, 7));
    const year = Number(currentDate.slice(0, 4));
    const q = Math.floor(month / 3) + 1;
    const quarter = q > 4 ? q - 4 : q;
    return `Q${quarter} ${year}`;
  };

  const options = {
    selector: '#race',
    title: 'Top Programming Languages',
    subTitle: 'Github Push Events',
    dateCounter: getYearQuarter,
  };

  racingBars.loadData('/data/gh-push.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
