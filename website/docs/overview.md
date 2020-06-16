---
id: overview
title: Overview
---

Racing Bars is an [open-source](https://github.com/hatemhosny/racing-bars), light-weight (25kb gzipped),
easy-to-use, and [feature-rich](./features) javascript library for racing bar charts.
It is based on [D3.js](https://d3js.org) and written in [typescript](https://www.typescriptlang.org).

This code:

```javascript
racingBars.loadData('./population.json').then((data) => {
  racingBars.race(data);
});
```

outputs this:

import { RacingBarsComponent as RacingBars, racingBars } from '../../dist/react/racing-bars.esm.js';

<RacingBars data={globalThis.procedures} />
