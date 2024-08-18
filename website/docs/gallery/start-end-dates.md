---
title: Start and End Dates
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';

A demo for using [`startDate`](../documentation/options.md#startdate) and [`endDate`](../documentation/options.md#enddate).

<!--truncate-->

Notice that the dates end at `'1999-01-01'`, not `'1999-12-31'`, because the dataset has no dates between them.
So the chart will end at the date that is less than or equal to the `endDate`.

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    startDate="1970-01-01"
    endDate="1999-12-31"
  />
</div>
