---
title: Fixed Scale
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars.tsx';

A demo for using [`fixedScale`](/docs/documentation/options#fixedscale).

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/brands.csv"
    dataType="csv"
    title="Brand Values"
    fixedScale={true}
/>

</div>

### Code

```html {6}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    title: 'Brand Values',
    fixedScale: true,
  };

  racingBars.loadData('/data/brands.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```