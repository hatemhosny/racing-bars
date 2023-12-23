---
title: Icons
---

import RacingBars from '../../src/components/RacingBars.tsx';

Bars can have icons.

To achieve this:

- set the [`showIcons`](../documentation/options.md#showicons) option to `true`.
- add the field `icon`, with icon URLs, to the [data items](../documentation/data.md#long-data).

Example:

This example uses the `code` field, in the [population dataset](../sample-datasets.md#population), to create a new `icon` field containing a valid URL.

export const transformFn = (data) => data.map((d) => ({
...d,
icon: `https://www.countryflags.io/${d.code.toLowerCase()}/flat/64.png`,
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

```js {6,13}
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
    icon: `https://www.countryflags.io/${d.code.toLowerCase()}/flat/64.png`,
  }));
  racingBars.race(dataWithIcons, options);
});
```

You may also use the [`dataTransform`](../documentation/options.md#datatransform) option for data transformation,
like in [this example](/gallery/data-transform).
