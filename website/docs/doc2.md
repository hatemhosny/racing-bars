---
title: Bar Chart Race
---

import { RacingBarsComponent as RacingBars, racingBars } from '../../dist/react/racing-bars.esm.js';

<RacingBars
  data={globalThis.procedures}
  title="A Tale of 11 Years"
  subTitle="Top 10 Surgical Procedures"
  dateCounterFormat="MM/YYYY"
  caption="Aswan Heart Centre"
  loop={true}
  autorun={false}
/>

```jsx {3} title="react-component.js"
<RacingBars
  data={globalThis.procedures}
  title="A Tale of 11 Years"
  subTitle="Top 10 Surgical Procedures"
  dateCounterFormat="MM/YYYY"
  caption="Aswan Heart Centre"
  loop={true}
  autorun={false}
/>
```
