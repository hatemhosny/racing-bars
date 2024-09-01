---
title: Multiple Charts
---

import RacingBars from '../../src/components/RacingBars';

Multiple charts can be added to the same page.
They work independently with each chart having its own data, options, state, API and events.

However, if multiple chart have [`keyboardControls`](../documentation/options.md#keyboardcontrols) option enabled,
keyboard events will control them all.

Example:

<div className="gallery">
  <RacingBars
    dataUrl="/data/brands.csv"
    dataType="csv"
    title="Chart 1"
    labelsPosition="outside"
    keyboardControls={true}
    mouseControls={true}
  />
</div>

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="Chart 2"
    showGroups={true}
    labelsPosition="inside"
    keyboardControls={true}
    mouseControls={true}
  />
</div>

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="Chart 3"
    theme="dark"
    keyboardControls={true}
    mouseControls={true}
  />
</div>
