---
title: Control Buttons
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';
import { controlButtonsAll, controlButtonsPlay, controlButtonsNone } from './\_gallery-demos.ts';

A demo for using [`controlButtons`](../documentation/options#controlbuttons).

See the guide on [`chart controls`](../guides/chart-controls).

<!--truncate-->

## controlButtons: 'all'

### Chart

<div className="gallery">
  <RacingBars
    {...controlButtonsAll}
/>

</div>

## controlButtons: 'play'

### Chart

<div className="gallery">
  <RacingBars
    {...controlButtonsPlay}
/>

</div>

## controlButtons: 'none' (default)

### Chart

<div className="gallery">
  <RacingBars
    {...controlButtonsNone}
/>

</div>
