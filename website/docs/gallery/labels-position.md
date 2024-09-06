---
title: Labels Position
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';
import { labelsPosition, labelsPositionNone } from './\_gallery-demos.ts';

A demo for using [`labelsPosition`](../documentation/options.md#labelsposition).

<!--truncate-->

## labelsPosition: 'inside' (default)

### Chart

<div className="gallery">
  <RacingBars
    {...labelsPosition}
    labelsPosition="inside"
  />
</div>

## labelsPosition: 'outside'

### Chart

<div className="gallery">
  <RacingBars
    {...labelsPosition}
/>

</div>

## labelsPosition: 'none'

### Chart

<div className="gallery">
  <RacingBars
    {...labelsPositionNone}
/>

</div>
