---
title: Chart Controls
---

import RacingBars from '../../src/components/RacingBars';

The chart behaviour can be contolled by:

## Options

- If [`autorun`](../documentation/options.md#autorun) option is set to `true` (default), the chart runs automatically when loaded.

- When the current date is the last date in the dataset, if [`loop`](../documentation/options.md#loop) option is set to `true`, the chart replays from the start, otherwise it stops.

## Control Buttons

[`controlButtons`](../documentation/options.md#controlbuttons) option shows/hides buttons that control the chart (play/pause/skip-back/skip-forward).

- The value `"all"` shows all buttons.
- The value `"play"` shows one button (play or pause).
- The value `"none"` hides all buttons.

## Overlays

[`overlays`](../documentation/options.md#overlays) option shows/hides semi-transparent overlays that cover the chart and shows buttons that control it.  
There are 2 overlays: "play" (at the beginning) and "repeat" (at the end).

- The value `"all"` shows both overlays.
- The value `"play"` shows an overlay at the beginning of the race with a play button.
- The value `"repeat"` shows an overlay at the end of the race with a repeat button.
- The value `"none"` hides both overlays.

## Mouse Controls

If [`mouseControls`](../documentation/options.md#mousecontrols) option is set to `true`, the chart can be controlled by mouse clicks.

- Single-click toggles play/pause.
- Double-click triggers skip-forward.
- Triple-click triggers skip-back.

## Keyboard Controls

If [`keyboardControls`](../documentation/options.md#keyboardcontrols) option is set to `true`, the chart can be controlled by the keyboard.

- The key <kbd>A</kbd> triggers skip-back.
- The key <kbd>S</kbd> and <kbd>spacebar</kbd> toggle play/pause.
- The key <kbd>D</kbd> triggers skip-forward.

If the currently active element is an `input` or a `textarea` (i.e. the user is typing), the keyboard events are ignored.

Note that if there are multiple charts in the page, all the charts with the option `keyboardControls` enabled, will be affected.

## API

The [`race`](../documentation/api.md#race) method returns an object that allows interaction with the chart.
See [API](../documentation/api.md#race) section for details.

---

#### Example

export let chartObj;

export const callback = (racer, data) => {
chartObj = racer;
const button = document.querySelector(".myControls button");
if (button) {
button.disabled = false;
button.onclick = () => {
chartObj.toggle();
};
}
};

export const toggleChart = () => {
if (!chartObj) return;
chartObj.toggle();
}

<div className="myControls" style={{margin: '30px'}}>
  <span>API command: </span><button className="toggle" disabled>Play/Pause</button>
</div>

<div className="gallery">
  <RacingBars
    dataUrl="/data/population.csv"
    dataType="csv"
    title="Chart Controls Demo"
    autorun={false}
    loop={false}
    controlButtons="all"
    overlays="all"
    mouseControls={true}
    keyboardControls={true}
    callback={callback}
    showCode={false}
  />
</div>

#### Code

```html
<div class="apiControl">
  <span>API command: </span>
  <button disabled>Play/Pause</button>
</div>
<div id="race"></div>

<script type="module">
  import { race } from 'https://cdn.jsdelivr.net/npm/racing-bars';
  const options = {
    dataType: 'csv',
    title: 'Chart Controls Demo',
    autorun: false,
    loop: false,
    controlButtons: 'all',
    overlays: 'all',
    mouseControls: true,
    keyboardControls: true,
  };

  const racer = await race('/data/population.csv', '#race', options);
  const button = document.querySelector('.apiControl button');
  button.disabled = false;
  button.addEventListener('click', () => {
    racer.toggle();
  });
</script>
```
