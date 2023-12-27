---
title: Mouse Controls
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars';

A demo for using [`mouseControls`](/docs/documentation/options#mousecontrols).
See the guide on [`chart controls`](/docs/guides/chart-controls).

<!--truncate-->

Click on the chart to toggle play/pause, double-click to trigger skip-forward and triple-click to trigger skip-back.

Notice that this does not interfere with click/double-click/triple-click on group legends as documented in [`showGroups`](/docs/documentation/options#showgroups)

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
    mouseControls={true}
    showGroups={true}
/>

</div>

### Code

```html {7}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    title: 'World Population',
    subTitle: 'in millions',
    mouseControls: true,
    showGroups: true,
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
