---
title: Labels Position
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars';

A demo for using [`labelsPosition`](../documentation/options.md#labelsposition).

<!--truncate-->

## labelsPosition: 'inside' (default)

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    labelsPosition="inside"
  />
</div>

## labelsPosition: 'outside'

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    labelsPosition="outside"
/>

</div>
