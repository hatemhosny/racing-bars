---
title: Autorun
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars';

A demo for using [`autorun`](../documentation/options.md#autorun) to control auto-starting the chart race.

<!--truncate-->

## autorun: true (default)

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    autorun={true}
  />
</div>

## autorun: false

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    autorun={false}
  />
</div>
