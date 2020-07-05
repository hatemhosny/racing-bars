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
    dataUrl="/data/population.csv"
    dataType="csv"
    dataTransform={transformFn}
    title="World Population in 60 Years"
    showIcons={true}
    labelsPosition="outside"
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
    labelsPosition: 'outside',
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

Notice setting [`labelsPosition`](/docs/documentation/options#labelsposition) to `'outside'` to keep the labels visible, since the icons will take some space on the bar.
