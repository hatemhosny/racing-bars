---
title: Caption (string)
---

import { RacingBarsComponent } from '../racing-bars.js';

A demo for using string in caption.

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBarsComponent
    dataUrl="/data/population.csv"
    dataType="csv"
    caption="Source: World Bank"
  />
</div>

### Code

```html {5}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    caption: 'Source: World Bank',
  };
  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
