---
title: Title and Sub-Title
---

import { RacingBarsComponent } from '../racing-bars.js';

A demo for using string in `title` and `subTitle`.

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBarsComponent
    elementId="gallery-title-string"
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
  />
</div>

### Code

```html {5,6}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    title: 'World Population',
    subTitle: 'in millions',
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
