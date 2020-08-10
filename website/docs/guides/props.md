---
title: Props
---

import { useState } from 'react';
import RacingBars from '../../racing-bars.js';

#### Example

export let chartObj;
export let topN = 5;

export const callback = (racer, data) => {
chartObj = racer;
const myControls = document.querySelector(".myControls");
if (myControls) myControls.style.display = 'block';
};

export const addBar = (e) => {
topN += 1;
console.log(topN);
e.preventDefault();
}

export const Highlight = ({children, topN}) => {
const [count, setCount] = useState(5);
return (<div className="gallery">
<RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title={count}
    autorun={true}
    loop={false}
    controlButtons="all"
    overlays="all"
    mouseControls={true}
    keyboardControls={true}
    topN={count}
  /><div className="myControls" style={{margin: '30px'}}>
<a href="#" className="toggle" onClick={()=>{setCount(count + 1);console.log(count);}} style={{padding: '10px', border: '1px solid black'}}>
Add Bar
</a></div></div>);
};

<Highlight topN="5"></Highlight>
