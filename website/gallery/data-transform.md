---
title: Data Transform
---

import RacingBars from '../racing-bars.js';

A demo showing the use of [dataTransform function](/docs/documentation/options#datatransform).

<!--truncate-->

### Chart

export const transformFn = (data) => data.map((d) => ({
...d,
icon: `https://www.countryflags.io/${d.code.toLowerCase()}/flat/64.png`,
}));

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    dataTransform={transformFn}
    title="World Population in 60 Years"
    subTitle="Country Population in millions"
    caption="Source: World Bank"
    dateCounter="YYYY"
    showIcons={true}
    labelsPosition="outside"
  />
</div>

### Code

```html {11}
<div id="race"></div>
<script>
  const transformFn = (data) =>
    data.map((d) => ({
      ...d,
      icon: `https://www.countryflags.io/${d.code.toLowerCase()}/flat/64.png`,
    }));

  const options = {
    selector: '#race',
    dataTransform: transformFn,
    title: 'World Population in 60 Years',
    subTitle: 'Country Population in millions',
    caption: 'Source: World Bank',
    dateCounter: 'YYYY',
    showIcons: true,
    labelsPosition: 'outside',
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
