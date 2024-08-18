---
title: Population Dataset
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';

A demo showing the use of [population dataset](../sample-datasets#population).

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
    dateCounter="YYYY"
    showIcons={true}
    labelsPosition="outside"
  />
</div>
