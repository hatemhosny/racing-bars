---
title: Chart Controls
---

import RacingBars from '../../racing-bars.js';

The chart behaviour can be contolled by:

## Options

- If [`autorun`](../documentation/options.md#autorun) option is set to `true` (default), the chart runs automatically when loaded.

- When the current date is the last date in the dataset, if [`loop`](../documentation/options.md#loop) option is set to `true`, the chart replays from the start, otherwise it stops.

## Control Buttons

[`controlButtons`](../documentation/options.md#controlbuttons) option shows/hides buttons that control the chart (play/pause/skip-back/skip-forward).

- The value "all" shows all buttons.
- The value "play" shows one button (play or pause).
- The value "none" hides all buttons.

## Overlays

[`overlays`](../documentation/options.md#overlays) option shows/hides semi-transparent overlays that cover the chart and show buttons that control it.
There are 2 overlays: play (at the beginning) and repeat (at the end).

- The value "all" shows both overlays.
- The value "play" shows an overlay at the beginning of the race with a play button.
- The value "repeat" shows an overlay at the end of the race with a repeat button.
- The value "none" hides both overlays.

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
const myControls = document.querySelector(".myControls");
if (myControls) myControls.style.display = 'block';
};

export const toggleChart = (e) => {
if (!chartObj) return;
chartObj.toggle();
e.preventDefault();
}

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
  />
</div>

<div className="myControls" style={{display: 'none', margin: '30px'}}>
  <span>API command: </span>
  <a href="#" className="toggle" onClick={toggleChart} style={{padding: '10px', border: '1px solid black'}}>
    Play/Pause
  </a>
</div>

#### Code

```html
<div id="race"></div>

<div class="apiControl" style="display: none;">
  <span>API command: </span>
  <a href="#">Play/Pause</a>
</div>

<script>
  const options = {
    selector: '#race',
    title: 'Chart Controls Demo',
    autorun: false,
    loop: false,
    controlButtons: 'all',
    overlays: 'all',
    mouseControls: true,
    keyboardControls: true,
  };

  racingBars.loadData('/data/population.csv', 'csv').then((data) => {
    const racer = racingBars.race(data, options);
    document.querySelector('.apiControl').style.display = 'block';
    document.querySelector('.apiControl a').addEventListener('click', (e) => {
      racer.toggle();
      e.preventDefault();
    });
  });
</script>
```
