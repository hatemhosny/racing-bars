/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-internal-modules */
import React, { useState } from 'react';
import type { Config, Language, Playground as LiveCodesPlayground } from 'livecodes';
import LiveCodes from 'livecodes/react';
import type { Options } from 'racing-bars';
import Layout from '@theme/Layout';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { getFrameworkCode } from '../helpers/get-framework-code';
import { getCode } from '../components/OpenInPlayground';
import * as demos from '../../docs/gallery/_gallery-demos';
export default function Playground() {
  const baseUrl = ExecutionEnvironment.canUseDOM
    ? location.origin
    : useDocusaurusContext().siteConfig.url;

  const options: Options & { dataUrl: string } = {
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

  const demoInUrl = demos[new URL(location.href).searchParams.get('demo')];

  const getConfig = (
    lang: (typeof allowedLanguages)[number],
    content: string,
  ): Partial<Config> => ({
    ...config,
    markup: {
      language: 'html',
      content: ['js', 'ts'].includes(lang) ? '<div id="race">Loading...</div>' : '',
    },
    style: {
      language: 'css',
      content: ['vue', 'svelte'].includes(lang)
        ? ''
        : (lang === 'jsx' ? '.' : '#') + 'race {\n  height: 80vh;\n}\n',
    },
    script: {
      language: lang,
      content,
    },
  });

  const allowedLanguages = ['js', 'ts', 'jsx', 'vue', 'svelte'] as const;
  const getLangName = (lang: string | undefined) => (lang === 'jsx' ? 'react' : lang);

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

  const onSdkReady = (sdk: LiveCodesPlayground) => {
    setPlayground(sdk);
    if (!ExecutionEnvironment.canUseDOM) return;
    updateLanguage(selectLanguage(), sdk);
  };

  const format = (code: string, lang = 'js') => {
    if (!ExecutionEnvironment.canUseDOM) return code;
    try {
      return (window as any).prettier?.format(code, {
        parser: ['html', 'vue', 'svelte'].includes(lang) ? 'html' : 'babel',
        plugins: (window as any).prettierPlugins,
      });
    } catch {
      return code;
    }
  };

  const prepareCode = (code: string, lang: Language = 'js') =>
    getCode(lang, format(code, lang), baseUrl);

  const updateQueryString = (lang: string, id?: string) => {
    if (!ExecutionEnvironment.canUseDOM) return;
    const url = new URL(location.href);
    url.searchParams.set('lang', getLangName(lang));
    if (!id) {
      id = url.searchParams.get('demo');
    }
    if (id) {
      url.searchParams.set('demo', id);
    }
    history.replaceState(null, '', url);
  };

  const updateLanguage = (lang: (typeof allowedLanguages)[number], sdk?: LiveCodesPlayground) => {
    setLanguage(lang);
    const playgroundSDK = playground || sdk;
    if (!playgroundSDK) return;
    const langName = lang === 'jsx' ? 'react' : lang;
    const { dynamicProps, ...demoOptions } = demo;
    const content = prepareCode(
      getFrameworkCode(demoOptions, dynamicProps)[`${langName}Code`] || '',
      lang,
    );
    playgroundSDK.setConfig(getConfig(lang, content));
    updateQueryString(langName);
  };

  const updateDemoCode = (id: string) => {
    if (!playground) return;
    const { label, ...demo } = demos[id];
    if (!demo) return;
    setDemo(demo);
    const langName = language === 'jsx' ? 'react' : language;
    const { dynamicProps, ...demoOptions } = demo;
    const content = prepareCode(
      getFrameworkCode(demoOptions, dynamicProps)[`${langName}Code`] || '',
      language,
    );
    playground.setConfig(getConfig(language, content));
    updateQueryString(language, id);
  };

  const [playground, setPlayground] = useState<LiveCodesPlayground | null>(null);
  const [language, setLanguage] = useState<(typeof allowedLanguages)[number]>(selectLanguage());
  const [demo, setDemo] = useState<
    Options & { dynamicProps: Partial<Record<keyof Options, string>> }
  >(demoInUrl ?? options);

  return (
    <Layout title="RacingBars Playground" description="A playground for the racing-bars library">
      <div style={{ margin: '2em', textAlign: 'center' }}>
        <h1>Playground</h1>
        <main>
          <div>
            <div className="dropdown dropdown--hoverable">
              <button className="button button--secondary" data-toggle="dropdown">
                Choose a demo
              </button>
              <ul className="dropdown__menu text--left">
                {Object.keys(demos).map((id) => {
                  const demo = demos[id];
                  return (
                    <li key={id}>
                      <a
                        className="dropdown__link"
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();
                          updateDemoCode(id);
                        }}
                      >
                        {demo.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <Tabs queryString="lang" groupId="sdk-code">
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
          <LiveCodes height="85vh" sdkReady={onSdkReady}></LiveCodes>
        </main>
      </div>
    </Layout>
  );
}
