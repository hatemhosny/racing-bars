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
If set to `false`, make sure you provide a way to run the chart using one of the methods described [here](../guides/chart-controls.md).

- Type: `boolean`
- Default: true

### caption

If provided, displays below the date counter on the right lower corner of the chart

- Type: `string | [data function](#data-function)`
- Default: ""
- Example: [view in gallery](../gallery/caption-string)

```js
const options = {
  caption: 'Source: World Bank',
};
```

The following example uses a [data function](#data-function) to display the sum of data values for the current date in the `caption`

[view in gallery](../gallery/caption-data-function)

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
The object does not have to include all bar names. The other bars will get the default colors.
Note that names are case-sensitive.

The colors specified in the array or object can be
color names (e.g 'red'), hex codes (e.g. '#FF0000') or RGB codes (e.g. 'rgb(255, 0, 0)').

- Type: `string[] | {[key: string]: string}`
- Default: ""
- Example:

This example uses an array as color palette.

[view in gallery](../gallery/color-palette)

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

[view in gallery](../gallery/color-map)

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

[view in gallery](../gallery/color-map-groups)

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
Notice that if groups are shown ([showGroups](#showgroups) is set to 'true', and the dataset has the field 'group'),
this setting affects 'group' colors, otherwise it affects 'name' colors, but not both.
:::

### colorSeed

A seed used to change bar colors. This causes shuffling the names/groups before being assigned to colors.
The same seed guarantees the assignment to same color.
This has no effect if the bar color is determined in the data (by the optional field `color`),
or by [`colorMap`](#colormap) object that maps the item name/group.

- Type: `number | string`
- Default: ""
- Example:

This example changes bar colors using `colorSeed`

[view in gallery](../gallery/color-seed)

```js
const options = {
  colorSeed: 42,
};
```

### controlButtons

Shows/hides buttons that control the chart (play/pause/skip-back/skip-forward).
The value "all" shows all buttons.
The value "play" shows one button (play or pause).
The value "none" hides all buttons.

- Type: `string`
- Valid values: ["all", "play", "none"]
- Default: "none"
- Example:

This example shows all control buttons

[view in gallery](../gallery/control-buttons)

```js
const options = {
  controlButtons: 'all',
};
```

See the guide on [`chart controls`](../guides/chart-controls.md) for other alternatives of controlling charts.

### dataShape

Instruction whether the data shape is <a href="https://en.wikipedia.org/wiki/Wide_and_narrow_data" target="_blank">"long" or "wide"</a>.
See ["Data" section](./data.md) for more details and examples.

- Type: `string`
- Valid values: ["long", "wide"]
- Default: "long"
- Example:

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

- Type: `function `(data: Data[] | any) => Data[] | WideData[]` | null`
- Default: null
- Example:

This example transforms the data array. Each data item has the following fields: "date", "name", "code", "group", "value".
The function adds a new field "icon", based on the "code" field.
The "icon" field is used to [show icons](../guides/icons.md) on the bars.

[view in gallery](../gallery/data-transform)

```js {9}
const transformFn = (data) =>
  data.map((d) => ({
    ...d,
    icon: `https://flagsapi.com/${d.code}/flat/64.png`,
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
    icon: `https://flagsapi.com/${d.code}/flat/64.png`,
  }));

  racingBars.race(dataWithIcons, options);
});
```

But the `dataTransform` option was added to facilitate the use in the provided [React](../packages/react.md), [Vue](../packages/vue.md) and [Python](../packages/python.md) implementations where the component may load the data from url.
So it would be more convenient to be able to also pass a transformation function that would run before creating the chart.

### dataType

When a URL to a file containing the data is supplied as the first argument to the [`race`](./api.md#race) function,
the type of that file can be specified using the `dataType` option.

- Type: `string`
- Valid values: ["json" | "csv" | "tsv" | "xml"]
- Default: "json"
- Example:

This example uses "csv" data type

```js
race('/data.csv', '#race', { dataType: 'csv' });
```

### dateCounter

Displays the date counter on the right lower corner of the chart.
If a string is used, the following will be replaced:

"MMM": month name, "DDD": day name, "YYYY": year, "MM": month, "DD": day

- Type: `string | [data function](#data-function)`
- Default: "MM/YYYY"
- Example:

This example displays formatted date

[view in gallery](../gallery/date-counter-format)

```js
const options = {
  dateCounter: 'MMM DD, YYYY 🌍',
};
```

This example uses [data function](#data-function) to display the `dateCounter` as '[count] of [total]' instead of date

[view in gallery](../gallery/date-counter)

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

- Type: `string`
- Default: ""
- Example: [view in gallery](../gallery/start-end-dates)

```js
const options = {
  endDate: '1999-12-31',
};
```

### fillDateGapsInterval

:::info

This option is still experimental.

:::

By default, the chart displays only the dates present in the dataset.
Missing dates (date gaps) are skipped.

Setting `fillDateGapsInterval` fills the date gaps between [`startDate`](#startdate) and [`endDate`](#enddate).
The interval at which the date gaps are filled is determined by the value of this option.

For example, setting it to "year" ensures that every year between `startDate` and `endDate` is represented.
The values computed for the data items in the missing dates are determined by [`fillDateGapsValue`](#filldategapsvalue).

- Type: `string | null`
- Valid values: ["year", "month", "day"]
- Default: null
- Example: [view in gallery](../gallery/fill-date-gaps)

```js
const options = {
  fillDateGapsInterval: 'year',
};
```

:::caution

Using this feature in large datasets, having to fill large number of missing dates can significantly affect performance.  
i.e. using the value "day" over a wide range of dates will be significantly slower than "year".

Use with caution!

:::

See the guide on [`Filling Date Gaps`](../guides/fill-date-gaps.md) for details.

### fillDateGapsValue

:::info

This option is still experimental.

:::

Determines the values computed for the data items in the missing dates on filling date gaps.  
If set to "interpolate", the value of data items in the missing date will be the average between 2 present dates.  
If set to "last", the value of data items in the missing date will be equal to the values of the last present date.

This is only effective if [`fillDateGapsInterval`](#filldategapsinterval) is set.

- Type: `string`
- Valid values: ["interpolate", "last"]
- Default: "interpolate"
- Example: [view in gallery](../gallery/fill-date-gaps)

```js
const options = {
  fillDateGapsInterval: 'year',
  fillDateGapsValue: 'interpolate',
};
```

See the guide on [`Filling Date Gaps`](../guides/fill-date-gaps.md) for details.

### fixedOrder

This accepts an array of strings.
If provided, the chart will only show the names specified in this array and in the same order.
The values will no longer affect the order.

Note that if `fixedOrder` is specified, [`topN`](#topn) will be ignored.
Also note that with this setting it is more likely that the date counter will overlap the lower bars.

- Type: `string[]`
- Default: []
- Example: [view in gallery](../gallery/fixed-order)

```js
const options = {
  fixedOrder: ['Algeria', 'Italy', 'Canada', 'France', 'Panama'],
};
```

### fixedScale

If `true`, the scale of the chart will be fixed all through the whole date range.
The maximum value for the chart scale will not be changed between dates.

Note that if initial values are much smaller that later values,
bar labels may not initially be visible ([view in gallery](../gallery/fixed-scale)).
You may then want to set [`labelsPosition`](#labelsposition) to `"outside"`
([view in gallery](../gallery/fixed-scale-labels)).

- Type: `boolean`
- Default: false
- Example: [view in gallery](../gallery/fixed-scale2)

```js
const options = {
  fixedScale: true,
};
```

### height

Specifies the height of the chart.
If left `undefined`, the chart uses the height of the selected DOM element (specified by [`selector`](#selector)),
what can be set by css for example.
The height can be set to a number (in pixels), or can be set to ratio of window `innerHeight`. The string value "window\*0.8" sets the height to 0.8 of the window `innerHeight`.

Note that the minimum allowed height of the chart is 300px.

If `height` is undefined or specified as ratio to window `innerHeight`, the chart is responsive (will resize on window resize).

- Type: `number | "window\*`number`" | undefined`
- Default: undefined
- Example:

This sets the height to 600px:

```js
const options = {
  height: 600,
};
```

This sets the height to 0.5 of window `innerHeight`:

```js
const options = {
  height: 'window*0.5',
};
```

see the guide on [`chart size`](../guides/chart-size.md).

### highlightBars

If `true`, the racing bars are highlighted on mouseover.
This is implemented by adding the class `highlight` to the html element on mouseover and removing it on mouseout.
The color of the highlight is determined by the [theme](../guides/themes-styles.md).

- Type: `boolean`
- Default: `false`
- Example:

This example enables highlighting bars on mouseover

```js
const options = {
  highlightBars: true,
};
```

To change the color of the bar highlight use a modification of this css:

```css
.highlight {
  fill: #ff2727 !important;
}
```

### injectStyles

The CSS required by the charts are injected into the top of the head element of the HTML document.
This allows usage with a single script tag.
The injected CSS is scoped to the element specified in the [`selector`](#selector) option.
You may wish to disable this behaviour and have control on CSS.
To do this set the option `injectStyles` to `false`, and no CSS will be injected

- Type: `boolean`
- Default: true
- Example:

```js
const options = {
  injectStyles: false,
};
```

You may want to refer to the <a href="https://github.com/hatemhosny/racing-bars/tree/master/src/lib/css" className="external" target="_blank">CSS used by the library</a> if you wish to use it as a starting point.

See the guide on [`themes and styles`](../guides/themes-styles.md) for more details.

### keyboardControls

This allows controlling the chart by the keyboard.
If `true`, the key <kbd>A</kbd> triggers skip-back, the key <kbd>S</kbd> and <kbd>spacebar</kbd> toggle play/pause and the key <kbd>D</kbd> triggers skip-forward.

If the currently active element is an `input` or a `textarea` (i.e. the user is typing), the keyboard events are ignored.

Note that if there are multiple charts in the page, all the charts with the option `keyboardControls` enabled, will be affected.

- Type: `boolean`
- Default: false
- Example: [view in gallery](../gallery/keyboard-controls)

```js
const options = {
  keyboardControls: true,
};
```

See the guide on [`chart controls`](../guides/chart-controls.md) for other alternatives of controlling charts.

### labelsPosition

Sets the position of bar labels. If set to `"inside"`, the labels are positioned inside the bars.
Otherwise, the labels are positioned on the left side of the bars.

Note that if this is set to `"inside"` (default),
bars with small width (low values) may have their labels partially invisible ([demo](../gallery/fixed-scale)).

- Type: `string`
- Valid values: ["inside", "outside"]
- Default: "inside"
- Example: [view in gallery](../gallery/labels-position.md)

```js
const options = {
  labelsPosition: 'outside',
};
```

### labelsWidth

The width (in pixels) of the area for bar labels on the left side of the chart.
It is ignored if `labelsPosition` is set to "inside" (default).

- Type: `number`
- Default: 150
- Example:

```js
const options = {
  labelsPosition: 'outside',
  labelsWidth: 200,
};
```

### loop

If `true`, the race restarts after reaching the last date.

- Type: `boolean`
- Default: false
- Example: [view in gallery](../gallery/loop)

```js
const options = {
  loop: true,
};
```

### makeCumulative

If `true`, the values are converted to [cumulative sums](./data.md#cumulativesum) (running totals).

- Type: `boolean`
- Default: false
- Example: [view in gallery](../gallery/cum-sum)

```js
const options = {
  makeCumulative: true,
};
```

### marginBottom

The bottom margin of the chart in pixels (still inside the SVG element).

- Type: `number`
- Default: 5
- Example:

```js
const options = {
  marginBottom: 10,
};
```

### marginLeft

The left margin of the chart in pixels (still inside the SVG element).

- Type: `number`
- Default: 0
- Example:

```js
const options = {
  marginLeft: 10,
};
```

### marginRight

The right margin of the chart in pixels (still inside the SVG element).

- Type: `number`
- Default: 20
- Example:

```js
const options = {
  marginRight: 10,
};
```

### marginTop

The top margin of the chart in pixels (still inside the SVG element).

- Type: `number`
- Default: 0
- Example:

```js
const options = {
  marginTop: 10,
};
```

### mouseControls

This allows controlling the chart by mouse clicks.
If `true`, single-click on the chart toggles play/pause, double-click triggers skip-forward and triple-click triggers skip-back.

- Type: `boolean`
- Default: false
- Example:

```js
const options = {
  mouseControls: true,
};
```

See the guide on [`chart controls`](../guides/chart-controls.md) for other alternatives of controlling charts.

### overlays

Shows/hides semi-transparent overlays that cover the chart and show buttons that control it.
There are 2 overlays: play (at the beginning) and repeat (at the end).

The value "all" shows both overlays.
The value "play" shows an overlay at the beginning of the race with a play button.
The value "repeat" shows an overlay at the end of the race with a repeat button.
The value "none" hides both overlays.

- Type: `string`
- Valid values: ["all", "play", "repeat", "none"]
- Default: "none"
- Example:

This example shows both overlays

[view in gallery](../gallery/overlays)

```js
const options = {
  overlays: 'all',
};
```

Please note that setting [`autorun`](#autorun) to `true` (default) will skip the play overlay,
while setting [`loop`](#loop) to `true` will skip the repeat overlay.

See the guide on [`chart controls`](../guides/chart-controls.md) for other alternatives of controlling charts.

### selectBars

If `true`, mouse clicks toggle bar select/unselect.
This is implemented by toggle of the class `selected` on the html element on click.
The color of the selected bars is determined by the [`theme`](../guides/themes-styles.md).

- Type: `boolean`
- Default: false
- Example:

This example enables selecting bars on click:

```js
const options = {
  selectBars: true,
};
```

To change the color of the selected bar use a modification of this css:

```css
.selected {
  fill: #d12020 !important;
  stroke: #777777 !important;
  stroke-width: 1 !important;
}
```

### showGroups

If `true` and if the dataset has the optional field `group`, bars of items in the same group will have same color.
A legend is placed above the chart listing the groups and their colors.
A click on the group legend toggles showing/hiding this group.
Double click on the legend shows this group only.
Triple click on any legend will reset the group filter (show all groups).

- Type: `boolean`
- Default: `false`
- Example: [view in gallery](../gallery/show-groups)

```js
const options = {
  showGroups: true,
};
```

### showIcons

If `true` and if the dataset has the optional field `icon`, an icon will be shown on bars.
The `icon` field will be used as the url for the image used.

This will take some space from the bar, so some labels may not be visible. If so, consider setting the option [`labelsPosition`](#labelsposition) to `'outside'`.

- Type: `boolean`
- Default: `false`
- Example: [view in gallery](../gallery/icons)

```js {2,8}
const options = {
  showIcons: true,
};

racingBars.loadData('/data/population.csv', 'csv').then((data) => {
  const dataWithIcons = data.map((d) => ({
    ...d,
    icon: `https://flagsapi.com/${d.code}/flat/64.png`,
  }));

  racingBars.race(dataWithIcons, options);
});
```

### startDate

If provided, the data is filtered so that the `date` field of the data item is more than or equal to the given date.
It should be a string that can be parsed as date by `new Date()`, preferably formatted as 'YYYY-MM-DD'.
If it cannot be parsed as date, an error will be thrown.

- Type: `string`
- Default: ""
- Example: [view in gallery](../gallery/start-end-dates)

```js
const options = {
  startDate: '1970-01-01',
};
```

### subTitle

If provided, displays chart sub-title

- Type: `string | [data function](#data-function)`
- Default: ""
- Example: [view in gallery](../gallery/title-string)

```js
const options = {
  subTitle: 'in millions',
};
```

### theme

Selects the theme to use. See the guide on [`themes and styles`](../guides/themes-styles.md) for details.

- Type: `string`
- Valid values: ["light", "dark"]
- Default: "light"
- Example: [view in gallery](../gallery/theme-dark)

```js
const options = {
  theme: 'dark',
};
```

### tickDuration

The duration (in milliseconds) during which each date is displayed.
Decreasing the value increases the "speed" at which the chart runs.

- Type: `number`
- Default: 500
- Example:

This chart runs fast!

[view in gallery](../gallery/tick-duration)

```js
const options = {
  tickDuration: 200,
};
```

### title

If provided, displays chart title

- Type: `string | [data function](#data-function)`
- Default: ""
- Example: [view in gallery](../gallery/title-string)

```js
const options = {
  title: 'World Population',
};
```

### topN

Number of bars to show. This represents the number of data items with highest values in each date.

- Type: `number`
- Default: 10
- Example: [view in gallery](../gallery/top-n)

```js
const options = {
  topN: 5,
};
```

### width

Specifies the width of the chart.
If left `undefined`, the chart uses the width of the selected DOM element (specified by [`selector`](#selector)),
what can be set by css for example.
The width can be set to a number (in pixels), or can be set to ratio of window `innerWidth`. The string value "window\*0.8" sets the width to 0.8 of the window `innerWidth`.

Note that the minimum allowed width of the chart is 500px.

If `width` is undefined or specified as ratio to window `innerWidth`, the chart is responsive (will resize on window resize).

- Type: `number | "window\*`number`" | undefined`
- Default: undefined
- Example:

This sets the width to 900px:

```js
const options = {
  width: 900,
};
```

This sets the width to 0.5 of window `innerWidth`:

```js
const options = {
  width: 'window*0.5',
};
```

see the guide on [`chart size`](../guides/chart-size.md).

## Data Function

Each of the options [`title`](#title), [`subTitle`](#subtitle), [`DateCounter`](#datecounter) and [`caption`](#caption) can accept a function that takes arguments calculated from provided data and returns a string.
The function will be evaluated in every date and the returned string will be displayed.

### Arguments

- `currentDate`: `string`. A string representing the current date formatted as 'YYYY-MM-DD'.
- `dateSlice`: `Data[]`. An array of data items filtered by the current date. This includes all data items not just those shown in the chart as stated by `topN`.
- `allDates`: `string[]`. An array of strings representing all dates in the dataset formatted as 'YYYY-MM-DD'.

### Return

The function should return a string. This string will be displayed for the used option.

### Examples

- This example displays the `dateCounter` as '[count] of [total]' instead of date

[view in gallery](../gallery/date-counter)

```js
const options = {
  dateCounter: (currentDate, dateSlice, allDates) =>
    `${dates.indexOf(currentDate) + 1} of ${dates.length}`,
};
```

- This example displays the total of data values for the current date in the `caption`

[view in gallery](../gallery/caption-data-function)

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

[view in gallery](../gallery/data-gh-push)

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
