---
title: RacingBars
hide_table_of_contents: true
---

### **Bar Chart Race Made Easy 🎉**

_RacingBars_ is an [open-source](https://github.com/hatemhosny/racing-bars), light-weight (~45kb gzipped), easy-to-use, and [feature-rich](./features.md) javascript library for bar chart race.
It is based on <a href="https://d3js.org" target="_blank" className="external">D3.js</a>.

_RacingBars_ is available for JavaScript, TypeScript, React, Vue and Svelte.

import RacingBars from '../src/components/RacingBars';

**Examples:**

<div className="gallery">
  <RacingBars
    dataUrl="/data/brands.json"
  />
</div>

<p style={{height: 30}}> </p>

export const transformFn = (data) => data.map((d) => ({
...d,
icon: `https://flagsapi.com/${d.code}/flat/64.png`,
}));

<div className="gallery">
  <RacingBars
    style={{width: 800, height: 450}}

    dataUrl="/data/population.csv"
    dataType="csv"
    dataTransform={transformFn}
    title="World Population in 60 Years"
    subTitle="Country Population in millions"
    caption="Source: World Bank"
    dateCounter= "YYYY"
    showGroups={true}
    showIcons={true}
    labelsPosition="outside"
    labelsWidth={160}
    autorun={false}
    overlays="all"
    controlButtons="all"
    highlightBars={true}
    selectBars={true}
    theme="dark"

/>

</div>
