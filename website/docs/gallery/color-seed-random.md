---
title: Random Color Seed
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars';

A demo for using random color seed.

<!--truncate-->

Refresh the page to get different bar colors.

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    colorSeed={Math.round(Math.random() * 100)}
    dynamicProps={{colorSeed: 'Math.round(Math.random() * 100)'}}
  />
</div>

### Code

```html {6}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    title: 'World Population',
    colorSeed: Math.round(Math.random() * 100), // random number between 0-100
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
