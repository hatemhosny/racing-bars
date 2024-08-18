---
title: Fixed Scale (with Visible Labels)
hide_table_of_contents: true
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
