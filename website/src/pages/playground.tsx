import React from 'react';
import type { Config } from 'livecodes';
import LiveCodes from 'livecodes/react';
import Layout from '@theme/Layout';

export default function Playground() {
  const config: Partial<Config> = {
    title: 'Racing Bars',
    activeEditor: 'script',
    markup: {
      language: 'html',
      content: '<div id="race"></div>',
    },
    style: {
      language: 'css',
      content: '#race { height: 95vh; }',
    },
    script: {
      language: 'js',
      content: `
import { loadData, race } from 'racing-bars';

const options = {
  selector: '#race',
  // dataShape: 'wide',
  // fillDateGaps: 'months',
  // fillDateGapsValue: 'last',
  title: 'World Population in 60 Years',
  subTitle: 'Top 10 World Population',
  dateCounter: 'YYYY',
  // dateCounter: (currentDate, dateSlice, dates) =>
  //   \`\${dates.indexOf(currentDate) + 1} of \${dates.length}\`,
  caption: 'Source: World Bank',
  // caption: (date, dateSlice, allDates) =>
  //   \`Total: \${Math.round(dateSlice.reduce((acc, curr) => acc + curr.value, 0))}\`,
  // \`Max: \${Math.round(Math.max(...dateSlice.map((d) => d.value)))}\`,
  // startDate: '1960-1-1',
  endDate: '2020-12-31',
  // loop: true,
  // loopDelay: 5000,
  tickDuration: 500,
  // topN: 15,
  // height: "window*0.85",
  // width: 'window*0.5',
  // disableClickEvents: true,
  // disableKeyboardEvents: true,
  showGroups: false,
  // showControls: 'all',
  // showOverlays: 'all',
  // showGroups: false,
  showIcons: true,
  // autorun: false,
  // colorSeed: "asdfs",
  // labelsOnBars: false,
  // labelsWidth: 250,
  // embedStyles: false,
  // theme: 'dark',
  // fixedScale: true,
  // highlightBars: true,
  // selectBars: true,

};

loadData('http://127.0.0.1:8080/data/population.csv', 'csv').then((data) => {
  data = data.map((d) => ({
    ...d,
    value: Number(d.value) * 1000,
    icon: \`https://flagsapi.com/\${d.code}/flat/64.png\`,
  }));
  race(data, options);
});
`.trimStart(),
    },
    imports: {
      'racing-bars': 'http://127.0.0.1:8080/build/racing-bars.js',
      'racing-bars/react': 'http://127.0.0.1:8080/build/react.js',
      'racing-bars/vue': 'http://127.0.0.1:8080/build/vue.js',
    },
    fontSize: 14,
  };

  return (
    <Layout title="Racing Bars Playground" description="A playground for the racing-bars library">
      <div style={{ margin: '2em', textAlign: 'center' }}>
        <h1>Playground</h1>
        <main>
          <LiveCodes config={config} height="85vh"></LiveCodes>
        </main>
      </div>
    </Layout>
  );
}
