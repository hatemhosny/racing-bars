---
title: Select Bars
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars';

A demo for using [`selectBars`](../documentation/options.md#selectbars). Click on the bars for selection.

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    selectBars={true}
  />
</div>

The color of the selected bars can be customized with CSS. Example:

```css
#race .selected {
  fill: #27b7ff !important;
  stroke: #d12020 !important;
  stroke-width: 1 !important;
}
```
