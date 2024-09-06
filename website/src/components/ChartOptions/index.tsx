// eslint-disable-next-line import/no-unresolved
import { getBaseUrl } from '@site/src/helpers/base-url';
import RacingBars from '../RacingBars';
import type { Props } from '../../../../src';
import styles from './styles.module.css';

const PARAMS: Props = {
  dataTransform: (data) =>
    data.map((d) => ({
      ...d,
      icon: `https://flagsapi.com/${d.code}/flat/64.png`,
    })),
  colorSeed: '',
  showGroups: false,
  topN: 10,
  autorun: false,
  loop: false,
  title: 'World Population',
  subTitle: 'in millions',
  caption: 'Source: World Bank',
  dateCounter: 'MM/YYYY',
  labelsPosition: 'inside',
  labelsWidth: 150,
  showIcons: true,
  controlButtons: 'all',
  overlays: 'all',
  theme: 'dark',
  fixedScale: false,
  highlightBars: true,
  selectBars: true,
};

async function initPane(racer) {
  const baseUrl = getBaseUrl();
  const mod = await import(/* webpackIgnore: true */ `${baseUrl}/js/tweakpane.min.js`);
  const { Pane } = mod;
  const pane = new Pane({
    container: document.querySelector<HTMLElement>('#tweakpane')!,
    expanded: true,
    title: 'Change Options:',
  });

  pane.addBinding(PARAMS, 'theme', { options: { dark: 'dark', light: 'light' } });
  pane.addBinding(PARAMS, 'title');
  pane.addBinding(PARAMS, 'subTitle');
  pane.addBinding(PARAMS, 'caption');
  pane.addBinding(PARAMS, 'dateCounter');
  pane.addBinding(PARAMS, 'showIcons');
  pane.addBinding(PARAMS, 'showGroups');
  pane.addBinding(PARAMS, 'topN', { min: 2, max: 15, step: 1 });
  pane.addBinding(PARAMS, 'labelsPosition', {
    options: { inside: 'inside', outside: 'outside', none: 'none' },
  });
  pane.addBinding(PARAMS, 'labelsWidth', { min: 0, max: 300, step: 1 });
  pane.addBinding(PARAMS, 'loop');
  pane.addBinding(PARAMS, 'controlButtons', {
    options: { all: 'all', play: 'play', none: 'none' },
  });
  pane.addBinding(PARAMS, 'overlays', {
    options: { all: 'all', play: 'play', repeat: 'repeat', none: 'none' },
  });
  pane.addBinding(PARAMS, 'fixedScale');
  pane.addBinding(PARAMS, 'colorSeed');
  pane.addBinding(PARAMS, 'highlightBars');
  pane.addBinding(PARAMS, 'selectBars');

  pane.on('change', (ev: any) => {
    const key = ev.target.label;
    racer.changeOptions({ [key]: ev.value });
  });
}

export default function ChartOptions() {
  return (
    <div className={styles.container}>
      <RacingBars
        dataUrl="/data/population.csv"
        {...PARAMS}
        callback={(racer) => initPane(racer)}
        showCode={false}
        className={styles.chart}
      />
      <div id="tweakpane" className={styles.tweakpane}></div>
    </div>
  );
}
