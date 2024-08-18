---
title: Color Map
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';

A demo for using a [color map](../documentation/options.md#colormap).

<!--truncate-->

### Chart

export const countryColors = {
India: 'orange',
'United States': 'blue',
};

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    colorMap={countryColors}
    showGroups={false}
  />
</div>
