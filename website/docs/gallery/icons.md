---
title: Icons
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars.tsx';

A demo showing the use of [icons](/docs/guides/icons).

<!--truncate-->

### Chart

export const transformFn = (data) => data.map((d) => ({
...d,
icon: `https://flagsapi.com/${d.code}/flat/64.png`,
}));

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    dataTransform={transformFn}
    title="World Population in 60 Years"
    subTitle="Country Population in millions"
    caption="Source: World Bank"
    showIcons={true}
    labelsPosition="outside"
  />
</div>

### Code

```html {8,15}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    title: 'World Population in 60 Years',
    subTitle: 'Country Population in millions',
    caption: 'Source: World Bank',
    showIcons: true,
    labelsPosition: 'outside',
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    const dataWithIcons = data.map((d) => ({
      ...d,
      icon: `https://flagsapi.com/${d.code}/flat/64.png`,
    }));
    racingBars.race(dataWithIcons, options);
  });
</script>
```

You may also use the [`dataTransform`](/docs/documentation/options#datatransform) option for data transformation,
like in [this example](./data-transform).
<br />
