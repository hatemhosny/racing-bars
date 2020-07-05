---
title: Fixed Scale (with Visible Labels)
---

import RacingBars from '../racing-bars.js';

A demo for using [`fixedScale`](/docs/documentation/options#fixedscale) with [`labelsPosition`](/docs/documentation/options#labelsposition),
to avoid [such problem](./fixed-scale).

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/covid-19.csv"
    dataType="csv"
    title="Covid-19 Confirmed Cases"
    fixedScale={true}
    labelsPosition="outside"
/>

</div>

### Code

```html {6,7}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    title: 'Covid-19 Confirmed Cases',
    fixedScale: true,
    labelsPosition: 'outside',
  };

  racingBars.loadData('/data/covid-19.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
