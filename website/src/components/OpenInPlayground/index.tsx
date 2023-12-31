import React from 'react';
import type { Config, Language } from 'livecodes';
import LZString from 'lz-string';
import styles from './styles.module.css';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const baseUrl = ExecutionEnvironment.canUseDOM ? location.origin : 'https://racing-bars.pages.dev';

export default function OpenInPlayground(props: { language: Language; code: string }) {
  const config: Partial<Config> = {
    title: 'Racing Bars',
    activeEditor: 'script',
    script: {
      language: props.language,
      content: getCode(props.language, props.code),
    },
    markup: {
      language: 'html',
      content: ['js', 'ts'].includes(props.language)
        ? '<div id="race">Loading...</div>'
        : props.language === 'jsx'
        ? '<div id="root">Loading...</div>'
        : '',
    },
    style: {
      language: 'css',
      content: (['jsx', 'vue'].includes(props.language) ? '.' : '#') + 'race { height: 80vh; }',
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

  return (
    <a
      href={
        'https://livecodes.io?x=code/' +
        LZString.compressToEncodedURIComponent(JSON.stringify(config))
      }
      target="_blank"
      className={'external ' + styles.externalLink}
    >
      Open in playground
    </a>
  );
}

function getCode(language: Language, code: string) {
  code = code.replace(/\/data\//g, baseUrl + '/data/');

  if (language === 'jsx') {
    return `
import React from "react";
import { createRoot } from "react-dom/client";
${code.replace('<RacingBars ', '<RacingBars className="race" ')}
const root = createRoot(document.querySelector("#root"));
root.render(<App />);
`.trimStart();
  }

  if (language === 'vue') {
    return code.replace('<RacingBars ', '<RacingBars class="race" ');
  }

  return code;
}
