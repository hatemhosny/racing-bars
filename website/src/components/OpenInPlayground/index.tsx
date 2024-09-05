/* eslint-disable import/no-unresolved */
import React from 'react';
import { getPlaygroundUrl, type Config, type Language } from 'livecodes';
import { getBaseUrl } from '@site/src/helpers/base-url';
import styles from './styles.module.css';

export default function OpenInPlayground(props: { language: Language; code: string }) {
  const baseUrl = getBaseUrl();
  const config: Partial<Config> = {
    title: 'RacingBars',
    activeEditor: 'script',
    script: {
      language: props.language,
      content: getCode(props.language, props.code, baseUrl),
    },
    markup: {
      language: 'html',
      content: ['js', 'ts'].includes(props.language) ? '<div id="race">Loading...</div>' : '',
    },
    style: {
      language: 'css',
      content: ['vue', 'svelte'].includes(props.language)
        ? ''
        : (props.language === 'jsx' ? '.' : '#') + 'race {\n  height: 80vh;\n}\n',
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
      href={getPlaygroundUrl({ config })}
      target="_blank"
      className={'external ' + styles.externalLink}
    >
      Open in playground
    </a>
  );
}

export function getCode(language: Language, code: string, baseUrl: string) {
  code = code?.replace(/"\/data\//g, '"' + baseUrl + '/data/') || '';

  if (language === 'js') {
    return code.replace(
      'const options = {',
      `/** @type {import('racing-bars').Options} */\nconst options = {`,
    );
  }

  if (language === 'jsx') {
    return code
      .replace(
        '  const options = {',
        `  /** @type {import('racing-bars').Options} */\n  const options = {`,
      )
      .replace('<RacingBars ', '<RacingBars className="race" ');
  }

  if (language === 'vue') {
    return (
      code.replace('<RacingBars ', '<RacingBars class="race" ') +
      `
<style scoped>
  .race {
    height: 80vh;
  }
</style>
`
    );
  }

  if (language === 'svelte') {
    return (
      code +
      `
<style>
  #race {
    height: 80vh;
  }
</style>
`
    );
  }

  return code;
}
