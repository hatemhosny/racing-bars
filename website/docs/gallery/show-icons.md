---
title: Icons
toc_min_heading_level: 6
toc_max_heading_level: 6
---

import RacingBars from '../../src/components/RacingBars.tsx';

A demo showing the use of icons ([`showIcons`](/docs/documentation/options#showicons)).

<!--truncate-->

### Chart

export const transformFn = (data) => data.map((d) => ({
...d,
icon: `https://flagsapi.com/${d.code}/flat/64.png`,
}));

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    dataTransform={transformFn}
    title="World Population in 60 Years"
    showIcons={true}
    labelsPosition="outside"
    showGroups={false}
  />
</div>

### Code

```html {7,8}
<div id="race"></div>
<script>
  const options = {
    selector: '#race',
    dataTransform: transformFn,
    title: 'World Population',
    showIcons: true,
    labelsPosition: 'outside',
    showGroups: false,
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    const dataWithIcons = data.map((d) => ({
      ...d,
      icon: `https://flagsapi.com/${d.code}/flat/64.png`,
    }));

    racingBars.race(dataWithIcons, options);
  });
</script>
```

Notice setting [`labelsPosition`](/docs/documentation/options#labelsposition) to `'outside'` to keep the labels visible, since the icons will take some space on the bar.
