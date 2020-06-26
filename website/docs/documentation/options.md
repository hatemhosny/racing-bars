---
title: Options
---

## Usage

An optional configuration object can be passed to the [`race`](../documentation/api.md#racedata-options) method.

```js
const options = {};
racingBars.race(data, options);
```

## Options

The configuration object may contain any of the following fields:

### autorun

If `true`, the bar chart race runs automatically on load.
If set to `false`, make sure you provide a way to run the chart using one of the methods described [here](../guides/chart-control).

- Type: boolean
- Default: true

### caption

If provided, displays below the date counter on the right lower corner of the chart

- Type: string | [data function](#data-function)
- Default: ""
- Examples:

[view in gallery](/gallery/caption-string)

```js
const options = {
  caption: 'Source: World Bank',
};
```

This uses a [data function](#data-function) to display the total of data values for the current date in the `caption`

[view in gallery](/gallery/caption-data-function)

```js
const options = {
  caption: (currentDate, dateSlice, allDates) =>
    `Total: ${Math.round(dateSlice.reduce((acc, curr) => acc + curr.value, 0))}`,
};
```

### colorMap

This controls the colors of the bars. It accepts either an array of strings or an object.

If an array is supplied, it will be used as a color palette.
Only the colors in the array will be used.
If the number of data item names/groups are larger than the array length, the colors will be repeated.

On the other hand, an object can be supplied to map specific item names/groups to colors.
The objects does not have to include all names.
Note that names are case-sensitive.

The colors specified in the array or object can be
color names (e.g 'red'), hex codes (e.g. '#FF0000') or RGB codes (e.g. 'rgb(255, 0, 0)').

- Type: string[] | {[key: string]: string}
- Default: ""
- Examples:

This example uses an array as color palette.

[view in gallery](/gallery/color-palette)

```js
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
  colorMap: palette,
};
```

This example uses an object to map specific items to colors.

[view in gallery](/gallery/color-map)

```js
const countryColors = {
  India: 'orange',
  'United States': 'blue',
};

const options = {
  colorMap: countryColors,
  showGroups: false,
};
```

This example uses an object to map groups to colors.

[view in gallery](/gallery/color-map-groups)

```js
const continentColors = {
  Asia: 'yellow',
  Europe: 'green',
};

const options = {
  colorMap: continentColors,
  showGroups: true,
};
```

:::info
Notice that if groups are shown ([showGroups](#showgroups) is set to 'true' [default], and the dataset has the field 'group'),
this setting affects 'group' colors, otherwise it affects 'name' colors, but not both.
:::

### colorSeed

A seed used to change bar colors. This causes shuffling the names/groups before being assigned to colors.
The same seed guarantees the assignment to same color.
This has no effect if the bar color is determined in the data (by the optional field `color`),
or by [`colorMap`](#colormap) object that maps the item name/group.

- Type: number | string
- Default: ""
- Examples:

This example changes bar colors using `colorSeed`

[view in gallery](/gallery/color-seed)

```js
const options = {
  colorSeed: 42,
};
```

### dataShape

Instruction whether the data shape is <a href="https://en.wikipedia.org/wiki/Wide_and_narrow_data" target="_blank">"long" or "wide"</a>.
See ["Data" section](./data.md) for more details and examples.

- Type: string
- Valid values: ["long", "wide"]
- Default: "long"
- Examples:

This example uses "wide" data shape

```js
const options = {
  dataShape: 'wide',
};
```

### dataTransform

A function can be passed to transform data before being used.
This function accepts the loaded data (typically an array of data items).
It may perform various data transformation operations (e.g map, filter, reshape, ..etc).
It then returns an array of data items that will be used by the [`race`](../documentation/api.md#racedata-options) method.

- Type: function `(data: Data[] | any) => Data[] | WideData[]`
- Default: null
- Examples:

This example transforms the data array. Each data item has the following fields: "date", "name", "code", "group", "value".
The function adds a new field "icon", based on the "code" field.
The "icon" field is used to [show icons](../guides/icons.md) on the bars.

[view in gallery](/gallery/data-transform)

```js {9}
const transformFn = (data) =>
  data.map((d) => ({
    ...d,
    icon: `https://www.countryflags.io/${d.code.toLowerCase()}/flat/64.png`,
  }));

const options = {
  selector: '#race',
  dataTransform: transformFn,
};

racingBars.loadData('/data/population.json').then((data) => {
  racingBars.race(data, options);
});
```

Note that the transformation could have been done after loading the data with [`loadData`](../documentation/api.md#loaddataurl-type) method and before calling the [`race`](../documentation/api.md#racedata-options) method, as follows:

```js
racingBars.loadData('/data/population.json').then((data) => {
  const dataWithIcons = data.map((d) => ({
    ...d,
    icon: `https://www.countryflags.io/${d.code.toLowerCase()}/flat/64.png`,
  }));

  racingBars.race(dataWithIcons, options);
});
```

But the `dataTransform` option was added to facilitate the use in the provided [React](../packages/react.md), [Vue](../packages/vue.md) and [Python](../packages/python.md) packages where the component may load the data from url.
So it would be more convenient to be able to also pass a transformation function that would run before creating the chart.

### dateCounter

Displays the date counter on the right lower corner of the chart.
If a string is used, the following will be replaced:

"MMM": month name, "DDD": day name, "YYYY": year, "MM": month, "DD": day

- Type: string | [data function](#data-function)
- Default: "MM/YYYY"
- Examples:

This displays formatted date

[view in gallery](/gallery/date-counter-format)

```js
const options = {
  dateCounter: 'MMM DD, YYYY 🌍',
};
```

This uses [data function](#data-function) to display the `dateCounter` as '[count] of [total]' instead of date

[view in gallery](/gallery/date-counter)

```js
const options = {
  dateCounter: (currentDate, dateSlice, allDates) =>
    `${dates.indexOf(currentDate) + 1} of ${dates.length}`,
};
```

### endDate

If provided, the data is filtered so that the `date` field of the data item is less than or equal to the given date.
It should be a string that can be parsed as date by `new Date()`, preferably formatted as 'YYYY-MM-DD'.
If it cannot be parsed as date, an error will be thrown.

- Type: string
- Default: ""
- Examples:

[view in gallery](/gallery/start-end-dates)

```js
const options = {
  endDate: '1999-12-31',
};
```

### fixedOrder

This accepts an array of strings.
If provided, the chart will only show the names specified in this array and in the same order.
The values will no longer affect the order.

Note that if `fixedOrder` is specified, [`topN`](#topn) will be ignored.
Also note that with this setting it is more likely that the date counter will overlap the lower bars.

- Type: string[]
- Default: []
- Examples:

[view in gallery](/gallery/fixed-order)

```js
const options = {
  fixedOrder: ['Algeria', 'Italy', 'Canada', 'France', 'Panama'],
};
```

### fixedScale

If `true`, the scale of the chart will be fixed all through the whole date range.
The maximum value for the chart scale will not be changed between dates.

Note that if initial values are much smaller that later values,
bar labels may not initially be visible ([view in gallery](/gallery/fixed-scale)).
You may then want to set [`labelsOnBars`](#labelsonbars) to `false`
([view in gallery](/gallery/fixed-scale-labels)).

- Type: boolean
- Default: false
- Examples:

[view in gallery](/gallery/fixed-scale2)

```js
const options = {
  fixedScale: true,
};
```

### highlightBars

If `true`, the racing bars are highlighted on mouseover.
This is implemented by adding the class `highlight` to the html element on mouseover and removing it on mouseout.
The color of the highlight is determined by the [theme](../guides/styles-themes.md).

- Type: boolean
- Default: true
- Examples:

To change the color of the bar highlight use a modification of this css:

```css
.highlight {
  fill: #ff2727 !important;
}
```

This example disables highlighting bars on mouseover

```js
const options = {
  highlightBars: false,
};
```

### loop

If `true`, the race restarts after reaching the last date.

- Type: boolean
- Default: false
- Examples:

[view in gallery](/gallery/loop)

```js
const options = {
  loop: true,
};
```

### selectBars

If `true`, mouse clicks toggle bar select/unselect.
This is implemented by toggle of the class `selected` on the html element on click.
The color of the selected bars is determined by the [theme](../guides/styles-themes.md).

- Type: boolean
- Default: true
- Examples:

To change the color of the selected bar use a modification of this css:

```css
.selected {
  fill: #d12020 !important;
  stroke: #777777 !important;
  stroke-width: 1 !important;
}
```

This example disables selecting bars on click:

```js
const options = {
  selectBars: false,
};
```

### selector

A CSS selector for the element to use as a container for the chart.
Note that any HTML inside that element will be deleted before embedding the chart.
If the selector evaluates to multiple elements, the first one will be used.
If no elements were found with the current selector, an error will be thrown.

- Type: string
- Default: '#race'
- Examples:

```js
const options = {
  selector: '#race',
};
```

```js
const options = {
  selector: '.mydiv',
};
```

### showGroups

If `true` (default) and if the dataset has the optional field `group`, bars of items in the same group will have same color.
A legend is placed above the chart listing the groups and their colors.
A click on the group legend toggles showing/hiding this group. Double click on the legend leads to only showing this group.
Triple click on any legend will reset the group filter (show all groups).

- Type: boolean
- Default: `true`
- Examples:

[view in gallery](/gallery/show-groups)

```js
const options = {
  showGroups: false,
};
```

### showIcons

If `true` (default) and if the dataset has the optional field `icon`, an icon will be shown on bars.
The `icon` field will be used as the url for the image used.

This will take some space from the bar, so some labels may not be visible. If so, consider setting the option [`labelsOnBars`](#labelsonbars) to `false`.

- Type: boolean
- Default: `true`
- Examples:

[view in gallery](/gallery/data-transform)

```js
const options = {
  showIcons: true,
};

racingBars.loadData('/data/population.csv', 'csv').then((data) => {
  const dataWithIcons = data.map((d) => ({
    ...d,
    icon: `https://www.countryflags.io/${d.code.toLowerCase()}/flat/64.png`,
  }));

  racingBars.race(dataWithIcons, options);
});
```

### startDate

If provided, the data is filtered so that the `date` field of the data item is more than or equal to the given date.
It should be a string that can be parsed as date by `new Date()`, preferably formatted as 'YYYY-MM-DD'.
If it cannot be parsed as date, an error will be thrown.

- Type: string
- Default: ""
- Examples:

[view in gallery](/gallery/start-end-dates)

```js
const options = {
  startDate: '1970-01-01',
};
```

### subTitle

If provided, displays chart sub-title

- Type: string | [data function](#data-function)
- Default: ""
- Examples:

[view in gallery](/gallery/title-string)

```js
const options = {
  subTitle: 'in millions',
};
```

### theme

Selects the theme to use. See [styles and themes](../guides/styles-themes.md) for details.

- Type: string
- Valid values: ["light", "dark"]
- Default: "light"
- Examples:

[view in gallery](/gallery/theme-dark)

```js
const options = {
  theme: 'dark',
};
```

### tickDuration

The duration (in milliseconds) during which each date is displayed.
Decreasing the value increases the "speed" at which the chart runs.

- Type: number
- Default: 500
- Examples:

This chart runs fast!

[view in gallery](/gallery/tick-duration)

```js
const options = {
  tickDuration: 200,
};
```

### title

If provided, displays chart title

- Type: string | [data function](#data-function)
- Default: ""
- Examples:

[view in gallery](/gallery/title-string)

```js
const options = {
  title: 'World Population',
};
```

### topN

Number of bars to show. This represents the number of data items with highest values in each date.

- Type: number
- Default: 10
- Examples:

[view in gallery](/gallery/top-n)

```js
const options = {
  topN: 5,
};
```

## Data Function

Each of the options `title`, `subTitle`, `DateCounter` and `caption` can accept a function that takes arguments calculated from provided data and returns a string.
The function will be evaluated in every date and the returned string will be displayed.

### Arguments

- `currentDate`: `string`. A string representing the current date formatted as 'YYYY-MM-DD'.
- `dateSlice`: `Data[]`. An array of data items filtered by the current date. This includes all data items not just those shown in the chart as stated by `topN`.
- `allDates`: `string[]`. An array of strings representing all dates in the dataset formatted as 'YYYY-MM-DD'.

### Return

The function should return a string. This string will be displayed for the used option.

### Examples

- This example displays the `dateCounter` as '[count] of [total]' instead of date

[view in gallery](/gallery/date-counter)

```js
const options = {
  dateCounter: (currentDate, dateSlice, allDates) =>
    `${dates.indexOf(currentDate) + 1} of ${dates.length}`,
};
```

- This example displays the total of data values for the current date in the `caption`

[view in gallery](/gallery/caption-data-function)

```js
const options = {
  caption: (currentDate, dateSlice, allDates) =>
    `Total: ${Math.round(dateSlice.reduce((acc, curr) => acc + curr.value, 0))}`,
};
```

- This example displays the mean of the displayed data values in the `caption`

```js
const barsToShow = 5;
function calculateMean(currentDate, dateSlice, allDates) => {
  const values = dateSlice
    .map((d) => d.value)
    .sort((a, b) => b > a)
    .slice(0, barsToShow);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  return `Mean of top ${barsToShow}: ${Math.round(mean)}`;
}

const options = {
  topN: barsToShow,
  caption: calculateMean,
};
```

- This example displays the `dateCounter` as quarter of year

[view in gallery](/gallery/data-gh-push)

```js
const getYearQuarter = (currentDate, dateSlice, allDates) => {
  const month = Number(currentDate.slice(5, 7));
  const year = Number(currentDate.slice(0, 4));
  const q = Math.floor(month / 3) + 1;
  const quarter = q > 4 ? q - 4 : q;
  return `Q${quarter} ${year}`;
};

const options = {
  dateCounter: getYearQuarter,
};
```

<!--
✔ autorun: true
✔ caption: ""
✔ colorMap: {}
✔ colorSeed: ""
✔ dataShape: "long"
✔ dataTransform: null,
✔ dateCounter: "MM/YYYY"
  disableClickEvents: true
  disableKeyboardEvents: true
✔ endDate: ""
  fillDateGaps: false
  fillDateGapsValue: "interpolate"
  fixedScale: false
✔ fixedOrder: []
  height: ""
✔ highlightBars: true
  injectStyles: true
  labelsOnBars: true
  labelsWidth: 150
✔ loop: false
✔ selectBars: true
✔ selector: "#race"
  showControls: "all"
✔ showGroups: true
✔ showIcons: false
  showOverlays: "none"
✔ startDate: ""
✔ subTitle: ""
✔ theme: "light"
✔ tickDuration: 500
✔ title: ""
✔ topN: 10
  width: ""
 -->
