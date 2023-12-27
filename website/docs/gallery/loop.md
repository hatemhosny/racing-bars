---
title: Loop
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars';

A demo for using `loop`.

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    startDate="1970-01-01"
    endDate="1980-01-01"
    loop={true}
  />
</div>

### Code

```html {7}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    startDate: '1970-01-01',
    endDate: '1980-01-01',
    loop: true,
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
