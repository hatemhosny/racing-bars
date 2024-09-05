---
title: RacingBars
hide_table_of_contents: true
---

<head>
  <title>RacingBars</title>
  <meta property="og:title" content="RacingBars" />
  <meta name="twitter:title" content="RacingBars" />
</head>

### **Bar Chart Race Made Easy 🎉**

_RacingBars_ is an [open-source](https://github.com/hatemhosny/racing-bars), light-weight (~45kb gzipped), easy-to-use, and [feature-rich](./features.md) javascript library for bar chart race, based on <a href="https://d3js.org" target="_blank" className="external">D3.js</a>.

_RacingBars_ is available for JavaScript, TypeScript, React, Vue and Svelte.

import RacingBars from '../src/components/RacingBars';
import ChartOptions from '../src/components/ChartOptions';

**Examples:**

This is a basic chart with the default options

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

Try playing with some of the [options](./documentation/options.md). Or check the code [playground](./playground).

<div className="gallery">
  <ChartOptions />
</div>
