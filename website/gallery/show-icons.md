---
title: Icons
---

import { RacingBarsComponent } from '../racing-bars.js';

A demo showing the use of icons ([`showIcons`](/docs/documentation/options#showicons)).

<!--truncate-->

### Chart

export const transformFn = (data) => data.map((d) => ({
...d,
icon: `https://www.countryflags.io/${d.code.toLowerCase()}/flat/64.png`,
}));

<div className="gallery">
  <RacingBarsComponent
    elementId="gallery-data-transfom"
    dataUrl="/data/population.csv"
    dataType="csv"
    dataTransform={transformFn}
    title="World Population in 60 Years"
    showIcons={true}
    labelsOnBars={false}
    showGroups={false}
  />
</div>

### Code

```html {7,8}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    dataTransform: transformFn,
    title: 'World Population',
    showIcons: true,
    labelsOnBars: false,
    showGroups: false,
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    const dataWithIcons = data.map((d) => ({
      ...d,
      icon: `https://www.countryflags.io/${d.code.toLowerCase()}/flat/64.png`,
    }));

    racingBars.race(dataWithIcons, options);
  });
</script>
```

Notice setting [`labelsOnBars`](/docs/documentation/options#labelsonbars) to false to keep the labels visible, since the icons will take some space on the bar.
