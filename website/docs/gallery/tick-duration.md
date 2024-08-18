---
title: Chart Speed (tickDuration)
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars';

A demo for using [`tickDuration`](../documentation/options.md#tickduration) to control chart "speed".

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    tickDuration={200}
  />
</div>
