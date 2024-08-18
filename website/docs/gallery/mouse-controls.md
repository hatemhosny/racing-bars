---
title: Mouse Controls
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';

A demo for using [`mouseControls`](../documentation/options.md#mousecontrols).
See the guide on [`chart controls`](../guides/chart-controls.md).

<!--truncate-->

Click on the chart to toggle play/pause, double-click to trigger skip-forward and triple-click to trigger skip-back.

Notice that this does not interfere with click/double-click/triple-click on group legends as documented in [`showGroups`](../documentation/options.md#showgroups)

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    mouseControls={true}
    showGroups={true}
/>

</div>
