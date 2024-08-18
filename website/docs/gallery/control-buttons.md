---
title: Control Buttons
toc_min_heading_level: 6
toc_max_heading_level: 6
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
