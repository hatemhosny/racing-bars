import { loadData, Data, WideData, Options, defaultOptions, Race } from '..';

export function processProps(props: any, elementId: string) {
  const selector = '#' + elementId;
  const { data, dataUrl, dataType, callback, className = '', style = {}, ...attr } = props;
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
    className,
    style,
  };
}

function isPromise(p: any) {
  return Boolean(p && typeof p.then === 'function');
}

/**
 * Type for component props.
 * Extends [[Options]]
 * Defines props passed to components (angular/react/vue).
 * See [options documentations](/docs/documentation/options) for the rest of props.
 */
export interface Props
  extends Partial<
    Options & {
      /** Data array */
      data: Data[] | WideData[];

      /** Url to fetch data from. This is ignored if [[Props.data]] is specified. */
      dataUrl: string;

      /** Type of data fetched from Url by [[Props.dataUrl]] */
      dataType: 'json' | 'csv' | 'tsv' | 'xml';

      /** An `id` to assign to the generated DOM element */
      elementId: string;

      /** A `class` to assign to the generated DOM element */
      className: string;

      /** A `class` to assign to the generated DOM element */
      style: Record<string, string>;

      /** Callback function that is executed after the chart loads.
       *
       * @param racer chart object ([[Race]]). Exposes the chart API.
       * @param data data array. The data used by the chart before any transformation
       */
      callback: (racer: Race, data: Data[] | WideData[]) => void;
    }
  > {}

export const defaultProps: Props = {
  ...defaultOptions,
  data: undefined as unknown as Data[],
  dataUrl: undefined as unknown as string,
  dataType: undefined as unknown as 'json',
  elementId: undefined as unknown as string,
  className: undefined as unknown as string,
  style: undefined as unknown as Record<string, string>,
  callback: undefined as unknown as () => unknown,
};
