---
title: Fixed Scale (invisible labels!)
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars';

A demo for using [`fixedScale`](../documentation/options.md#fixedscale).

<!--truncate-->

Notice that initially most of the bar labels are not visible.
To avoid such problem, consider setting [`labelsPosition`](../documentation/options.md#labelsposition) to `'outside'` ([demo](./fixed-scale-labels.md)).

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/covid-19.csv"
    dataType="csv"
    title="Covid-19 Confirmed Cases"
    fixedScale={true}
/>

</div>
