---
title: Color Palettes
hide_table_of_contents: true
---

import RacingBars from '../../src/components/RacingBars';
import { colorPalette, colorPalettesVibrant, colorPalettesPastel, colorPalettesDeep } from './\_gallery-demos.ts';

Demos for using [color palettes](../documentation/options.md#colormap) with an array of colors or a built-in palette name.

<!--truncate-->

### Custom Array

<div className="gallery">
  <RacingBars
    {...colorPalette}
  />
</div>

### Built-in Palette: `vibrantRedGoldGreen`

<div className="gallery">
  <RacingBars
    {...colorPalettesVibrant}
  />
</div>

### Built-in Palette: `pastel`

<div className="gallery">
  <RacingBars
    {...colorPalettesPastel}
  />
</div>

### Built-in Palette: `deep`

<div className="gallery">
  <RacingBars
    {...colorPalettesDeep}
  />
</div>

See the [Bar Colors guide](../guides/bar-colors.md#available-palettes) for the full list of all built-in palettes with color previews.
