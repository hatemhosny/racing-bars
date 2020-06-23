---
title: Dark Theme
---

import { RacingBarsComponent } from '../racing-bars.js';

A demo for showing the dark theme.

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBarsComponent
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
    showGroups={false}
    theme="dark"
  />
</div>

### Code

```html {8}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    title: 'World Population',
    subTitle: 'in millions',
    showGroups: false,
    theme: 'dark',
  };
  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
