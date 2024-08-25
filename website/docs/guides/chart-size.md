---
title: Chart Size
---

By default the chart will take the size of the [container element](../documentation/api.md#race).
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

<script type="module">
  import { race } from 'https://cdn.jsdelivr.net/npm/racing-bars';

  race('/data.json', '#race', {
    /* options */
  });
</script>
```

Alternatively, the chart can be sized using the [`height`](../documentation/options.md#height) and [`width`](../documentation/options.md#width) options.

This example sets the chart size in pixels:

```html
<div id="race"></div>
<script type="module">
  import { race } from 'https://cdn.jsdelivr.net/npm/racing-bars';

  race('/data.json', '#race', { height: 500, width: 900 });
</script>
```

While this example sets the chart size as ratio of window size (`innerHeight` and `innerWidth`):

```html
<div id="race"></div>
<script type="module">
  import { race } from 'https://cdn.jsdelivr.net/npm/racing-bars';

  race('/data.json', '#race', { height: 'window*0.8', width: 'window*0.9' });
</script>
```

Note that the minimum height of the chart is 300px and the minimum width is 500px.
