---
title: Fixed Order
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';

A demo for using [`fixedOrder`](../documentation/options.md#fixedorder).

<!--truncate-->

Notice that specifying [`fixedOrder`](../documentation/options.md#fixedorder) causes ignoring [`topN`](../documentation/options.md#topn).

Also note that with this setting it is more likely that the date counter will overlap the lower bars.

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    dateCounter="YYYY"
    fixedOrder={['Algeria', 'Italy', 'Canada', 'France', 'Argentina']}
    topN="3"
    tickDuration="200"
/>

</div>
