---
title: Svelte
---

RacingBars can be used in Svelte applications by using the JavaScript API directly. No wrapper component is needed.

## Installation

```shell
npm install racing-bars
```

## Usage

Use the `race()` function inside `onMount`, and clean up via the returned teardown function.

### Basic example

```html
<script>
  import { onMount } from 'svelte';
  import { race } from 'racing-bars';

  let chart = $state(null);

  onMount(() => {
    race('/data/population.json', '#race', {
      title: 'World Population',
    }).then((racer) => {
      chart = racer;
    });

    return () => chart?.destroy();
  });
</script>

<div id="race">Loading...</div>
```

### With data options

```html
<script>
  import { onMount } from 'svelte';
  import { race } from 'racing-bars';

  let chart = $state(null);

  onMount(() => {
    race('/data/population.json', '#race', {
      title: 'World Population',
      topN: 10,
      theme: 'dark',
      loop: true,
      tickDuration: 200,
    }).then((racer) => {
      chart = racer;
    });

    return () => chart?.destroy();
  });
</script>

<div id="race">Loading...</div>
```

### Using the Race API

```html
<script>
  import { onMount } from 'svelte';
  import { race } from 'racing-bars';

  let chart = $state(null);
  let isPlaying = $state(false);

  onMount(() => {
    race('/data/population.json', '#race', {
      title: 'World Population',
    }).then((racer) => {
      chart = racer;
      racer.on('play', () => (isPlaying = true));
      racer.on('pause', () => (isPlaying = false));
    });

    return () => chart?.destroy();
  });

  function toggle() {
    chart?.toggle();
  }

  function skipForward() {
    chart?.skipForward();
  }
</script>

<div>
  <div id="race">Loading...</div>
  <button onclick="{toggle}">{isPlaying ? 'Pause' : 'Play'}</button>
  <button onclick="{skipForward}">Skip to End</button>
</div>
```

### With inline data

```html
<script>
  import { onMount } from 'svelte';
  import { race } from 'racing-bars';

  let chart = $state(null);

  const data = [
    { name: 'China', value: 1444216107, date: '2023' },
    { name: 'India', value: 1403800000, date: '2023' },
    { name: 'USA', value: 335893238, date: '2023' },
  ];

  onMount(() => {
    race(data, '#race', { title: 'World Population' }).then((r) => (chart = r));
    return () => chart?.destroy();
  });
</script>

<div id="race">Loading...</div>
```

### Updating options reactively

```html
<script>
  import { onMount } from 'svelte';
  import { race } from 'racing-bars';

  let chart = $state(null);
  let topN = $state(10);

  onMount(() => {
    race('/data/population.json', '#race', {
      title: 'World Population',
      topN,
    }).then((r) => (chart = r));

    return () => chart?.destroy();
  });

  $effect(() => {
    if (chart) chart.changeOptions({ topN });
  });
</script>

<div>
  <label>
    Top N:
    <input type="range" bind:value="{topN}" min="{5}" max="{20}" />
    {topN}
  </label>
  <div id="race">Loading...</div>
</div>
```

## Notes

- Since there is no Svelte wrapper, you manage the chart lifecycle manually using `onMount`.
- Use the `onMount` teardown return (or `onDestroy`) to call `chart?.destroy()` and prevent memory leaks.
- Use `$state()` runes for reactive variables and `$effect()` for reactive side effects like option changes.
- See the [JavaScript documentation](/packages/js) for the full API reference.
