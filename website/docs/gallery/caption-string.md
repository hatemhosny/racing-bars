---
title: Caption (string)
toc_min_heading_level: 6
toc_max_heading_level: 6
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
