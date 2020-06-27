import { loadData, Options, Data, WideData } from '..';

export function getData(props: Props, elementId: string) {
  const selector = '#' + elementId;
  const { data, dataUrl, dataType, ...attr } = props;
  const options = { ...attr, selector };
  let dataPromise: Promise<Data[]> | Promise<WideData[]>;
  if (dataUrl && !data) {
    dataPromise = loadData(dataUrl, dataType);
  } else if (isPromise(data)) {
    dataPromise = data as Promise<Data[]> | Promise<WideData[]>;
  } else {
    dataPromise = Promise.resolve(data as Data[] | WideData[]);
  }
  return {
    dataPromise,
    options,
  };
}

function isPromise(p: any) {
  return Boolean(p && typeof p.then === 'function');
}

export interface Props extends Partial<Options> {
  data?: Data[] | WideData[] | Promise<Data[]> | Promise<WideData[]>;
  dataUrl?: string;
  dataType?: 'json' | 'csv' | 'tsv' | 'xml';
  elementId?: string;
}
