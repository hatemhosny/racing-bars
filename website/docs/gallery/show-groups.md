---
title: Groups
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';
import { showGroups } from './\_gallery-demos.ts';

A demo for groups ([`showGroups`](../documentation/options.md#showgroups)).

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBars
    {...showGroups}
  />
</div>

## Without groups

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    showGroups={false}
  />
</div>
