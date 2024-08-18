---
title: Caption (data function)
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars';

This example shows the use of [data function](../documentation/options#data-function) in [caption](../documentation/options#caption).

<!--truncate-->

### Chart

export const options = {
caption: (currentDate, dateSlice, allDates) =>
`Total: ${Math.round(dateSlice.reduce((acc, curr) => acc + curr.value, 0))}`,
};

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    caption={options.caption}
    dynamicProps={{caption: `(currentDate, dateSlice, allDates) =>
\`Total: \${Math.round(dateSlice.reduce((acc, curr) => acc + curr.value, 0))}\``}}
  />
</div>
