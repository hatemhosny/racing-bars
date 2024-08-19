---
title: Changing Options
---

import { useState } from 'react';
import RacingBars from '../../src/components/RacingBars';

Chart options can be changed during runtime using the API method [`changeOptions()`](../documentation/api.md#changeoptions-options-options--promisevoid).

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
showCode={false}
/></div>);
};

<Bars topN={5}></Bars>

#### Code

```html
<a href="#" id="addBar">Add Bar</a> -
<a href="#" id="resetBars">Reset Bars</a>
<div id="race">Loading...</div>

<script type="module">
  import { race } from 'https://cdn.jsdelivr.net/npm/racing-bars';

  let topN = 5;
  const options = {
    dataType: 'csv',
    title: 'Number of Bars: ' + topN,
    topN,
  };

  const racer = await race('/data/population.csv', '#race', options);

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

  document.getElementById('addBar').addEventListener('click', addBar);
  document.getElementById('resetBars').addEventListener('click', resetBars);
</script>
```
