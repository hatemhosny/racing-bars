import React from 'react';
import type { Config, Language } from 'livecodes';
import LZString from 'lz-string';

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
        ? '<div id="race"></div>'
        : props.language === 'jsx'
        ? '<div id="root"></div>'
        : '',
    },
    style: {
      language: 'css',
      content: (['jsx', 'vue'].includes(props.language) ? '.' : '#') + 'race { height: 500px; }',
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
    >
      Open in playground
      <svg
        width="13.5"
        height="13.5"
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module"
      >
        <path
          fill="currentColor"
          d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
        ></path>
      </svg>
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
