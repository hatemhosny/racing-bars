---
title: Hightlight/Select Bars
---

import RacingBars from '../../src/components/RacingBars';

Bars can be hightlighted (on mouse hover) or selected (on click),
by enabling the options [`highlightBars`](../documentation/options.md#highlightbars) and [`selectBars`](../documentation/options.md#selectbars), respectively.

In addition, selection/unselection can be achieved programmaticaly using [`API`](../documentation/api.md) methods [`select`](../documentation/api.md#selectname-string--void), [`unselect`](../documentation/api.md#unselectname-string--void) and [`unselectAll`](../documentation/api.md#unselectall--void).

Example: hover/click bars in this chart

export let racer;
export function callback(racerObj, data) {
racer = racerObj;
}

<a onClick={()=>racer.select('India')} style={{cursor: 'pointer'}}>Select India</a> -
<a onClick={()=>racer.unselect('India')} style={{cursor: 'pointer'}}>Unselect India</a>

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="World Population"
    highlightBars={true}
    selectBars={true}
    callback={callback}
  />
</div>
