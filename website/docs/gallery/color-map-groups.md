---
title: Color Map for Groups
toc_min_heading_level: 6
toc_max_heading_level: 6
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
