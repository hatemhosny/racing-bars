---
title: Brand Values Dataset
---

import RacingBars from '../racing-bars.js';

A demo showing the use of [Brand Values dataset](/docs/sample-datasets#brand-values).

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/brands.csv"
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

  racingBars.loadData('/data/brands.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
