---
title: Slider
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';
import styles from './slider.module.css';

A demo for using the [API](../documentation/api.md#race) to make a chart that can be controller by a slider.

<!--truncate-->

### Chart

export let chartObj;

export const callback = (racer, data) => {
chartObj = racer;
const container = document.querySelector('#slider-container');
container.style.visibility = 'visible';
const slider = document.getElementById('slider');
const dates = racer.getAllDates();
slider.max = dates.length - 1;
slider.addEventListener('input', () => {
racer.setDate(dates[slider.value]);
});
document.addEventListener('dateChange', (e) => {
slider.value = dates.indexOf(e.detail.date);
});
};

<div>
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="Chart Slider Demo"
    callback={callback}
    showCode={false}
    height='window*0.7'
  />
</div>

<div id="slider-container" class={styles.slider_container} style={{visibility: 'hidden'}}>
  <input type="range" min="0" max="100" value="0" id="slider" class={styles.slider} />
</div>

### Code

```html
<div id="race"></div>
<input type="range" min="0" max="100" value="0" id="slider" />

<script type="module">
  import { race } from 'https://cdn.jsdelivr.net/npm/racing-bars';

  const options = {
    title: 'Chart Slider Demo',
  };

  const racer = await race('/data/population.json', '#race', options);

  const slider = document.getElementById('slider');
  const dates = racer.getAllDates();

  slider.max = dates.length - 1;
  slider.addEventListener('input', () => {
    racer.setDate(dates[slider.value]);
  });
  document.addEventListener('dateChange', (e) => {
    slider.value = dates.indexOf(e.detail.date);
  });
</script>
```

<a href="https://livecodes.io/?x=id/yn3ptgz7j4r" target="_blank" class="external">Open in playground</a>
