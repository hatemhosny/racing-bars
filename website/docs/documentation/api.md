---
title: API
---

This page is an overview and a guide for usage.

The API TypeScript definitions are documented [here](../api/globals.md).

## Functions:

### [loadData](../api/functions/loadData.md)

This function loads data from url.

#### Parameters

- URL: `string`

  The URL of data to load.

- type: `"json" | "csv" | "tsv" | "xml"`

  The type of the loaded data. The default is "json"

#### Return

It returns a promise that resolves to the loaded data.

#### Example

```js
racingBars.loadData('/data/population.csv', 'csv').then((data) => {
  // use `data`
});
```

### [race](../api/functions/race.md)

This is the main function that generates the racing bar chart.

#### Parameters

- data: `Data[] | WideData[] | Promise<Data[]> | Promise<WideData[]> | string`

  This represents the data for the chart. This can be an array of data item objects or a promise that resolves to it.
  The shape of data item objects is described in the ["Data" section](./data.md).

  A URL to a file containing the data can also be used. This file can be JSON, CSV, TSV or XML (see the option [`dataType`](./options.md#datatype))

- container: `HTMLElement | string`

  The chart container HTML element or a string representing a CSS selector for it. If not provided, a new `<div>` element is created, added to the document `<body>` and used.
  Note that any content inside that element will be deleted before embedding the chart.

- options: [`Options`](../api/internal/interfaces/Options.md)

  An optional configuration object for chart options. The options are documented in the ["Options" section](./options.md)

#### Return

The function returns a promise that resolves to an object that allows interaction with the chart, with the following methods:

##### play `() => void`

Starts running the chart.

##### pause `() => void`

Pauses the chart at the current date.

##### toggle `() => void`

toggles play/pause.

##### skipBack `() => void`

Stops the chart and sets the date to the first date.

##### skipForward `() => void`

Stops the chart and sets the date to the last date.

##### inc `(value = 1) => void`

Goes forwards by the specified number of dates.

##### dec `(value = 1) => void`

Goes backwards by the specified number of dates.

##### getDate `() => string`

Returns a string representation of the current date in the format 'YYYY-MM-DD'.

##### setDate `(date: string | Date) => void`

Accepts a date as a string (e.g. 'YYYY-MM-DD') or a JavaScript date object, and sets the current date.

##### getAllDates `() => string[]`

Returns as array of strings, containing all unique dates in the dataset sorted in ascending order (formatted as 'YYYY-MM-DD').

##### isRunning `() => boolean`

Returns `true` if the chart is running, otherwise returns `false`.

#### select `(name: string) => void`

Selects the bar with the supplied name. This occurs by adding the CSS class `"selected"`.
See the option [`selectBars`](./options.md#selectbars)

#### unselect `(name: string) => void`

Unselects the bar with the supplied name. This occurs by removing the CSS class `"selected"`.
See the option [`selectBars`](./options.md#selectbars)

#### unselectAll `() => void`

Unselects all bars. Removes the CSS class `"selected"` from all bars.
See the option [`selectBars`](./options.md#selectbars)

#### hideGroup `(group: string) => void`

Hides the group with the supplied name.
See the option [`showGroups`](./options.md#showgroups)

#### showGroup `(group: string) => void`

Shows the group with the supplied name if it was hidden.
See the option [`showGroups`](./options.md#showgroups)

#### showOnlyGroup `(group: string) => void`

Hides all groups except the one with the supplied name.
See the option [`showGroups`](./options.md#showgroups)

#### showAllGroups `() => void`

Shows all groups.
See the option [`showGroups`](./options.md#showgroups)

##### changeOptions `(options: Options) => Promise<void>`

Changes [chart options](./options.md) during runtime.
The method accepts a configuration object for chart options with the same properties as the original [options object](./options.md).
Properties in the new options object will override the current options.

The options [`dataShape`](./options.md#datashape) and [`dataType`](./options.md#datatype) cannot be changed.
Trying to change these will result in throwing an error.

#### on

`(event: EventType, fn: (tickDetails: TickDetails) => void) => { remove: () => void }`

Registers a callback function to be called when an event occurs.

The event type can be one of the following:

- `"dateChange"`: fires when the date changes.
- `"firstDate"`: fires when the current date is the first date in the dataset.
- `"lastDate"`: fires when the current date is the last date in the dataset.
- `"play"`: fires when the chart starts running.
- `"pause"`: fires when the chart is paused.

The callback function receives an object with the following properties:

- `date`: `string`. A string representation of the current date in the format 'YYYY-MM-DD'.
- `isFirstDate`: `boolean`. The value is `true` if the current date is the first date in the dataset, else `false`.
- `isLastDate`: `boolean`. The value is `true` if the current date is the last date in the dataset, else `false`.
- `isRunning`: `boolean`. The value is `true` if the chart is running, else `false`.
- `allDates`: `string[]`. An array of strings, containing all unique dates in the dataset sorted in ascending order (formatted as 'YYYY-MM-DD').

The `on` method returns an object with a single `remove` method that unregisters the callback function.

##### onDate

`(date: string | Date, fn: (tickDetails: TickDetails) => void) => { remove: () => void }`

Registers a callback function to be called when a specified date is the current date.
The callback function receives an object with the following properties:

`date`, `isFirstDate`, `isLastDate`, `isRunning`, `allDates` (see [`on`](#on) for details).

The `onDate` method returns an object with a single `remove` method that unregisters the callback function.

##### destroy `() => void`

This destroys the chart and cleans up associated event listeners.
After calling this method, any calls to the chart object methods throws an error.

#### Example

```js
import { race } from 'racing-bars';

const options = {
  dataType: 'csv',
  title: 'Chart title',
};

const racer = await race('/data/population.csv', '#race', options);

racer.pause();
console.log(racer.getDate()); // "1960-01-01"

racer.inc();
console.log(racer.getDate()); // "1961-01-01"

racer.inc(10);
console.log(racer.getDate()); // "1971-01-01"

racer.dec(5);
console.log(racer.getDate()); // "1966-01-01"

racer.skipForward();
console.log(racer.getDate()); // "2021-01-01"

racer.skipBack();
console.log(racer.getDate()); // "1960-01-01"

console.log(racer.getAllDates()); // ["1960-01-01", ..., "2021-01-01"]

racer.changeOptions({ title: 'Updated title!' });

setTimeout(() => {
  racer.destroy();
  racer.play(); // Error: Cannot perform this operation after calling destroy()
}, 5000);
```

See the guide on [Chart Controls](../guides/chart-controls.md) for other alternatives of controlling charts.
See the examples for [Slider](../gallery/slider.md) and [Scroller](../gallery/scroller.md) for usage examples.

## Interfaces

### [DOMCustomEvent](../api/interfaces/DOMCustomEvent.md)

### [Data](../api/interfaces/Data.md)

### [Options](../api/internal/interfaces/Options.md)

### [Race](../api/interfaces/Race.md)

### [WideData](../api/interfaces/WideData.md)
