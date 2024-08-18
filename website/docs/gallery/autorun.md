---
title: Autorun
hide_table_of_contents: true
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
