---
title: Population Dataset
---

import { RacingBarsComponent } from '../racing-bars.js';

A demo showing the use of [population dataset](/docs/sample-datasets#population).

<!--truncate-->

### Chart

export const transformFn = (data) => data.map((d) => ({
...d,
icon: `https://www.countryflags.io/${d.code.toLowerCase()}/flat/64.png`,
}));

<div className="gallery">
  <RacingBarsComponent
    elementId="gallery-data-population"
    dataUrl="/data/population.csv"
    dataType="csv"
    dataTransform={transformFn}
    title="World Population in 60 Years"
    subTitle="Country Population in millions"
    caption="Source: World Bank"
    dateCounter="YYYY"
    showIcons={true}
    labelsOnBars={false}
  />
</div>

### Code

```html
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    title: 'World Population in 60 Years',
    subTitle: 'Country Population in millions',
    caption: 'Source: World Bank',
    dateCounter: 'YYYY',
    showIcons: true,
    labelsOnBars: false,
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
