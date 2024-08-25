import React, { useState } from 'react';
import type { Config, Playground } from 'livecodes';
import LiveCodes from 'livecodes/react';
import Layout from '@theme/Layout';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { getFrameworkCode } from '../helpers/get-framework-code';
import { getCode } from '../components/OpenInPlayground';

export default function Playground() {
  const baseUrl = ExecutionEnvironment.canUseDOM
    ? location.origin
    : useDocusaurusContext().siteConfig.url;

  const [playground, setPlayground] = useState<Playground | null>(null);

  const options = {
    dataUrl: baseUrl + '/data/population.csv',
    dataType: 'csv',
    // dataShape: 'long',
    // fillDateGaps: 'months',
    // fillDateGapsValue: 'last',
    dataTransform: (data) =>
      data.map((d) => ({
        ...d,
        value: Number(d.value) * 1000,
        icon: `https://flagsapi.com/${d.code}/flat/64.png`,
      })),
    title: 'World Population in 60 Years',
    subTitle: 'Top 10 World Population',
    dateCounter: 'YYYY',
    // dateCounter: (currentDate, dateSlice, dates) =>
    //   `${dates.indexOf(currentDate) + 1} of ${dates.length}`,
    caption: 'Source: World Bank',
    // caption: (date, dateSlice, allDates) =>
    //   `Total: ${Math.round(dateSlice.reduce((acc, curr) => acc + curr.value, 0))}`,
    // `Max: ${Math.round(Math.max(...dateSlice.map((d) => d.value)))}`,
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

  const config: Partial<Config> = {
    title: 'RacingBars',
    activeEditor: 'script',
    fontSize: 14,
    markup: {
      language: 'html',
      content: '<div id="race"></div>',
    },
    style: {
      language: 'css',
      content: '#race {\n  height: 95vh;\n}\n',
    },
    script: {
      language: 'js',
      content: getFrameworkCode(options).jsCode,
    },
    imports: {
      'racing-bars': baseUrl + '/lib/racing-bars.js',
      'racing-bars/react': baseUrl + '/lib/react.js',
      'racing-bars/vue': baseUrl + '/lib/vue.js',
    },
    types: {
      'racing-bars': baseUrl + '/lib/racing-bars.d.ts',
    },
  };

  const allowedLanguages = ['js', 'ts', 'jsx', 'vue', 'svelte'] as const;
  const fix = (lang: string | undefined) => (lang === 'jsx' ? 'react' : lang);
  const selectLanguage = () => {
    const getLanguage = (lang: string | undefined) => {
      if (lang === 'react') {
        lang = 'jsx';
      }
      if (lang && !allowedLanguages.includes(lang as (typeof allowedLanguages)[number])) {
        lang = undefined;
      }
      return lang as (typeof allowedLanguages)[number] | undefined;
    };

    const queryLanguage = getLanguage(new URL(location.href).searchParams.get('lang'));
    if (queryLanguage) {
      return queryLanguage;
    }

    const savedLanguage = getLanguage(localStorage.getItem('docusaurus.tab.sdk-code'));
    if (savedLanguage) {
      return savedLanguage;
    }
    return 'js';
  };

  const sdkReady = (sdk: Playground) => {
    setPlayground(sdk);
    if (!ExecutionEnvironment.canUseDOM) return;
    updateLanguage(selectLanguage(), sdk);
  };

  const updateLanguage = (language: (typeof allowedLanguages)[number], sdk?: Playground) => {
    const playgroundSDK = playground || sdk;
    if (!playgroundSDK) return;
    const langName = language === 'jsx' ? 'react' : language;
    const content = getCode(language, getFrameworkCode(options)[`${langName}Code`] || '', '');

    playgroundSDK.setConfig({
      ...config,
      markup: {
        language: 'html',
        content: ['js', 'ts'].includes(language) ? '<div id="race">Loading...</div>' : '',
      },
      style: {
        language: 'css',
        content: ['vue', 'svelte'].includes(language)
          ? ''
          : (language === 'jsx' ? '.' : '#') + 'race {\n  height: 80vh;\n}\n',
      },

      script: {
        language,
        content,
      },
    });
  };

  return (
    <Layout title="RacingBars Playground" description="A playground for the racing-bars library">
      <div style={{ margin: '2em', textAlign: 'center' }}>
        <h1>Playground</h1>
        <main>
          <Tabs queryString="lang" groupId="sdk-code" defaultValue={fix(selectLanguage())}>
            <TabItem
              value="js"
              label="JS"
              attributes={{ onMouseDown: () => updateLanguage('js') }}
              default
            >
              {''}
            </TabItem>
            <TabItem
              value="ts"
              label="TS"
              attributes={{ onMouseDown: () => updateLanguage('ts') }}
              default
            >
              {''}
            </TabItem>
            <TabItem
              value="react"
              label="React"
              attributes={{ onMouseDown: () => updateLanguage('jsx') }}
              default
            >
              {''}
            </TabItem>
            <TabItem
              value="vue"
              label="Vue"
              attributes={{ onMouseDown: () => updateLanguage('vue') }}
              default
            >
              {''}
            </TabItem>
            <TabItem
              value="svelte"
              label="Svelte"
              attributes={{ onMouseDown: () => updateLanguage('svelte') }}
              default
            >
              {''}
            </TabItem>
          </Tabs>
          <LiveCodes height="85vh" sdkReady={sdkReady}></LiveCodes>
        </main>
      </div>
    </Layout>
  );
}
