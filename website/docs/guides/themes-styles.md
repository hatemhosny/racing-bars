---
title: Themes and Styles
---

## Themes

There are currently 2 themes available: light theme (<a href="https://github.com/hatemhosny/racing-bars/blob/master/src/lib/css/light.theme.css" target="_blank" className="external">view CSS</a>) and dark theme (<a href="https://github.com/hatemhosny/racing-bars/blob/master/src/lib/css/dark.theme.css" target="_blank" className="external">view CSS</a>).
The default is the light theme.

You can switch themes using the [`theme`](../documentation/options.md#theme) option.

Example: [view in gallery](../gallery/theme-dark.md)

```js
import { race } from 'racing-bars';

const options = {
  theme: 'dark',
};

race('/data/population.json', '#race', options);
```

### Custom Themes

To use a custom theme, modify a <a href="https://github.com/hatemhosny/racing-bars/blob/master/src/lib/css/dark.theme.css" target="_blank" className="external">theme CSS</a>.
Replace the placeholder `__selector__` in the CSS file by your element CSS selector.
Then add the stylesheet to the head of the HTML document.

Example:

```css title="css/custom-theme.css"
#race {
  background-color: #313639;
}

#race text.title {
  fill: #fafafa;
}

#race text.subTitle {
  fill: #cccccc;
}

#race text.dateCounterText {
  fill: #cccccc;
  opacity: 1;
}

#race text.caption {
  fill: #cccccc;
}

#race .halo {
  fill: #313639;
  stroke: #313639;
  stroke-width: 10;
  stroke-linejoin: round;
  opacity: 1;
}

#race text.legend-text {
  fill: #fafafa;
}

#race text.label {
  fill: #313639;
}

#race text.label.outside-bars {
  fill: #fafafa;
}

#race text.valueLabel {
  fill: #fafafa;
}

#race .tick text {
  fill: #cccccc;
}

#race .tick line {
  shape-rendering: CrispEdges;
  stroke: #dddddd;
}

#race .tick line.origin {
  stroke: #aaaaaa;
}

#race .controls div,
#race .overlay div {
  color: #ffffff;
  background: #777777;
  border: 1px solid black;
  opacity: 0.5;
}

#race .controls div:hover,
#race .overlay div:hover {
  background: #aaaaaa;
  color: black;
}

#race .overlay {
  background-color: black;
  opacity: 0.7;
}

#race .highlight {
  fill: #ff2727 !important;
}

#race .selected {
  fill: #d12020 !important;
  stroke: #777777 !important;
  stroke-width: 1 !important;
}
```

```html title="index.html" {3}
<html>
  <head>
    <link rel="stylesheet" href="css/custom-theme.css" />
  </head>

  <body>
    <div id="race"></div>

    <script src="scripts/racing-bars.umd.js"></script>
    <script>
      const options = {
        title: 'World Population',
      };
      racingBars.race('data/population.json', '#race', options);
    </script>
  </body>
</html>
```

## Styles

The chart styles are defined in CSS which is bundled in the JS library.
When the chart loads, the styles are dynamically injected in the top of the HTML document head.
The styles are scoped to the [container element](../documentation/api.md#race).

The CSS used can be <a href="https://github.com/hatemhosny/racing-bars/tree/master/src/lib/css" target="_blank" className="external">found here</a>.

You may override the styles like that:

```html {4-7}
<html>
  <head>
    <style>
      #race text.title {
        font-size: 28px;
        font-weight: 300;
      }
    </style>
  </head>

  <body>
    <div id="race"></div>

    <script src="scripts/racing-bars.umd.js"></script>
    <script>
      const options = {
        selector: ,
        title: 'World Population',
      };
      racingBars.race('data/population.json', '#race', options);
    </script>
  </body>
</html>
```

If you do not want to inject CSS by JS, you can set the option [`injectStyles`](../documentation/options.md#injectstyles) to `false`.
No styles will be added, including the themes. You should then add the styles yourself.
You may want to refer to the <a href="https://github.com/hatemhosny/racing-bars/tree/master/src/lib/css" target="_blank" className="external">CSS used by the library</a> to use as a strating point.
