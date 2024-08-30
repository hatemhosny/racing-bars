---
title: Highlight Bars
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';
import { highlightBars } from './\_gallery-demos.ts';

A demo for using [`highlightBars`](../documentation/options.md#highlightbars). Hover on the chart to see the highlighted bars.

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBars
    {...highlightBars}
  />
</div>

The color of the highlighted bars can be customized with CSS. Example:

```css
#race .highlight {
  fill: #27b7ff !important;
}
```
