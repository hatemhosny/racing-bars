---
title: Fixed Scale (with Visible Labels)
---

import { RacingBarsComponent } from '../racing-bars.js';

A demo for using [`fixedScale`](/docs/documentation/options#fixedscale) with [`labelsOnBars`](/docs/documentation/options#labelsonbars),
to avoid [such problem](./fixed-scale).

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBarsComponent
    dataUrl="/data/covid-19.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
    fixedScale={true}
    labelsOnBars={false}
/>

</div>

### Code

```html {7,8}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    title: 'World Population',
    subTitle: 'in millions',
    fixedScale: true,
    labelsOnBars: false,
  };

  racingBars.loadData('/data/covid-19.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
