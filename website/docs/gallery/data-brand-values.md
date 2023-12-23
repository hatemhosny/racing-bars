---
title: Brand Values Dataset
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars.tsx';

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
