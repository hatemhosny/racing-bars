---
title: Color Map for Groups
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars.tsx';

A demo for using a color map for groups.

<!--truncate-->

### Chart

export const continentColors = {
Asia: 'yellow',
Europe: 'green',
};

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    colorMap={continentColors}
    showGroups={true}
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
    showGroups: true,
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
