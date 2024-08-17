---
title: Usage
---

The library exports the function [`race`](../documentation/api.md#race), which creates the bar chart race. It has the following signature:

Type: [`function race(data, container?, options?): Promise<Race>`](/api/modules.md#race)

The function accepts the following parameters:

- `data`:

  Type: [`Data`](/api/interfaces/Data.md)[] | `Promise`&lt;[`Data`](/api/interfaces/Data.md)[]&gt; | [`WideData`](/api/interfaces/WideData.md)[] | `Promise`&lt;[`WideData`](/api/interfaces/WideData.md)[]&gt; | `string`

  The data object, a promise that resolves to it or a URL to it.  
  See [section about data](../documentation/data.md) for details.

- `container`:

  Type: `HTMLElement` | `string`

  The chart container HTML element or a string representing a CSS selector for it. If not provided, the document `body` element is used.

- `options`:

  Type: `Partial`&lt;[`Options`](/api/interfaces/Options.md)&gt;

  An optional configuration object.  
  See [section about options](../documentation/options.md) for details

Examples for usage:

```js title="fetch json data from url"
import { race } from 'racing-bars';

race('data/population.json', '#race', { title: 'World Population' });
```

```js title="fetch csv data from url"
import { race } from 'racing-bars';

const options = {
  dataType: 'csv',
  title: 'World Population',
  subTitle: 'in millions',
  autorun: false,
};
race('data/population.csv', '#race', options);
```

For convenience, the library also exports the function [`loadData`](../documentation/api.md) to allow fetching data from URL.
It supports the following data formats, by specifying the second optional parameter:

- `'json'` (default)
- `'csv'`
- `'tsv'`
- `'xml'`

The `loadData` method returns a promise with the fetched data converted to a javascript object.

Examples for usage:

```js
import { loadData, race } from 'racing-bars';

loadData('data/population.json').then((data) => {
  race(data, '#race', { title: 'World Population' });
});
```
