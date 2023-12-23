---
title: Caption (data function)
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars.tsx';

This example shows the use of [data function](../documentation/options#data-function) in caption.

<!--truncate-->

### Chart

export const options = {
caption: (currentDate, dateSlice, allDates) =>
`Total: ${Math.round(dateSlice.reduce((acc, curr) => acc + curr.value, 0))}`,
};

<div className="gallery">
  <RacingBars
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
