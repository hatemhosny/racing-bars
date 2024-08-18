---
title: TopN
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars';

A demo for using [`topN`](../documentation/options.md#topn) to choose the number of bars to display.

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    topN={5}
  />
</div>
