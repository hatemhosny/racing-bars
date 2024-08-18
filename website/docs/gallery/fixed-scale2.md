---
title: Fixed Scale
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars';

A demo for using [`fixedScale`](../documentation/options.md#fixedscale).

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

Compare with:

### fixedScale: false (default)

<div className="gallery">
  <RacingBars
    dataUrl="/data/brands.csv"
    dataType="csv"
    title="Brand Values"
    fixedScale={false}
/>

</div>
