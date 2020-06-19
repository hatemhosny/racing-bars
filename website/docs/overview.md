---
title: Overview
---

Racing Bars is an [open-source](https://github.com/hatemhosny/racing-bars), light-weight (25kb gzipped),
easy-to-use, and [feature-rich](./features) javascript library for racing bar charts.
It is based on [D3.js](https://d3js.org) and written in [typescript](https://www.typescriptlang.org).

This code:

```javascript
racingBars.loadData('/data/population.json').then((data) => {
  racingBars.race(data);
});
```

outputs this:

import { RacingBarsComponent } from '../racing-bars.js';

<div className="gallery">
  <RacingBarsComponent data={globalThis.data.population} />
</div>
