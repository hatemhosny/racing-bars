---
title: Title and Sub-Title
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars';

A demo for using string in [`title`](../documentation/options.md#title) and [`subTitle`](../documentation/options.md#subtitle).

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
  />
</div>
