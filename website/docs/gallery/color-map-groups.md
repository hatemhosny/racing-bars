---
title: Color Map for Groups
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';

A demo for using a [color map](../documentation/options.md#colormap) for [groups](../documentation/options.md#showgroups).

<!--truncate-->

### Chart

export const continentColors = {
Asia: 'yellow',
Europe: 'green',
};

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    colorMap={continentColors}
    showGroups={true}
  />
</div>
