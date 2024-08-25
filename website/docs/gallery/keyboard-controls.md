---
title: Keyboard Controls
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';

A demo for using [`keyboardControls`](../documentation/options.md#keyboardcontrols).
See the guide on [`chart controls`](../guides/chart-controls.md).

<!--truncate-->

Use the keyboard key <kbd>A</kbd> to trigger skip-back, the key <kbd>S</kbd> or <kbd>spacebar</kbd> to toggle play/pause and the key <kbd>D</kbd> to trigger skip-forward.

Notice that both charts are affected. Also notice that typing in the `input` and `textarea` elements does not affect the charts.

### Charts

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
    keyboardControls={true}
    showGroups={true}
/>
</div>

<div className="gallery">
<RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
    keyboardControls={true}
    showGroups={false}
/>
</div>
  <span>try typing here:</span>
  <div><input type="text" /></div>
  <span>or here:</span>
  <div><textarea></textarea></div>
