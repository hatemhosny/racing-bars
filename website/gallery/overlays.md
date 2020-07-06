---
title: Overlays
---

import RacingBars from '../racing-bars.js';

A demo for using [`overlays`](/docs/documentation/options#overlays).

See the guide on [`chart controls`](/docs/guides/chart-controls).

<!--truncate-->

## overlays: 'all'

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
    overlays="all"
    autorun={false}
    endDate="1965-01-01"
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
    overlays: 'all',
    autorun: false,
    endDate: '1965-01-01',
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```

## overlays: 'none' (default)

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
    overlays="none"
    endDate="1965-01-01"
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
    overlays: 'none',
    endDate: '1965-01-01',
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
