---
title: Installation
pagination_next: getting-started/usage
---

Installation options include:

## Option 1: Using a bundler

Install from npm

```shell
npm install racing-bars
```

then you can import it:

<!-- prettier-ignore-start -->

```js
import { race } from "racing-bars";

race("/data.json", "#race", { /* options */ });
```


## Option 2: Load from CDN

### ESM

```html
<div id="race"></div>
<script type="module">
  import { race } from "https://cdn.jsdelivr.net/npm/racing-bars";

  race("/data.json", "#race", { /* options */ });
</script>
```

### UMD

```html
<div id="race"></div>
<script src="https://https://cdn.jsdelivr.net/npm/racing-bars/racing-bars.umd.js"></script>
<script>
  // the UMD version provides the global object `racingBars`
  racingBars.race("/data.json", "#race", { /* options */ });
</script>
```

<!-- prettier-ignore-end -->
