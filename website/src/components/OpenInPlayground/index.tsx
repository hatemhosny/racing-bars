import React from 'react';
import type { Config, Language } from 'livecodes';
import LZString from 'lz-string';
import styles from './styles.module.css';

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
      'racing-bars': 'http://127.0.0.1:8080/build/racing-bars.js',
      'racing-bars/react': 'http://127.0.0.1:8080/build/react.js',
      'racing-bars/vue': 'http://127.0.0.1:8080/build/vue.js',
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
  code = code.replace(/\/data\//g, 'http://127.0.0.1:8080/data/');

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
