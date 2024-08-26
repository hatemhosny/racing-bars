---
title: Fixed Order
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';
import { fixedOrder } from './\_gallery-demos.ts';

A demo for using [`fixedOrder`](../documentation/options.md#fixedorder).

<!--truncate-->

Notice that specifying [`fixedOrder`](../documentation/options.md#fixedorder) causes ignoring [`topN`](../documentation/options.md#topn).

Also note that with this setting it is more likely that the date counter will overlap the lower bars.

### Chart

<div className="gallery">
  <RacingBars
    {...fixedOrder}
/>

</div>
