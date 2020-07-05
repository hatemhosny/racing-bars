---
title: Overview
---

Racing Bars is an [open-source](https://github.com/hatemhosny/racing-bars), light-weight (25kb gzipped),
easy-to-use, and [feature-rich](./features.md) javascript library for racing bar charts.
It is based on <a href="https://d3js.org" target="_blank" className="external">D3.js</a>.
Available for vanilla [javascript](./getting-started/installation.md),
[typescript](./packages/typescript.md),
[react](./packages/react.md),
[vue](./packages/vue.md)
and [python](./packages/python.md).

import RacingBars from '../racing-bars.js';

This code:

```html
<div id="race"></div>
<script>
  racingBars.loadData('/data/population.json').then((data) => {
    racingBars.race(data);
  });
</script>
```

... produces this chart:

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
  />
</div>
<p> </p>
<p>... while that code:</p>

```html
<style>
  .container {
    width: 800px;
    height: 400px;
  }
</style>
<div class="container">
  <div id="race2"></div>
</div>
<script>
  const options = {
    selector: '#race2',
    title: 'World Population in 60 Years',
    subTitle: 'Country Population in millions',
    caption: 'Source: World Bank',
    dateCounter: 'MMM YYYY',
    showGroups: false,
    showIcons: true,
    labelsPosition: 'outside',
    labelsWidth: 120,
    autorun: false,
    showOverlays: 'all',
    theme: 'dark',
  };

  racingBars.loadData('/data/population.json').then((data) => {
    const dataWithIcons = data.map((d) => ({
      ...d,
      icon: `https://www.countryflags.io/${d.code.toLowerCase()}/flat/64.png`,
    }));

    racingBars.race(dataWithIcons, options);
  });
</script>
```

... produces that chart:

export const transformFn = (data) => data.map((d) => ({
...d,
icon: `https://www.countryflags.io/${d.code.toLowerCase()}/flat/64.png`,
}));

<div style={{width: 800, height: 400}}>
  <div className="gallery">
    <RacingBars
      dataUrl="/data/population.csv"
      dataType="csv"
      dataTransform={transformFn}
      title="World Population in 60 Years"
      subTitle="Country Population in millions"
      caption="Source: World Bank"
      dateCounter= "MMM YYYY"
      showGroups={false}
      showIcons={true}
      labelsPosition="outside"
      labelsWidth="120"
      autorun={false}
      showOverlays="all"
      theme="dark"
    />
  </div>
</div>
