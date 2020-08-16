---
title: Props
---

import { useState } from 'react';
import RacingBars from '../../racing-bars.js';

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
return (<div className="gallery" style={{display: 'block'}}><p>
<a href="#" onClick={addBar}>Add Bar</a> - <a href="#" onClick={resetBars}>Reset Bars</a></p>
<RacingBars
dataUrl="/data/population.csv"
dataType="csv"
title={'Number of Bars: ' + count}
autorun={true}
loop={false}
controlButtons="all"
overlays="all"
mouseControls={true}
keyboardControls={true}
topN={count}
/></div>);
};

<Bars topN={5}></Bars>
