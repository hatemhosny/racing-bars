---
title: Data Transform
toc_min_heading_level: 6
toc_max_heading_level: 6
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
