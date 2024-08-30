---
title: Icons
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';
import { icons } from './\_gallery-demos.ts';

A demo showing the use of [icons](../guides/icons.md).

<!--truncate-->

### Chart

export const transformFn = (data) => data.map((d) => ({
...d,
icon: `https://flagsapi.com/${d.code}/flat/64.png`,
}));

<div className="gallery">
  <RacingBars
    {...icons}
  />
</div>

Notice setting [`labelsPosition`](../documentation/options.md#labelsposition) to `'outside'` to keep the labels visible, since the icons will take some space on the bar.

You may also use the [`dataTransform`](../documentation/options.md#datatransform) option for data transformation,
like in [this example](./data-transform.md).
