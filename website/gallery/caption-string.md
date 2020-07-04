---
title: Caption (string)
---

import { RacingBarsComponent } from '../racing-bars.js';
import CodeTabs from '../src/Components/code-tabs/code-tabs.js'
import TabItem from '@theme/TabItem';

A demo for using string in caption.

<!--truncate-->

### Chart

<div className="gallery">
  <RacingBarsComponent
    dataUrl="/data/population.csv"
    dataType="csv"
    caption="Source: World Bank"
  />
</div>

### Code

<CodeTabs>
<TabItem value="js">

```html {5}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    caption: 'Source: World Bank',
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```

</TabItem>
<TabItem value="ts">

```ts {5}
import { loadData, race, Data } from 'racing-bars';

const options = {
  selector: '#race',
  caption: 'Source: World Bank',
};

loadData('/data/population.csv', 'csv').then((data: Data[]) => {
  race(data, options);
});
```

</TabItem>
<TabItem value="ng">

```html
<racing-bars
    dataUrl="assets/data/population.csv"
    dataType="csv"
    // highlight-next-line
    caption="Source: World Bank"
  >
  </racing-bars>
```

</TabItem>
<TabItem value="react">

<!-- prettier-ignore-start -->
```jsx
import { RacingBarsComponent } from 'racing-bars/react';

<RacingBarsComponent
  dataUrl="/data/population.csv"
  dataType="csv"
  // highlight-next-line
  caption="Source: World Bank"
/>
```
<!-- prettier-ignore-end -->

</TabItem>
<TabItem value="vue">

```js
import { RacingBarsComponent as RacingBars } from 'racing-bars/vue';

export default {
  name: 'app',
  components: { RacingBars },
  template: `
  <racing-bars
    data-url="/data/population.csv"
    data-type="csv"
    // highlight-next-line
    caption="Source: World Bank"
  />`,
};
```

</TabItem>
<TabItem value="py">

```py
import racingbars as bars

bars.race(data="/data/population.csv", caption="Source: World Bank")
```

</TabItem>
</CodeTabs>
