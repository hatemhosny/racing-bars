---
title: TopN
hide_table_of_contents: true
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
