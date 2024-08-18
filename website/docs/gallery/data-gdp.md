---
title: GDP Dataset
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';

A demo showing the use of [GDP dataset](../sample-datasets#gdp).

<!--truncate-->

### Chart

export const transformFn = (data) => data.map((d) => ({
...d,
icon: `https://flagsapi.com/${d.code}/flat/64.png`,
}));

<div className="gallery">
  <RacingBars
    dataUrl="/data/gdp.csv"
    dataType="csv"
    dataTransform={transformFn}
    title="Gross domestic product (GDP)"
    caption="Source: World Bank"
    dateCounter="YYYY"
    showIcons={true}
    labelsPosition="outside"
    dynamicProps={{dataTransform: `(data) => data.map((d) => ({ ...d, icon: \`https://flagsapi.com/\${d.code}/flat/64.png\` }))`}}
  />
</div>
