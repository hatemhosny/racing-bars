---
title: Color Seed
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';

A demo for using [color seed](../documentation/options.md#colorseed).

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    colorSeed={42}
    showGroups={false}
  />
</div>

## Without `colorSeed`

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    showGroups={false}
  />
</div>
