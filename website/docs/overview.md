---
title: Overview
---

Racing Bars is an [open-source](https://github.com/hatemhosny/racing-bars), light-weight (25kb gzipped),
easy-to-use, and [feature-rich](./features.md) javascript library for racing bar charts.
It is based on [D3.js](https://d3js.org).
Available for vanilla [javascript](./getting-started/installation.md),
[typescript](./packages/typescript.md),
[react](./packages/react.md),
[vue](./packages/vue.md)
and [python](./packages/python.md).

This code:

```javascript
racingBars.loadData('/data/population.json').then((data) => {
  racingBars.race(data);
});
```

produces this chart:

import { RacingBarsComponent } from '../racing-bars.js';

<div className="gallery">
  <RacingBarsComponent data={globalThis.data.population} />
</div>
