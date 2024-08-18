---
title: Fixed Scale (with Visible Labels)
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars';

A demo for using [`fixedScale`](../documentation/options.md#fixedscale) with [`labelsPosition`](../documentation/options.md#labelsposition),
to avoid [such problem](./fixed-scale.md).

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/covid-19.csv"
    dataType="csv"
    title="Covid-19 Confirmed Cases"
    fixedScale={true}
    labelsPosition="outside"
/>

</div>
