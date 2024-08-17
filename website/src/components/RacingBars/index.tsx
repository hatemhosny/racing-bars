import React, { Suspense, lazy } from 'react';
import type { Props } from '../../../../src/index';
import ShowCode from '../ShowCode';
import styles from './styles.module.css';
import { useColorMode } from '@docusaurus/theme-common';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { getFrameworkCode } from '@site/src/helpers/get-framework-code';

export default function RacingBars(
  props: Props & {
    style?: Record<string, string>;
    className?: string;
    showCode?: 'open' | 'closed' | false;
    dynamicProps?: Record<keyof Props, string>;
  },
): JSX.Element {
  const { className, style, showCode, dynamicProps, ...options } = props;
  const { jsCode, tsCode, reactCode, vueCode, svelteCode } = getFrameworkCode(
    options,
    dynamicProps,
  );
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
                  height: options.height || '80vh',
                  ...props.style,
                }}
                {...{
                  theme: colorMode,
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
