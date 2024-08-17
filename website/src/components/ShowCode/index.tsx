/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-internal-modules */
import React, { useState, useRef, useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import styles from './styles.module.css';
import OpenInPlayground from '../OpenInPlayground';

export default function ShowCode(props: {
  js: string;
  ts: string;
  react: string;
  vue: string;
  svelte: string;
  open?: boolean;
}): JSX.Element {
  const [jsCode] = useState(props.js);
  const [tsCode] = useState(props.ts);
  const [reactCode] = useState(props.react);
  const [vueCode] = useState(props.vue);
  const [svelteCode] = useState(props.svelte);

  const codeBlockTitleHeight = '3.7rem';
  const [codeCollapsed, setCodeCollapsed] = useState(true);
  const [height, setHeight] = useState(codeBlockTitleHeight);
  const codeBlockContainer = useRef(null);
  const summary = useRef(null);

  const resize = () => {
    setTimeout(() => {
      setHeight(`calc(${codeBlockContainer.current.offsetHeight}px + ${codeBlockTitleHeight})`);
    }, 5);
    setTimeout(() => {
      setHeight(`calc(${codeBlockContainer.current.offsetHeight}px + ${codeBlockTitleHeight})`);
    }, 255);
  };

  const toggle = () => {
    setCodeCollapsed(!codeCollapsed);
    resize();
  };

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      if (props.open) {
        summary.current?.click();
      }
    }
  }, []);

  return (
    <details
      className={`alert alert--info ${styles.details}`}
      data-collapsed={codeCollapsed}
      style={{
        height: codeCollapsed ? codeBlockTitleHeight : height,
        overflow: 'hidden',
        willChange: 'height',
        transition: `height ${codeCollapsed ? '250ms' : '265ms'} ease-in-out 0s`,
        margin: '1em 0',
      }}
    >
      <summary onClick={toggle} ref={summary}>
        show code
      </summary>
      <div
        ref={codeBlockContainer}
        style={{
          display: 'block',
          overflow: 'hidden',
        }}
      >
        <div className={styles.collapsibleContent}>
          <Tabs groupId="sdk-code">
            <TabItem value="js" label="JS" attributes={{ onMouseDown: resize }}>
              <CodeBlock language="js">{jsCode}</CodeBlock>
              <OpenInPlayground language="js" code={jsCode} />
            </TabItem>
            <TabItem value="ts" label="TS" attributes={{ onMouseDown: resize }}>
              <CodeBlock language="ts">{tsCode}</CodeBlock>
              <OpenInPlayground language="ts" code={tsCode} />
            </TabItem>
            <TabItem value="react" label="React" attributes={{ onMouseDown: resize }}>
              <CodeBlock language="jsx">{reactCode}</CodeBlock>
              <OpenInPlayground language="jsx" code={reactCode} />
            </TabItem>
            <TabItem value="vue" label="Vue" attributes={{ onMouseDown: resize }}>
              <CodeBlock language="html">{vueCode}</CodeBlock>
              <OpenInPlayground language="vue" code={vueCode} />
            </TabItem>
            <TabItem value="svelte" label="Svelte" attributes={{ onMouseDown: resize }}>
              <CodeBlock language="html">{svelteCode}</CodeBlock>
              <OpenInPlayground language="svelte" code={svelteCode} />
            </TabItem>
          </Tabs>
        </div>
      </div>
    </details>
  );
}
