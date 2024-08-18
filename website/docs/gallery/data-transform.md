---
title: Data Transform
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';

A demo showing the use of [dataTransform function](../documentation/options.md#datatransform).

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
    showIcons={true}
    labelsPosition="outside"
    dynamicProps={{dataTransform: `(data) => data.map((d) => ({ ...d, icon: \`https://flagsapi.com/\${d.code}/flat/64.png\`}))`}}
  />
</div>
