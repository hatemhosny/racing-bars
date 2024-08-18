---
title: Fixed Scale
hide_table_of_contents: true
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
