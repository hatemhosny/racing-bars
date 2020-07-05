---
title: Color Palette
---

import RacingBars from '../racing-bars.js';

A demo for using a color palette.

<!--truncate-->

### Chart

export const palette = [
'#636EFA',
'#EF553B',
'#00CC96',
'#AB63FA',
'#FFA15A',
'#19D3F3',
'#FF6692',
'#B6E880',
'#FF97FF',
'#FECB52',
];

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    colorMap={palette}
    showGroups={false}
  />
</div>

### Code

```html {19}
<div id="race"></div>
<script>
  const palette = [
    '#636EFA',
    '#EF553B',
    '#00CC96',
    '#AB63FA',
    '#FFA15A',
    '#19D3F3',
    '#FF6692',
    '#B6E880',
    '#FF97FF',
    '#FECB52',
  ];

  const options = {
    selector: '#race',
    title: 'World Population',
    colorMap: palette,
    showGroups: false,
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
