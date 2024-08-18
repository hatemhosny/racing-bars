---
title: Color Palette
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';

A demo for using a [color palette](../documentation/options.md#colormap).

<!--truncate-->

### Chart

export const palette = [
'#636EFA',
'#EF553B',
'#00CC96',
'#AB63FA',
'#FFA15A',
'#19D3F3',
'#FF6692',
'#B6E880',
'#FF97FF',
'#FECB52',
];

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    colorMap={palette}
    showGroups={false}
  />
</div>
