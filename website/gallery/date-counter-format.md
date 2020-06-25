---
title: Date Counter (format)
---

import { RacingBarsComponent } from '../racing-bars.js';

This example shows the use of date formatting in `dateCounter`

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBarsComponent
    elementId="gallery-date-counter-format"
    dataUrl="/data/population.csv"
    dataType="csv"
    dateCounter="MMM DD, YYYY 🌍"
  />
</div>

### Code

```html {5}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    dateCounter: 'MMM DD, YYYY 🌍',
  };
  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
