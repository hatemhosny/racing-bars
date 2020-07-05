---
title: Fixed Order
---

import RacingBars from '../racing-bars.js';

A demo for using [`fixedOrder`](/docs/documentation/options#fixedorder).

<!--truncate-->

Notice that specifying [`fixedOrder`](/docs/documentation/options#fixedorder) causes ignoring [`topN`](/docs/documentation/options#topn).

Also note that with this setting it is more likely that the date counter will overlap the lower bars.

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
    dateCounter="YYYY"
    fixedOrder={['Algeria', 'Italy', 'Canada', 'France', 'Argentina']}
    topN="3"
    tickDuration="100"
/>

</div>

### Code

```html {8}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    title: 'World Population',
    subTitle: 'in millions',
    dateCounter: 'YYYY',
    fixedOrder: ['Algeria', 'Italy', 'Canada', 'France', 'Panama'],
    topN: 3,
    tickDuration: 100,
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
