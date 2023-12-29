---
title: Date Counter
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars';

This example shows the use of [data functions](#).
The `dateCounter` uses a function to show '[count] of [total]'

<!--truncate-->

### Chart

export const options = {
dateCounter: (currentDate, dateSlice, allDates) =>
`${allDates.indexOf(currentDate) + 1} of ${allDates.length}`,
};

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    dateCounter={options.dateCounter}
    dynamicProps={{dateCounter: `(currentDate, dateSlice, allDates) =>
\`\${allDates.indexOf(currentDate) + 1} of \${allDates.length}\``}}
  />
</div>

### Code

```html {5,6}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    dateCounter: (currentDate, dateSlice, allDates) =>
      `${allDates.indexOf(currentDate) + 1} of ${allDates.length}`,
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
