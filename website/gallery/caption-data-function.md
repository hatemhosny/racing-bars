---
title: Caption (data function)
---

import { RacingBarsComponent } from '../racing-bars.js';

This example shows the use of [data function](../docs/documentation/options#data-function) in caption.

<!--truncate-->

### Chart

export const options = {
caption: (currentDate, dateSlice, allDates) =>
`Total: ${Math.round(dateSlice.reduce((acc, curr) => acc + curr.value, 0))}`,
};

<div className="gallery">
  <RacingBarsComponent
    elementId="gallery-caption-data-function"
    dataUrl="/data/population.csv"
    dataType="csv"
    caption={options.caption}
  />
</div>

### Code

```html {5,6}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    caption: (currentDate, dateSlice, allDates) =>
      `Total: ${Math.round(dateSlice.reduce((acc, curr) => acc + curr.value, 0))}`,
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
