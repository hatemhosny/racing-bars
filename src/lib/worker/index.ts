import { prepareData } from './prepare-data';

const worker: Worker = self as any as Worker;

worker.addEventListener('message', async (event) => {
  const { type, data, options } = event.data;
  if (type === 'prepare-data') {
    const result = await prepareData(data, options);
    worker.postMessage({ type: 'data-prepared', data: result });
  }
});
