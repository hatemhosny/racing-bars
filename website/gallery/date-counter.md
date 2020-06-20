---
title: Date Counter
---

import { RacingBarsComponent } from '../racing-bars.js';

This example shows the use of [data functions](#).
The `dateCounter` uses a function to show '[count] of [total]'

<!--truncate-->

### Chart

export const options = {
dateCounter: (currentDate, dateSlice, allDates) =>
`${allDates.indexOf(currentDate) + 1} of ${allDates.length}`,
};

<div className="gallery">
  <RacingBarsComponent
    dataUrl="/data/population-wide.csv"
    dataType="csv"
    dataShape="wide"
    dateCounter={options.dateCounter}
  />
</div>

### Code

```html {4,5}
<div id="race"></div>
<script>
  const options = {
    dateCounter: (currentDate, dateSlice, allDates) =>
      `${allDates.indexOf(currentDate) + 1} of ${allDates.length}`,
  };
  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
