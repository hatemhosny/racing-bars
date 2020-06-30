---
title: Start and End Dates
---

import { RacingBarsComponent } from '../racing-bars.js';

A demo for using `startDate` and `endDate`.

<!--truncate-->

Notice that the dates end at '1999-01-01', not '1999-12-31', because the dataset has no dates between them.
So the chart will end at the date that is less than or equal to the `endDate`.

### Chart

<div className="gallery">
  <RacingBarsComponent
    dataUrl="/data/population.csv"
    dataType="csv"
    startDate="1970-01-01"
    endDate="1999-12-31"
  />
</div>

### Code

```html {5,6}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    startDate: '1970-01-01',
    endDate: '1999-12-31',
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
