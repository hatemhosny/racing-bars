---
title: Changing Options
---

import { useState } from 'react';
import RacingBars from '../../src/components/RacingBars';

Chart options can be changed during runtime using the API method [`changeOptions()`](../documentation/api.md#changeoptionsoptions-options--void).

#### Example

Click the links to change the number of bars:

export const Bars = ({children, topN}) => {
const [count, setCount] = useState(topN);
function addBar(e) {
setCount(count + 1);
e.preventDefault();
}
function resetBars(e) {
setCount(topN);
e.preventDefault();
}
return (<div className="gallery" style={{display: 'block', 'margin-bottom': '70px'}}><p>
<a href="#" onClick={addBar}>Add Bar</a> - <a href="#" onClick={resetBars}>Reset Bars</a></p>
<RacingBars
dataUrl="/data/population.csv"
dataType="csv"
title={'Number of Bars: ' + count}
autorun={true}
topN={count}
/></div>);
};

<Bars topN={5}></Bars>

#### Code

```html
<a href="#" onClick="addBar(event)">Add Bar</a> -
<a href="#" onClick="resetBars(event)">Reset Bars</a>
<div id="race">Loading...</div>

<script src="scripts/racing-bars.umd.js"></script>
<script>
  let topN = 5;
  const options = {
    selector: '#race',
    title: 'Number of Bars: ' + topN,
    topN,
  };

  let racer;
  racingBars.loadData('data/population.csv', 'csv').then((data) => {
    racer = racingBars.race(data, options);
  });

  function addBar(e) {
    topN += 1;
    racer.changeOptions({
      title: 'Number of Bars: ' + topN,
      topN,
    });
    e.preventDefault();
  }

  function resetBars(e) {
    topN = 5;
    racer.changeOptions({
      title: 'Number of Bars: ' + topN,
      topN,
    });
    e.preventDefault();
  }
</script>
```
