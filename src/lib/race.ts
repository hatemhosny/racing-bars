import { prepareData } from './data-utils';
import { getDateString } from './dates';
import { Data, WideData } from './data';
import { createRenderer } from './renderer';
import { createTicker } from './ticker';
import { styleInject } from './styles';
import { actions, createStore, rootReducer } from './store';
import { Options, RequiredOptions } from './options';
import { registerEvents, DOMEventSubscriber } from './events';
import { createScroller } from './scroller';

export function race(data: Data[] | WideData[], options: Options | RequiredOptions) {
  const store = createStore(rootReducer);

  store.dispatch(actions.options.optionsLoaded(options));
  const { selector, injectStyles, theme, autorun } = store.getState().options;

  const root = document.querySelector(selector) as HTMLElement;
  if (!root) {
    throw new Error('Cannot find element with this selector: ' + selector);
  }

  if (injectStyles) {
    styleInject(selector, theme, 'top');
  }

  const preparedData = prepareData(data as Data[], store);

  const ticker = createTicker(store);

  const renderer = createRenderer(preparedData, store);
  renderer.renderInitalView();

  store.subscribe(renderer.renderFrame);
  store.subscribe(DOMEventSubscriber(store));

  ticker.start();

  if (!autorun) {
    ticker.stop();
  }

  registerEvents(store, ticker);
  window.addEventListener('resize', resize);

  function resize() {
    renderer.resize();
    registerEvents(store, ticker);
  }

  return {
    // TODO: validate user input
    start: () => {
      if (!store.getState().ticker.isRunning) {
        ticker.start();
      }
    },
    stop: () => {
      ticker.stop();
    },
    rewind: () => {
      ticker.skipBack();
    },
    fastforward: () => {
      ticker.skipForward();
    },
    loop: () => {
      ticker.loop();
    },
    inc: (value = 1) => {
      store.dispatch(actions.ticker.inc(value));
    },
    dec: (value = 1) => {
      store.dispatch(actions.ticker.dec(value));
    },
    getDate: () => store.getState().ticker.currentDate,
    setDate: (inputDate: string | Date) => {
      store.dispatch(actions.ticker.updateDate(getDateString(inputDate)));
    },
    getAllDates: () => [...store.getState().ticker.dates],
    createScroller: () => {
      createScroller(root, store);
    },
  };
}
