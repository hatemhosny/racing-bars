---
title: Random Color Seed
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';

A demo for using random [color seed](../documentation/options.md#colorseed).

<!--truncate-->

Refresh the page to get different bar colors.

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    colorSeed={Math.round(Math.random() * 100)}
    dynamicProps={{colorSeed: 'Math.round(Math.random() * 100)'}}
  />
</div>
