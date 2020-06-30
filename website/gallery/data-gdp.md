---
title: GDP Dataset
---

import { RacingBarsComponent } from '../racing-bars.js';

A demo showing the use of [GDP dataset](/docs/sample-datasets#gdp).

<!--truncate-->

### Chart

export const transformFn = (data) => data.map((d) => ({
...d,
icon: `https://www.countryflags.io/${d.code.toLowerCase()}/flat/64.png`,
}));

<div className="gallery">
  <RacingBarsComponent
    dataUrl="/data/gdp.csv"
    dataType="csv"
    dataTransform={transformFn}
    title="Gross domestic product (GDP)"
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
    title: 'Gross domestic product (GDP)',
    caption: 'Source: World Bank',
    dateCounter: 'YYYY',
    showIcons: true,
    labelsOnBars: false,
  };

  racingBars.loadData('/data/gdp.csv', 'csv').then((data) => {
    const dataWithIcons = data.map((d) => ({
      ...d,
      icon: `https://www.countryflags.io/${d.code.toLowerCase()}/flat/64.png`,
    }));

    racingBars.race(dataWithIcons, options);
  });
</script>
```
