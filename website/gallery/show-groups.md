---
title: Groups
---

import { RacingBarsComponent } from '../racing-bars.js';

A demo for groups ([`showGroups`](../docs/documentation/options#showgroups)).

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBarsComponent
    elementId="gallery-show-groups"
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    showGroups={true}
  />
</div>

### Code

```html {6}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    title: 'World Population',
    showGroups: true,
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```

## Without groups

### Chart

<div className="gallery">
  <RacingBarsComponent
    elementId="gallery-show-groups2"
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    showGroups={false}
  />
</div>

### Code

```html {6}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    title: 'World Population',
    showGroups: false,
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
