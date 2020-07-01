---
title: Installation
---

Installation options include:

### CDN

- Simply, add this script to the page HTML

```html
<script src="https://cdn.jsdelivr.net/npm/racing-bars"></script>
```

This adds the global variable `racingBars`.

- If you are using native ES Modules, you may instead use:

```html
<script type="module">
  import { racingBars } from 'https://cdn.jsdelivr.net/npm/racing-bars/dist/racing-bars.esm.js';
</script>
```

### NPM

Alternatively, you can get it from npm using the shell command

```sh
npm install racing-bars
```

then you can import it:

```html
<script type="module">
  import { racingBars } from 'racing-bars';
</script>
```

### Direct download

The library can alternatively be downloaded directly as:

- UMD module: [download](#)
- ES module: [download](#)

### Lite bundle

If you are already using d3, you may use the "lite" bundle which does not include d3

```html
<script src="https://cdn.jsdelivr.net/npm/d3@5.16.0/dist/d3.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/racing-bars/lite/index.umd.js"></script>
```
