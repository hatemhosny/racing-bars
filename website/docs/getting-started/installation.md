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

### Direct Download

The library can alternatively be downloaded directly as:

- UMD module: [download](#)
- ES module: [download](#)
