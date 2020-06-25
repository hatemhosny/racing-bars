---
title: Brand Values Dataset
---

import { RacingBarsComponent } from '../racing-bars.js';

A demo showing the use of [Brand Values dataset](/docs/sample-datasets#brand-values).

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBarsComponent
    elementId="gallery-data-brand-values"
    dataUrl="/data/brand-values.csv"
    dataType="csv"
    title="18 years of Interbrand’s Top Global Brands"
    subTitle="Brand value, $m"
    dateCounter="YYYY"
    colorSeed="45"
/>

</div>

### Code

```html
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    title: '18 years of Interbrand’s Top Global Brands',
    subTitle: 'Brand value, $m',
    dateCounter: 'YYYY',
    colorSeed: 45,
  };

  racingBars.loadData('/data/brand-values.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
