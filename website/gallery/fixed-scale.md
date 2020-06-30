---
title: Fixed Scale (invisible labels!)
---

import { RacingBarsComponent } from '../racing-bars.js';

A demo for using [`fixedScale`](/docs/documentation/options#fixedscale).

<!--truncate-->

Notice that initially most of the bar labels are not visible.
To avoid such problem, consider setting [`labelsOnBars`](/docs/documentation/options#labelsonbars) to `false` ([demo](./fixed-scale-labels)).

### Chart

<div className="gallery">
  <RacingBarsComponent
    dataUrl="/data/covid-19.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
    fixedScale={true}
/>

</div>

### Code

```html {7}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    title: 'World Population',
    subTitle: 'in millions',
    fixedScale: true,
  };

  racingBars.loadData('/data/covid-19.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
