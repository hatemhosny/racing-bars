---
title: Bar Colors
---

## Default Colors

By default, each bar is given a unique color.
If [groups are shown](../documentation/options.md#showgroups), bars in the same group will have the same color.

The color assignment is consistent (every time the chart loads, each bar name gets the same color).

If the dataset contains a lot of names (or groups), the bar colors may start becoming near each other.

This default behaviour can be changed in different ways.

## Change Default Colors

The [`colorSeed`](../documentation/options.md#colorseed) option can be used to change default colors.
This causes shuffling the names/groups before being assigned to colors.
The same seed guarantees the assignment to same color.

Example: [view in gallery](../gallery/color-seed)

```js {3}
const options = {
  selector: '#race',
  colorSeed: 42,
};

racingBars.loadData('/data/population.csv', 'csv').then((data) => {
  racingBars.race(data, options);
});
```

## Random Colors

To set bar colors randomly, assign [`colorSeed`](../documentation/options.md#colorseed) option to a random value (e.g. `Math.round(Math.random() * 100)`).

Example: [view in gallery](../gallery/color-seed-random)

```js {3}
const options = {
  selector: '#race',
  colorSeed: Math.round(Math.random() * 100), // random number between 0-100
};

racingBars.loadData('/data/population.csv', 'csv').then((data) => {
  racingBars.race(data, options);
});
```

## Custom Color Palettes

If an array is passed to the [`colorMap`](../documentation/options.md#colormap) option, it will be used as a color palette.
Note that if the number of data item names/groups are larger than the array length, the colors will be repeated.

The colors can be color names (e.g 'red'), hex codes (e.g. '#FF0000') or RGB codes (e.g. 'rgb(255, 0, 0)').

Example: [view in gallery](../gallery/color-palette)

```js {16}
const palette = [
  '#636EFA',
  '#EF553B',
  '#00CC96',
  '#AB63FA',
  '#FFA15A',
  '#19D3F3',
  '#FF6692',
  '#B6E880',
  '#FF97FF',
  '#FECB52',
];

const options = {
  selector: '#race',
  colorMap: palette,
};

racingBars.loadData('/data/population.csv', 'csv').then((data) => {
  racingBars.race(data, options);
});
```

## Set Colors of Specific Bars

If an object is passed to the [`colorMap`](../documentation/options.md#colormap) option, it will be used to map specific bar names/groups to colors.
The object does not have to include all names. The other bars will get the default colors.
Note that names are case-sensitive.

This example uses an object to map specific names to colors: [view in gallery](../gallery/color-map)

```js {7}
const countryColors = {
  India: 'orange',
  'United States': 'blue',
};

const options = {
  colorMap: countryColors,
};

racingBars.loadData('/data/population.csv', 'csv').then((data) => {
  racingBars.race(data, options);
});
```

This example uses an object to map group colors: [view in gallery](../gallery/color-map-groups)

```js {7}
const continentColors = {
  Asia: 'yellow',
  Europe: 'green',
};

const options = {
  colorMap: continentColors,
  showGroups: true,
};

racingBars.loadData('/data/population.csv', 'csv').then((data) => {
  racingBars.race(data, options);
});
```

:::info
Notice that if groups are shown ([showGroups](#showgroups) is set to 'true', and the dataset has the field 'group'),
[colorMap](../documentation/options.md#colormap) option affects 'group' colors, otherwise it affects 'name' colors, but not both.
:::

## Use Colors from Dataset

If [data item objects](..//documentation/data.md#long-data) in the dataset have the optional field `color`, this will be used by default.
