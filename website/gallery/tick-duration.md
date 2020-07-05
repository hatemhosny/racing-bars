---
title: Chart Speed (tickDuration)
---

import RacingBars from '../racing-bars.js';

A demo for using `tickDuration` to control chart "speed".

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
    tickDuration={200}
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
    tickDuration: 200,
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```
