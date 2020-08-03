---
title: Icons
---

Bars can have icons, like in [this example](/gallery/icons).

To achieve this:

- set the [`showIcons`](../documentation/options.md#showicons) option to `true`.
- add the field `icon`, with icon URLs, to the [data items](../documentation/data.md#long-data).

Example:

This example uses the `code` field, in the [population dataset](../sample-datasets.md#population), to create a new `icon` field containing a valid URL.

[view in gallery](/gallery/icons)

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
