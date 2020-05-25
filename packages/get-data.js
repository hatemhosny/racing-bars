import { loadData } from '../dist/racing-bars.esm';

export function getData(props, elementId) {
  const selector = '#' + elementId;
  let { data, dataUrl, ...attr } = props;
  const options = { selector, ...attr };
  let dataPromise;
  if (dataUrl && !data) {
    dataPromise = loadData(dataUrl);
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

function isPromise(p) {
  return Boolean(p && typeof p.then === 'function');
}
