---
title: Date Counter (format)
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars';

This example shows the use of date formatting in `dateCounter`

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBars
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
