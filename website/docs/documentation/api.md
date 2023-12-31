---
title: API
---

The detailed API is documented <a href="/docs/api/modules/" target="_blank" className="external">here</a>.

This page is an overview and a guide for usage.

## Methods:

### [loadData](/api/modules.md#loaddata)

This method loads data from url.

#### Parameters

- URL: string

  The URL of data to load.

- type: "json" | "csv" | "tsv" | "xml"

  The type of the loaded data. The default is "json"

#### Return

It returns a promise that resolves to the loaded data.

#### Example

```js
racingBars.loadData('/data/population.csv', 'csv').then((data) => {
  // use data
});
```

### [race](/api/modules.md#race)

This is the main method that generates the racing bar chart.

#### Parameters

- data: Data[]

  An array of data item objects. The shape of data item objects is described in the ["Data" section](./data.md#long-data).

- options: Options

  A configuration object for chart options. The options are documented in the ["Options" section](./options.md)

#### Return

It returns an object that allows you to interact with the chart, with the following methods:

##### play() : void

Starts running the chart.

##### pause() : void

Pauses the chart at the current date.

##### toggle() : void

toggles play/pause.

##### skipBack() : void

Stops the chart and sets the date to the first date.

##### skipForward() : void

Stops the chart and sets the date to the last date.

##### inc(value = 1) : void

Goes forwards by the specified number of dates.

##### dec(value = 1) : void

Goes backwards by the specified number of dates.

##### getDate() : string

Returns a string representation of the current date in the format 'YYYY-MM-DD'.

##### setDate(date: string | Date) : void

Accepts a date as a string (e.g. 'YYYY-MM-DD') or a javascript date object, and sets the current date.

##### getAllDates() : string[]

Returns as array of strings, containing all unique dates in the dataset sorted in ascending order (formatted as 'YYYY-MM-DD').

##### isRunning() : boolean

Returns `true` if the chart is running, otherwise returns `false`.

#### select(name: string) : void

Selects the bar with the supplied name. This occurs by adding the CSS class `selected`.
See the option [`selectBars`](./options.md#selectbars)

#### unselect(name: string) : void

Unselects the bar with the supplied name. This occurs by removing the CSS class `selected`.
See the option [`selectBars`](./options.md#selectbars)

#### unselectAll() : void

Unselects all bars. Removes the CSS class `selected` from all bars.
See the option [`selectBars`](./options.md#selectbars)

#### hideGroup(group: string) : void

Hides the group with the supplied name.
See the option [`showGroups`](./options.md#showgroups)

#### showGroup(group: string) : void

Shows the group with the supplied name if it was hidden.
See the option [`showGroups`](./options.md#showgroups)

#### showOnlyGroup(group: string) : void

Hides all groups except the one with the supplied name.
See the option [`showGroups`](./options.md#showgroups)

#### showAllGroups() : void

Shows all groups.
See the option [`showGroups`](./options.md#showgroups)

##### changeOptions(options: Options) : void

Changes [chart options](./options.md) during runtime.
The method accepts a configuration object for chart options with the same properties as the original [options object](./options.md).
Properties in the new options object will override the current options.

The options [`selector`](./options.md#selector) and [`dataShape`](./options.md#datashape) cannot be changed.
Trying to change these will result in throwing an error.

##### destroy() : void

This destroys the chart and cleans up associated event listeners.
After calling this method, any calls to the chart object methods are ignored.

#### Example

```js
const options = {
  selector: '#race',
  title: 'Chart title',
};
racingBars.loadData('/data/population.csv', 'csv').then((data) => {
  const racer = racingBars.race(data, options);

  racer.pause();
  console.log(racer.getDate()); // "1960-01-01"

  racer.inc();
  console.log(racer.getDate()); // "1961-01-01"

  racer.inc(10);
  console.log(racer.getDate()); // "1971-01-01"

  racer.dec(5);
  console.log(racer.getDate()); // "1966-01-01"

  racer.skipForward();
  console.log(racer.getDate()); // "2018-01-01"

  racer.skipBack();
  console.log(racer.getDate()); // "1960-01-01"

  console.log(racer.getAllDates()); // ["1960-01-01", ..., "2018-01-01"]

  racer.changeOptions({ title: 'Updated title!' });

  racer.destroy();
  racer.play(); // Error: Cannot perform this operation after calling destroy()
});
```

See the guide on [Chart Controls](../guides/chart-controls.md) for other alternatives of controlling charts.
See the guides on [Slider](../guides/slider.md) and [Scroller](../guides/scroller.md) for usage examples.

## Interfaces

### [DOMCustomEvent](/api/interfaces/DOMCustomEvent.md)

### [Data](/api/interfaces/Data.md)

### [Options](/api/interfaces/Options.md)

### [Race](/api/interfaces/Race.md)

### [WideData](/api/interfaces/WideData.md)
