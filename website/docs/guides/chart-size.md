---
title: Chart Size
---

By default the chart will take the size of the containing element (specified by the [`selector`](../documentation/options.md#selector) option).
So, the chart can be easily sized by sizing that element (e.g. by CSS).

Example:

```html
<style>
  #race {
    height: 95vh;
    width: 100%;
  }
</style>
<div id="race"></div>

<script>
  const options = {
    selector: '#race',
  };
  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```

Alternatively, the chart can be sized using the [`height`](../documentation/options.md#height) and [`width`](../documentation/options.md#width) options.

This example sets the chart size in pixels:

```html
<div id="race"></div>

<script>
  const options = {
    selector: '#race',
    height: 700,
    width: 900,
  };
  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```

While this example sets the chart size as ratio of window size (`innerHeight` and `innerWidth`):

```html
<div id="race"></div>

<script>
  const options = {
    selector: '#race',
    height: '0.9*window',
    width: '0.8*window',
  };
  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```

Note that the minimum height of the chart is 300px and the minimum width is 500px.
