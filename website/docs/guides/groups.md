---
title: Groups
---

import RacingBars from '../../src/components/RacingBars';

Bars can have groups (e.g. countries grouped by continents).
Bars in the same group have the same color.

A legend is displayed above the chart that shows the group names with their colors.
Single-click on the group legend toggles hiding/showing group bars. Double-click shows only this group.
Triple-click shows all groups.

To display groups:

- set the [`showGroups`](../documentation/options.md#showgroups) option to `true`.
- add the field `group`, to the [data items](../documentation/data.md#long-data).

Example: [view in gallery](../gallery/show-groups.md)

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    showGroups={true}
  />
</div>
