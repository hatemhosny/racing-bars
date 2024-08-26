---
title: Select Bars
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';
import { selectBars } from './\_gallery-demos.ts';

A demo for using [`selectBars`](../documentation/options.md#selectbars). Click on the bars for selection.

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBars
    {...selectBars}
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
