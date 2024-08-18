---
title: Highlight Bars
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars';

A demo for using [`highlightBars`](../documentation/options.md#highlightbars). Hover on the chart to see the highlighted bars.

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    highlightBars={true}
  />
</div>

The color of the highlighted bars can be customized with CSS. Example:

```css
#race .highlight {
  fill: #27b7ff !important;
}
```
