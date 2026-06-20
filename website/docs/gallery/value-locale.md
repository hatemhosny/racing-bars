---
title: Value Locale
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';
import { valueLocaleEn, valueLocaleDe } from './\_gallery-demos.ts';

A demo for using [`valueLocale`](../documentation/options.md#valueLocale) to control number format of bar values.

<!--truncate-->

## valueLocale: "en-US" (default)

### Chart

<div className="gallery">
  <RacingBars
    {...valueLocaleEn}
    valueLocale={'en-US'}
/>

</div>

## valueLocale: "de-DE"

### Chart

<div className="gallery">
  <RacingBars
    {...valueLocaleDe}
    valueLocale={'de-DE'}
  />
</div>
