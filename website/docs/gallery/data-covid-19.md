---
title: Covid-19 Dataset
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars';

A demo showing the use of [covid-19 dataset](/docs/sample-datasets#covid-19).

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBars
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
