[![Ceasefire_Now-techforpalestine.org](https://img.shields.io/badge/%F0%9F%87%B5%F0%9F%87%B8_Ceasefire_Now-techforpalestine.org-D83838?color=D83838)](https://www.techforpalestine.org)

# RacingBars

Bar chart race made easy 🎉

<p align="center">
<img width="192" src="https://racing-bars.hatemhosny.dev/img/logo.png"></img>
</p>

_RacingBars_ is an [open-source](https://github.com/hatemhosny/racing-bars), light-weight (~45kb gzipped), easy-to-use, and [feature-rich](#features) javascript library for bar chart race, based on <a href="https://d3js.org" target="_blank" className="external">D3.js</a>.

_RacingBars_ is available for JavaScript, TypeScript, React, Vue and Svelte.

[![racing-bars: npm version](https://img.shields.io/npm/v/racing-bars)](https://www.npmjs.com/package/racing-bars)
[![racing-bars: npm downloads](https://img.shields.io/npm/dw/racing-bars)](https://www.npmjs.com/package/racing-bars)
[![racing-bars: jsdelivr downloads](https://data.jsdelivr.com/v1/package/npm/racing-bars/badge?style=rounded)](https://www.jsdelivr.com/package/npm/racing-bars)
[![license - MIT](https://img.shields.io/github/license/hatemhosny/racing-bars)](https://github.com/hatemhosny/racing-bars/blob/develop/LICENSE)
[![racing-bars: GitHub repo](https://img.shields.io/github/stars/hatemhosny/racing-bars?style=social)](https://github.com/hatemhosny/racing-bars)

🎡 Try it now on the [online playground](https://racing-bars.hatemhosny.dev/playground).

📖 [Documentations](https://racing-bars.hatemhosny.dev)

<p align="center">
<img height="322" width="716" src="https://racing-bars.hatemhosny.dev/img/racing-bars.gif"></img>
</p>

## Features

- Easy to use.
- Light-weight (~45kb gzipped).
- [Highly configurable](https://racing-bars.hatemhosny.dev/documentation/options), with sensible defaults.
- Available for vanilla JavaScript,TypeScript, React, Vue and Svelte.
- Responsive / configurable [chart size](https://racing-bars.hatemhosny.dev/guides/chart-size).
- Light and dark [themes](https://racing-bars.hatemhosny.dev/guides/themes-styles).
- Good looking default [colors](https://racing-bars.hatemhosny.dev/guides/colors), also configurable with color maps or palettes.
- Customizable title, sub-title, caption and date counter. They all allow displaying [calculated/dynamic values](https://racing-bars.hatemhosny.dev/guides/dynamic-values).
- Flexible handling for various [data shapes and formats](https://racing-bars.hatemhosny.dev/documentation/data).
- Data manipulation for [data transformation](https://racing-bars.hatemhosny.dev/documentation/options#datatransform), [cumulative sums](https://racing-bars.hatemhosny.dev/documentation/data#cumulative-sum) and [filling date gaps](https://racing-bars.hatemhosny.dev/documentation/data#filling-gaps-in-data).
- [Icons](https://racing-bars.hatemhosny.dev/guides/icons).
- [Labels](https://racing-bars.hatemhosny.dev/guides/labels) on the bars or outside.
- [Groups](https://racing-bars.hatemhosny.dev/guides/groups) with filters.
- Bar [highlight and selection](https://racing-bars.hatemhosny.dev/guides/highlight-select).
- Autorun or start manually.
- Allows looping.
- Optional fixed scale.
- Custom start/end dates.
- Allows changing speed.
- Controls for play/pause/skip-back/skip-forward ([chart controls](https://racing-bars.hatemhosny.dev/guides/chart-controls)).
- Overlays for play/repeat ([chart controls](https://racing-bars.hatemhosny.dev/guides/chart-controls)).
- Keyboard and mouse controls ([chart controls](https://racing-bars.hatemhosny.dev/guides/chart-controls)).
- [Multiple charts](https://racing-bars.hatemhosny.dev/guides/multiple-charts) can be inserted in the same page.
- [API](https://racing-bars.hatemhosny.dev/documentation/api) to control the chart.
- Emits custom DOM [events](https://racing-bars.hatemhosny.dev/documentation/events).
- Comprehensive [documentation](https://racing-bars.hatemhosny.dev/category/documentation/), with [usage guides](https://racing-bars.hatemhosny.dev/category/guides), [examples gallery](https://racing-bars.hatemhosny.dev/category/gallery) and an [online playground](https://racing-bars.hatemhosny.dev/playground).
- Open-source ([MIT License](https://racing-bars.hatemhosny.dev/license)).

## Getting Started

Usage options include:

### Option 1: Using a bundler

Install from npm

```shell
npm install racing-bars
```

then you can import it:

<!-- prettier-ignore-start -->

```js
import { race } from "racing-bars";

const options = {
  title: 'My Racing Bars',
  // ... other options
};

race("/data.json", "#race", options);
```


### Option 2: Load from CDN

#### ESM

```html
<div id="race"></div>
<script type="module">
  import { race } from "https://cdn.jsdelivr.net/npm/racing-bars";

  const options = {
    title: 'My Racing Bars',
    // ... other options
  };

  race("/data.json", "#race", options);
</script>
```

#### UMD

```html
<div id="race"></div>
<script src="https://https://cdn.jsdelivr.net/npm/racing-bars/racing-bars.umd.js"></script>
<script>
  const options = {
    title: 'My Racing Bars',
    // ... other options
  };

  // the UMD version provides the global object `racingBars`
  racingBars.race("/data.json", "#race", options);
</script>
```

<!-- prettier-ignore-end -->

Please refer to [documentation website](https://racing-bars.hatemhosny.dev/) for [usage](https://racing-bars.hatemhosny.dev/getting-started/usage), [data preparation](https://racing-bars.hatemhosny.dev/documentation/data), [chart options](https://racing-bars.hatemhosny.dev/documentation/options), [API](https://racing-bars.hatemhosny.dev/documentation/api) and more.

## Examples Gallery

See [gallery](https://racing-bars.hatemhosny.dev/category/gallery/) for usage examples.

## Playground

Go to the [online playground](https://racing-bars.hatemhosny.dev/playground/) to try out the library.

## Contribution

Contributions are welcome and highly appreciated.

Before contributing, please read the [code of conduct](https://github.com/hatemhosny/racing-bars/blob/develop/CODE_OF_CONDUCT.md).

Please [open an issue](https://github.com/hatemhosny/racing-bars/issues/new) to discuss your ideas before [creating a pull request](https://github.com/hatemhosny/racing-bars/pulls).

## License

[MIT](https://github.com/hatemhosny/racing-bars/blob/develop/LICENSE) License © [Hatem Hosny](https://github.com/hatemhosny).

## Sponsor 💚

Please consider [sponsoring](https://racing-bars.hatemhosny.dev/sponsor) the project to support its maintenance and continued development.
