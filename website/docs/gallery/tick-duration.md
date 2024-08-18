---
title: Chart Speed (tickDuration)
hide_table_of_contents: true
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
