---
title: Filling Date Gaps
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';
import { fillDateGapsNull, fillDateGapsMonthInterpolate, fillDateGapsMonthLast } from './\_gallery-demos.ts';

A demo for using [`fillDateGapsInterval`](../documentation/options.md#filldategapsinterval) and [`fillDateGapsValue`](../documentation/options.md#filldategapsvalue).

See the guide on [`Filling Date Gaps`](../guides/fill-date-gaps.md).

<!--truncate-->

## fillDateGapsInterval: null (default)

### Chart

<div className="gallery">
  <RacingBars
    {...fillDateGapsNull}
  />
</div>

## fillDateGapsInterval, "month", fillDateGapsValue: "interpolate"

### Chart

<div className="gallery">
  <RacingBars
    {...fillDateGapsMonthInterpolate}
  />
</div>

## fillDateGapsInterval, "month", fillDateGapsValue: "last"

### Chart

<div className="gallery">
  <RacingBars
    {...fillDateGapsMonthLast}
  />
</div>
