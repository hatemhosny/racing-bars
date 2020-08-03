---
title: Bar Labels
---

import RacingBars from '../../racing-bars.js';

Bar labels are populated from the [data item](../documentation/data.md#long-data) `name` field.

## Position

By default, the bar labels are positioned on the bars.

Example:

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
    labelsPosition="inside"
  />
</div>

<br /><br />

In case some bar values are low (relative to others), or the label name are long, the labels may not be fully visible.
In this case you may wish to set the [`labelsPosition`](../documentation/options.md#labelsposition) option to `'outside'`.
This moves the label to the left side of the chart (outside the bars).

Example: `{labelsPosition: 'outside'}`

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
    labelsPosition="outside"
  />
</div>

<br /><br />

You may also adjust the width of the labels area using [`labelsWidth`](<(../documentation/options.md#labelswidth)>) option.
It sets the labels area width in pixels (default is 150).

Example: `{labelsPosition: 'outside', labelsWidth: 200}`

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
    labelsPosition="outside"
    labelsWidth={200}
  />
</div>

## Style

The style of the bar labels is set by CSS (see guide on [themes and styles](./themes-styles.md)).
You can override it like that:

```html
<style>
  #race text.label {
    fill: red !important;
  }
</style>
<div id="race"></div>

<script>
  const options = {
    selector: '#race',
    title: 'World Population',
    subTitle: 'in millions',
  };
  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    racingBars.race(data, options);
  });
</script>
```

<div className="gallery custom-labels">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
  />
</div>
