---
title: Keyboard Controls
---

import RacingBars from '../racing-bars.js';

A demo for using [`keyboardControls`](/docs/documentation/options#keyboardControls).
See the guide on [`chart controls`](/docs/guides/chart-controls).

<!--truncate-->

Use the keyboard key <kbd>A</kbd> to trigger skip-back, the key <kbd>S</kbd> or <kbd>spacebar</kbd> to toggle play/pause and the key <kbd>D</kbd> to trigger skip-forward.

Notice that both charts are affected. Also notice that typing in the `input` and `textarea` elements does not affect the charts.

### Charts

<div>
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
    keyboardControls={true}
    showGroups={true}
    height="300"
/>
</div>

<div>
<RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
    keyboardControls={true}
    showGroups={false}
    height="300"
/>
</div>
  <span>try typing here:</span>
  <div><input type="text" /></div>
  <span>or here:</span>
  <div><textarea></textarea></div>

### Code

```html {20}
<div>
  <div id="race"></div>
</div>
<div>
  <div id="race2"></div>
</div>
<span>try typing here:</span>
<div>
  <input type="text" />
</div>
<span>or here:</span>
<div>
  <textarea></textarea>
</div>
<script>
  const options = {
    selector: '#race',
    title: 'World Population',
    subTitle: 'in millions',
    mouseControls: true,
    showGroups: true,
    height: 300,
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
    racingBars.race(data, { ...options, selector: '#race2', showGroups: false });
  });
</script>
```
