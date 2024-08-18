---
title: Loop
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';

A demo for using [`loop`](../documentation/options.md#loop).

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    startDate="1970-01-01"
    endDate="1980-01-01"
    loop={true}
  />
</div>
