---
title: Overlays
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';

A demo for using [`overlays`](../documentation/options.md#overlays).

See the guide on [`chart controls`](../guides/chart-controls.md).

<!--truncate-->

## overlays: 'all'

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    overlays="all"
    autorun={false}
    endDate="1965-01-01"
/>

</div>

## overlays: 'none' (default)

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    overlays="none"
    endDate="1965-01-01"
/>

</div>
