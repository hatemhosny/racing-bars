import { loadData, Data, WideData, Options } from '..';

export function getDataPromiseAndOptions(props: any, elementId: string) {
  const selector = '#' + elementId;
  const { data, dataUrl, dataType, ...attr } = props;
  const options: Partial<Options> = { ...attr, selector };
  let dataPromise: Promise<Data[]> | Promise<WideData[]>;
  if (dataUrl && !data) {
    dataPromise = loadData(dataUrl, dataType);
  } else if (isPromise(data)) {
    dataPromise = data;
  } else {
    dataPromise = Promise.resolve(data);
  }
  return {
    dataPromise,
    options,
  };
}

function isPromise(p: any) {
  return Boolean(p && typeof p.then === 'function');
}

export function generateId(prefix = 'racingbars', n = 8) {
  const rnd = Array(3)
    .fill(null)
    .map(() => Math.random().toString(36).substr(2))
    .join('');
  return prefix + rnd.slice(-n);
}

/**
 * Interface for component props.
 * Defines options passed to components (angular/react/vue).
 * See [options documentations](/docs/documentation/options) for details.
 */
export interface Props {
  /** Data array */
  data: Data[] | WideData[];
  /** Url to fetch data from. This is ignored if [[Props.data]] is specified. */
  dataUrl: string;
  /** Type of data fetched from Url by [[Props.dataUrl]] */
  dataType: 'json' | 'csv' | 'tsv' | 'xml' | undefined;
  /** an `id` to assign to the generated DOM element */
  elementId: string;
  dataShape: 'long' | 'wide';
  dataTransform: null | ((data: Data[] | WideData[]) => Data[] | WideData[]);
  fillDateGaps: false | 'years' | 'months' | 'days';
  fillDateGapsValue: 'last' | 'interpolate';
  title: string;
  subTitle: string;
  dateCounter: string | ((currentDate: string, dateSlice: Data[], allDates: string[]) => string);
  startDate: string;
  endDate: string;
  loop: boolean;
  caption: string;
  labelsPosition: 'inside' | 'outside';
  labelsWidth: number;
  showIcons: boolean;
  colorSeed: string | number;
  showGroups: boolean;
  tickDuration: number;
  topN: number;
  height: string;
  width: string;
  disableClickEvents: boolean;
  disableKeyboardEvents: boolean;
  showControls: 'all' | 'play' | 'none';
  showOverlays: 'all' | 'play' | 'repeat' | 'none';
  autorun: boolean;
  injectStyles: boolean;
  theme: string;
  colorMap: { [key: string]: string } | string[];
  fixedScale: boolean;
  fixedOrder: string[];
  highlightBars: boolean;
  selectBars: boolean;
}
