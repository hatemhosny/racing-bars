---
title: Title and Sub-Title
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';

A demo for using string in [`title`](../documentation/options.md#title) and [`subTitle`](../documentation/options.md#subtitle).

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
  />
</div>
