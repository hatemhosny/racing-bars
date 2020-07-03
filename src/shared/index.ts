import { loadData } from '..';

export function getData(props: any, elementId: string) {
  const selector = '#' + elementId;
  const { data, dataUrl, dataType, ...attr } = props;
  const options = { ...attr, selector };
  let dataPromise: any;
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
