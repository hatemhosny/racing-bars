---
title: Autorun
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';
import { autorunTrueOptions, autorunFalseOptions } from './\_gallery-demos.ts';

A demo for using [`autorun`](../documentation/options.md#autorun) to control auto-starting the chart race.

<!--truncate-->

## autorun: true (default)

### Chart

<div className="gallery">
  <RacingBars
    {...autorunTrue}
  />
</div>

## autorun: false

### Chart

<div className="gallery">
  <RacingBars
    {...autorunFalse}
  />
</div>
