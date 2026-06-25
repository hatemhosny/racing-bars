---
title: React
---

A wrapper React component is available for using RacingBars in React applications.

## Installation

```shell
npm install racing-bars
```

## Import

```jsx
import RacingBars from 'racing-bars/react';
```

## Props

The React component accepts all [chart options](/documentation/options) plus the following component-specific props:

| Prop        | Type                                  | Default        | Description                                                                        |
| ----------- | ------------------------------------- | -------------- | ---------------------------------------------------------------------------------- |
| `data`      | `Data[] \| WideData[]`                | —              | Data array. If provided, `dataUrl` is ignored.                                     |
| `dataUrl`   | `string`                              | —              | URL to fetch data from. Ignored if `data` is provided.                             |
| `dataType`  | `'json' \| 'csv' \| 'tsv' \| 'xml'`   | `'json'`       | Type of data fetched from URL.                                                     |
| `elementId` | `string`                              | auto-generated | An `id` to assign to the container `<div>`.                                        |
| `className` | `string`                              | `''`           | A CSS class to assign to the container `<div>`.                                    |
| `style`     | `Record<string, string>`              | `{}`           | Inline styles for the container `<div>`.                                           |
| `callback`  | `(racer: Race, data: Data[]) => void` | —              | Function called after the chart loads. Receives the chart API object and the data. |
| `children`  | `React.ReactNode`                     | —              | Rendered inside the container as a loading fallback.                               |

## Usage

### Using dataUrl

```jsx
import RacingBars from 'racing-bars/react';

export default function App() {
  return (
    <RacingBars dataUrl="/data/population.json" title="World Population">
      Loading...
    </RacingBars>
  );
}
```

### Using data prop

```jsx
import RacingBars from 'racing-bars/react';

const data = [
  { name: 'China', value: 1444216107, date: '2023' },
  { name: 'India', value: 1403800000, date: '2023' },
  { name: 'USA', value: 335893238, date: '2023' },
];

export default function App() {
  return <RacingBars data={data} title="World Population" />;
}
```

### Using callback

```jsx
import RacingBars from 'racing-bars/react';

export default function App() {
  const handleCallback = (racer, data) => {
    console.log('Data:', data);
    racer.play();
    racer.on('dateChange', (date) => {
      console.log('Current date:', date);
    });
  };

  return (
    <RacingBars
      dataUrl="/data/population.json"
      callback={handleCallback}
      title="World Population"
    />
  );
}
```

### With TypeScript

```tsx
import RacingBars from 'racing-bars/react';
import type { Race, Data } from 'racing-bars';

export default function App() {
  const handleCallback = (racer: Race, data: Data[]) => {
    console.log('Chart loaded with', data.length, 'rows');
    racer.play();
  };

  return (
    <RacingBars
      dataUrl="/data/population.json"
      title="World Population"
      callback={handleCallback}
      loop
      topN={10}
      tickDuration={500}
    />
  );
}
```

### With className and style

```jsx
import RacingBars from 'racing-bars/react';

export default function App() {
  return (
    <RacingBars
      dataUrl="/data/population.json"
      className="my-chart"
      style={{ height: '600px', border: '1px solid #ccc' }}
      title="World Population"
    />
  );
}
```

### Changing Options at Runtime

The component automatically detects prop changes and updates the chart via `changeOptions()`.

```jsx
import { useState } from 'react';
import RacingBars from 'racing-bars/react';

export default function App() {
  const [topN, setTopN] = useState(10);

  return (
    <div>
      <label>
        Top N:
        <input
          type="range"
          min={5}
          max={20}
          value={topN}
          onChange={(e) => setTopN(Number(e.target.value))}
        />
        {topN}
      </label>
      <RacingBars dataUrl="/data/population.json" title="World Population" topN={topN} />
    </div>
  );
}
```

### Multiple Charts

```jsx
import RacingBars from 'racing-bars/react';

export default function App() {
  return (
    <div>
      <RacingBars dataUrl="/data/population.json" title="Population" elementId="chart1" loop />
      <RacingBars dataUrl="/data/gdp.json" title="GDP" elementId="chart2" theme="dark" loop />
    </div>
  );
}
```

## Notes

- The component accepts all chart options as props. See the [Options documentation](/documentation/options) for the full list.
- When `data` or `dataUrl` changes, the chart is re-created from scratch.
- Other prop changes are applied via `changeOptions()` without re-fetching data.
- The `children` prop is rendered inside the container and replaced by the chart once it loads.
