---
title: Fixed Scale (invisible labels!)
---

import RacingBars from '../racing-bars.js';

A demo for using [`fixedScale`](/docs/documentation/options#fixedscale).

<!--truncate-->

Notice that initially most of the bar labels are not visible.
To avoid such problem, consider setting [`labelsPosition`](/docs/documentation/options#labelsposition) to `'outside'` ([demo](./fixed-scale-labels)).

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/covid-19.csv"
    dataType="csv"
    title="Covid-19 Confirmed Cases"
    fixedScale={true}
/>

</div>

### Code

```html {6}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    title: 'Covid-19 Confirmed Cases',
    fixedScale: true,
  };

  racingBars.loadData('/data/covid-19.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
