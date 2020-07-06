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
}
