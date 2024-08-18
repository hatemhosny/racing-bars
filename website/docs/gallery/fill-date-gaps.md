---
title: Filling Date Gaps
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars';

A demo for using [`fillDateGapsInterval`](../documentation/options.md#filldategapsinterval) and [`fillDateGapsValue`](../documentation/options.md#filldategapsvalue).

See the guide on [`Filling Date Gaps`](../guides/fill-date-gaps.md).

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
    fillDateGapsInterval={null}
    dataTransform={multiplyBy1000}
    dynamicProps={{dataTransform: `function multiplyBy1000(data) {
  return data.map((d) => ({
    ...d,
    value: Number(d.value) * 1000,
  }));
}`}}
  />
</div>

## fillDateGapsInterval, "month", fillDateGapsValue: "interpolate"

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    fillDateGapsInterval="month"
    fillDateGapsValue="interpolate"
    dataTransform={multiplyBy1000}
    dynamicProps={{dataTransform: `function multiplyBy1000(data) {
  return data.map((d) => ({
    ...d,
    value: Number(d.value) * 1000,
  }));
}`}}
  />
</div>

## fillDateGapsInterval, "month", fillDateGapsValue: "last"

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    fillDateGapsInterval="month"
    fillDateGapsValue="last"
    dataTransform={multiplyBy1000}
    dynamicProps={{dataTransform: `function multiplyBy1000(data) {
  return data.map((d) => ({
    ...d,
    value: Number(d.value) * 1000,
  }));
}`}}
  />
</div>
