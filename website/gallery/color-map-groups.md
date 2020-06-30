---
title: Color Map for Groups
---

import { RacingBarsComponent } from '../racing-bars.js';

A demo for using a color map for groups.

<!--truncate-->

### Chart

export const continentColors = {
Asia: 'yellow',
Europe: 'green',
};

<div className="gallery">
  <RacingBarsComponent
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    colorMap={continentColors}
  />
</div>

### Code

```html {11}
<div id="race"></div>
<script>
  const continentColors = {
    Asia: 'yellow',
    Europe: 'green',
  };

  const options = {
    selector: '#race',
    title: 'World Population',
    colorMap: continentColors,
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
