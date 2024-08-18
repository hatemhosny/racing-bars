---
title: Caption (string)
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';

This example shows the use of a string as a [caption](../documentation/options#caption).

<!--truncate-->

### Chart

export const options = {
caption: 'Source: World Bank',
};

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    caption={options.caption}
  />
</div>
