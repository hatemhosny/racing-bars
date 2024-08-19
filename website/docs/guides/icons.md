---
title: Icons
---

import RacingBars from '../../src/components/RacingBars';

Bars can have icons.

To achieve this:

- set the [`showIcons`](../documentation/options.md#showicons) option to `true`.
- add the field `icon`, with icon URLs, to the [data items](../documentation/data.md#long-data).

Example:

This example uses the `code` field, in the [population dataset](../sample-datasets.md#population), to create a new `icon` field containing a valid URL.

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
    dynamicProps={{dataTransform: `(data) => data.map((d) => ({
      ...d,
      icon: \`https://flagsapi.com/\${d.code}/flat/64.png\`,
    }))`}}
  />
</div>
