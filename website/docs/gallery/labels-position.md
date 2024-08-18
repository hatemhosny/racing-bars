---
title: Labels Position
hide_table_of_contents: true
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
