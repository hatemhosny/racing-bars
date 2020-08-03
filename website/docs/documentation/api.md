---
title: API
---

The detailed API is documented <a href="/api/modules/_index_.html" target="_blank" className="external">here</a>.

This page is an overview and a guide for usage.

## Methods:

### [loadData](/api/modules/_index_.html#loaddata)

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

### [race](/api/modules/_index_.html#race-1)

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

##### destroy() : void

This destroys the chart and cleans up associated event listeners.
After calling this method, any calls to the chart object methods are ignored.

#### Example

```js
const options = {
  selector: '#race',
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

  racer.destroy();
  console.log(racer.getDate()); // ""
  console.log(racer.getAllDates()); // []
  console.log(document.querySelector('#race').innerHTML); // ""
});
```

See the guide on [Chart Controls](../guides/chart-controls.md) for other alternatives of controlling charts.
See the guides on [Slider](../guides/slider.md) and [Scroller](../guides/scroller.md) for usage examples.

## Modules

### [d3](/api/modules/_index_._lib_d3_.html)

The methods used from <a href="https://d3js.org" target="_blank" className="external">d3 library</a> are re-exported under the property `d3`.
This is not the complete library. These are just the methods used internally by the library.
They are re-exported in case you want to use just this small subset, without having to use the full d3 library.

The re-exported methods are listed [here](/api/modules/_index_._lib_d3_.html).

## Interfaces

These are typescript interfaces.

### [DOMCustomEvent](/api/interfaces/_index_.domcustomevent.html)

### [Data](/api/interfaces/_index_.data.html)

### [Options](/api/interfaces/_index_.options.html)

### [Race](/api/interfaces/_index_.race.html)

### [WideData](/api/interfaces/_index_.widedata.html)
