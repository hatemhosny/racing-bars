---
title: TopN
---

import { RacingBarsComponent } from '../racing-bars.js';

A demo for using `topN` to choose the number of bars to display.

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBarsComponent
    elementId="gallery-top-n"
    dataUrl="/data/population.csv"
    dataType="csv"
    topN="5"
  />
</div>

### Code

```html {5}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    topN: 5,
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
