---
title: Margins
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';

A demo for using [margins](../documentation/options.md#marginbottom).

<!--truncate-->

### Chart

<div className="gallery" style={{border: '1px solid black'}}>
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    marginTop={40}
    marginBottom={40}
    marginRight={40}
    marginLeft={40}
    labelsPosition="outside"
  />
</div>
