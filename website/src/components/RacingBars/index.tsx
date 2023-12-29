import React, { Suspense, lazy } from 'react';
import type { Props } from '../../../../src/index';
import ShowCode from '../ShowCode';
import styles from './styles.module.css';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { getFrameworkCode } from '@site/src/helpers/get-framework-code';

export default function RacingBars(
  props: Props & {
    style?: Record<string, string>;
    className?: string;
    showCode?: 'open' | 'closed' | false;
  },
): JSX.Element {
  const { className, style, showCode, ...options } = props;
  const { jsCode, tsCode, reactCode, vueCode, svelteCode } = getFrameworkCode(options);

  const RacingBarsReact: React.ComponentType<Props & { children?: React.ReactNode }> = lazy(
    // @ts-ignore
    () => import('/lib/react.js'),
  );

  return (
    <BrowserOnly>
      {() => {
        return (
          <div className={styles.container}>
            <Suspense fallback={<div>Loading...</div>}>
              <RacingBarsReact
                className={`${props.className} racing-bars`}
                style={{
                  height: options.height || '80vh',
                  ...props.style,
                }}
                {...options}
              >
                Loading ...
              </RacingBarsReact>
            </Suspense>
            {props.showCode !== false && (
              <ShowCode
                js={jsCode}
                ts={tsCode}
                react={reactCode}
                vue={vueCode}
                svelte={svelteCode}
                open={props.showCode !== 'closed'}
              ></ShowCode>
            )}
          </div>
        );
      }}
    </BrowserOnly>
  );
}
