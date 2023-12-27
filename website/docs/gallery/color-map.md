---
title: Color Map
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars';

A demo for using a color map.

<!--truncate-->

### Chart

export const countryColors = {
India: 'orange',
'United States': 'blue',
};

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    colorMap={countryColors}
    showGroups={false}
  />
</div>

### Code

```html {11}
<div id="race"></div>
<script>
  const countryColors = {
    India: 'orange',
    'United States': 'blue',
  };

  const options = {
    selector: '#race',
    title: 'World Population',
    colorMap: countryColors,
    showGroups: false,
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
