---
title: Control Buttons
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';

A demo for using [`controlButtons`](../documentation/options#controlbuttons).

See the guide on [`chart controls`](../guides/chart-controls).

<!--truncate-->

## controlButtons: 'all'

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
    controlButtons="all"
/>

</div>

## controlButtons: 'play'

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
    controlButtons="play"
/>

</div>

## controlButtons: 'none' (default)

### Chart

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    subTitle="in millions"
    controlButtons="none"
/>

</div>
