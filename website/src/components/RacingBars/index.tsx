/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-internal-modules */
import React, { Suspense, lazy } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { getFrameworkCode } from '@site/src/helpers/get-framework-code';
import type { Props } from '../../../../src';
import ShowCode from '../ShowCode';
import styles from './styles.module.css';

export default function RacingBars(
  props: Props & {
    style?: Record<string, string>;
    className?: string;
    showCode?: 'open' | 'closed' | false;
    label?: string;
  },
): JSX.Element {
  const { label, className, style, showCode, callback, ...options } = props;
  const { jsCode, tsCode, reactCode, vueCode, svelteCode } = getFrameworkCode(options);
  const { colorMode } = useColorMode();

  const RacingBarsReact: React.ComponentType<Props & { children?: React.ReactNode }> = lazy(
    // @ts-ignore
    () => import('/lib/react.js'),
  );

  return (
    <BrowserOnly>
      {() => {
        const format = (code: string, language = 'js') => {
          try {
            return (window as any).prettier?.format(code, {
              parser: language === 'html' ? 'html' : 'babel',
              plugins: (window as any).prettierPlugins,
            });
          } catch {
            return code;
          }
        };

        return (
          <div className={styles.container}>
            <Suspense fallback={<div>Loading...</div>}>
              <RacingBarsReact
                className={`${props.className} racing-bars`}
                style={{
                  height: String(options.height) || '80vh',
                  ...props.style,
                }}
                {...{
                  theme: colorMode,
                  callback,
                  ...options,
                }}
              >
                Loading ...
              </RacingBarsReact>
            </Suspense>
            {props.showCode !== false && (
              <ShowCode
                js={format(jsCode, 'js')}
                ts={format(tsCode, 'ts')}
                react={format(reactCode, 'jsx')}
                vue={format(vueCode, 'html')}
                svelte={format(svelteCode, 'html')}
                open={props.showCode !== 'closed'}
              ></ShowCode>
            )}
          </div>
        );
      }}
    </BrowserOnly>
  );
}
