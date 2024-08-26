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

  const defaultOptions = demos.datasetPopulation;

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
      content: getFrameworkCode(defaultOptions).jsCode,
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

  const demoInUrl = ExecutionEnvironment.canUseDOM
    ? demos[new URL(location.href).searchParams.get('demo')]
    : undefined;

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
    if (!ExecutionEnvironment.canUseDOM) return 'js';

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
    updateLanguage(selectLanguage(), sdk, false);
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

  const updateLanguage = (
    lang: (typeof allowedLanguages)[number],
    sdk?: LiveCodesPlayground,
    updateUrl = true,
  ) => {
    setLanguage(lang);
    const playgroundSDK = playground || sdk;
    if (!playgroundSDK) return;
    const langName = lang === 'jsx' ? 'react' : lang;
    const { label: _, dynamicProps, ...demoOptions } = demo;
    const content = prepareCode(
      getFrameworkCode(demoOptions, dynamicProps)[`${langName}Code`] || '',
      lang,
    );
    playgroundSDK.setConfig(getConfig(lang, content));
    if (updateUrl) {
      setLangQueryString('');
      updateQueryString(lang);
    }
  };

  const updateDemoCode = (id: string) => {
    if (!playground) return;
    const demo = demos[id];
    if (!demo) return;
    setDemo(demo);
    const langName = language === 'jsx' ? 'react' : language;
    const { label: _, dynamicProps, ...demoOptions } = demo;
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
    Options & { label: string; dynamicProps: Partial<Record<keyof Options, string>> }
  >(demoInUrl ?? defaultOptions);
  const [langQueryString, setLangQueryString] = useState('lang');

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
          <Tabs queryString={langQueryString} groupId="sdk-code">
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
