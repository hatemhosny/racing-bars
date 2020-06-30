---
title: Color Seed
---

import { RacingBarsComponent } from '../racing-bars.js';

A demo for using color seed.

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBarsComponent
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    colorSeed={42}
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
    colorSeed: 42,
    showGroups: false,
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```

## Without `colorSeed`

### Chart

<div className="gallery">
  <RacingBarsComponent
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    showGroups={false}
  />
</div>

### Code

```html
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
