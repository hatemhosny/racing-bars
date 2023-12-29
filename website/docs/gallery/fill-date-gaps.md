---
title: Filling Date Gaps
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars';

A demo for using [`fillDateGapsInterval`](/docs/documentation/options#filldategapsinterval) and [`fillDateGapsValue`](/docs/documentation/options#filldategapsvalue).

See the guide on [`Filling Date Gaps`](/docs/guides/fill-date-gaps).

<!--truncate-->

<!-- prettier-ignore-start -->

export const multiplyBy1000 = ((data) => data.map(((d) => ({
  ...d,
value: Number(d.value)*1000,
}))));

<!-- prettier-ignore-end -->

## fillDateGapsInterval: null (default)

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    fillDateGapsInterval={null}
    dataTransform={multiplyBy1000}
    controlButtons="all"
    dynamicProps={{dataTransform: `function multiplyBy1000(data) {
  return data.map((d) => ({
    ...d,
    value: Number(d.value) * 1000,
  }));
}`}}
  />
</div>

### Code

```html {6}
<div id="race1"></div>
<script>
  const options = {
    selector: '#race1',
    title: 'World Population',
    fillDateGapsInterval: null,
    endDate: '1965-01-01',
    dataTransform: multiplyBy1000,
    controlButtons: 'all',
  };

  racingBars.loadData('data/gdp.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });

  // multiply values by 1000 to get larger numbers
  function multiplyBy1000(data) {
    return data.map((d) => ({
      ...d,
      value: Number(d.value) * 1000,
    }));
  }
</script>
```

## fillDateGapsInterval, "month", fillDateGapsValue: "interpolate"

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    fillDateGapsInterval="month"
    fillDateGapsValue="interpolate"
    dataTransform={multiplyBy1000}
    controlButtons="all"
    dynamicProps={{dataTransform: `function multiplyBy1000(data) {
  return data.map((d) => ({
    ...d,
    value: Number(d.value) * 1000,
  }));
}`}}
  />
</div>

### Code

```html {6,7}
<div id="race1"></div>
<script>
  const options = {
    selector: '#race1',
    title: 'World Population',
    fillDateGapsInterval: 'month',
    fillDateGapsValue: 'interpolate',
    dataTransform: multiplyBy1000,
    controlButtons: 'all',
  };

  racingBars.loadData('data/gdp.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });

  // multiply values by 1000 to get larger numbers
  function multiplyBy1000(data) {
    return data.map((d) => ({
      ...d,
      value: Number(d.value) * 1000,
    }));
  }
</script>
```

## fillDateGapsInterval, "month", fillDateGapsValue: "last"

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    fillDateGapsInterval="month"
    fillDateGapsValue="last"
    dataTransform={multiplyBy1000}
    controlButtons="all"
    dynamicProps={{dataTransform: `function multiplyBy1000(data) {
  return data.map((d) => ({
    ...d,
    value: Number(d.value) * 1000,
  }));
}`}}
  />
</div>

### Code

```html {6,7}
<div id="race1"></div>
<script>
  const options = {
    selector: '#race1',
    title: 'World Population',
    fillDateGapsInterval: 'month',
    fillDateGapsValue: 'last',
    dataTransform: multiplyBy1000,
    controlButtons: 'all',
  };

  racingBars.loadData('data/gdp.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });

  // multiply values by 1000 to get larger numbers
  function multiplyBy1000(data) {
    return data.map((d) => ({
      ...d,
      value: Number(d.value) * 1000,
    }));
  }
</script>
```
