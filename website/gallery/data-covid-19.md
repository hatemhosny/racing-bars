---
title: Covid-19 Dataset
---

import { RacingBarsComponent } from '../racing-bars.js';

A demo showing the use of [covid-19 dataset](/docs/sample-datasets#covid-19).

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBarsComponent
    dataUrl="/data/covid-19.csv"
    dataType="csv"
    title="Covid-19"
    subTitle="Number of confirmed cases"
    dateCounter="MMM DD, YYYY"
    labelsPosition="outside"
/>

</div>

### Code

```html
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    title: 'Covid-19',
    subTitle: 'Number of confirmed cases',
    dateCounter: 'MMM DD, YYYY',
    labelsPosition: 'outside',
  };

  racingBars.loadData('/data/covid-19.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
