---
title: Fixed Order
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars.tsx';

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
    tickDuration="200"
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
    topN: 3, // ignored
    tickDuration: 200,
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```