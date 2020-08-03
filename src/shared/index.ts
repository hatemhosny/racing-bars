import { loadData, Data, WideData, Options, Race } from '..';

export function processProps(props: any, elementId: string) {
  const selector = '#' + elementId;
  const { data, dataUrl, dataType, callback, ...attr } = props;
  const options: Partial<Options> = { ...attr, selector };

  let dataPromise: Promise<Data[]> | Promise<WideData[]>;
  if (dataUrl && !data) {
    dataPromise = loadData(dataUrl, dataType);
  } else if (isPromise(data)) {
    dataPromise = data;
  } else {
    dataPromise = Promise.resolve(data);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const cb = callback && typeof callback === 'function' ? callback : (_racer: Race) => {};

  return {
    dataPromise,
    options,
    callback: cb,
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
 * Extends [[Options]].
 * Defines options passed to components (angular/react/vue).
 * See [options documentations](/docs/documentation/options) for details.
 */
export interface Props extends Partial<Options> {
  /** Data array */
  data: Data[] | WideData[];
  /** Url to fetch data from. This is ignored if [[Props.data]] is specified. */
  dataUrl: string;
  /** Type of data fetched from Url by [[Props.dataUrl]] */
  dataType: 'json' | 'csv' | 'tsv' | 'xml' | undefined;
  /** An `id` to assign to the generated DOM element */
  elementId: string;
  /** Content to show till the chart loads. This can accept HTML. */
  loadingContent: string;
  /** Callback function that is executed after the chart loads.
   *
   * @param racer chart object ([[Race]]). Exposes the chart API.
   * @param data data array. The data used by the chart before any transformation
   */
  callback: (racer: Race, data: Data[] | WideData[]) => void;
}
