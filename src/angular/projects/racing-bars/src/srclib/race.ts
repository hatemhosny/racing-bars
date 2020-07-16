import * as d3 from './d3';
import { prepareData, computeNextDateSubscriber } from './data-utils';
import { getDateString } from './dates';
import { Data, WideData } from './data';
import { createRenderer, rendererSubscriber } from './renderer';
import { createTicker } from './ticker';
import { styleInject } from './styles';
import { actions, createStore, rootReducer } from './store';
import { Options } from './options';
import { registerEvents, DOMEventSubscriber } from './events';
import { createScroller } from './scroller';
import { safeName } from './utils';
import { Race } from './models';

export function race(data: Data[] | WideData[], options: Partial<Options> = {}): Race {
  const store = createStore(rootReducer);

  store.dispatch(actions.options.optionsLoaded(options));
  const { selector, injectStyles, theme, autorun } = store.getState().options;

  const root = document.querySelector(selector) as HTMLElement;
  if (!root) {
    return (undefined as unknown) as Race;
  }

  if (injectStyles) {
    styleInject(selector, theme, 'top');
  }

  const preparedData = prepareData(data as Data[], store);

  const ticker = createTicker(store);

  const renderer = createRenderer(preparedData, store);
  renderer.renderInitalView();

  store.subscribe(rendererSubscriber(store, renderer));
  store.subscribe(computeNextDateSubscriber(preparedData, store)); // compute and cache next date
  store.subscribe(DOMEventSubscriber(store));

  ticker.start('loaded');

  if (!autorun) {
    ticker.stop('loaded');
  }

  registerEvents(store, ticker);
  window.addEventListener('resize', resize);

  function resize() {
    renderer.resize();
    registerEvents(store, ticker);
  }

  let destroyed = false;
  function destroy() {
    ticker.stop('destroy');
    store.unubscribeAll();
    window.removeEventListener('resize', resize);
    root.innerHTML = '';
    destroyed = true;
  }

  return {
    // TODO: validate user input
    start: () => {
      if (destroyed) return;
      if (!store.getState().ticker.isRunning) {
        ticker.start('apiStart');
      }
    },
    stop: () => {
      if (destroyed) return;
      ticker.stop('apiStop');
    },
    rewind: () => {
      if (destroyed) return;
      ticker.skipBack('apiSkipBack');
    },
    fastforward: () => {
      if (destroyed) return;
      ticker.skipForward('apiSkipForward');
    },
    loop: () => {
      if (destroyed) return;
      ticker.loop();
    },
    inc: (value = 1) => {
      if (destroyed) return;
      store.dispatch(actions.ticker.inc('apiInc', value));
    },
    dec: (value = 1) => {
      if (destroyed) return;
      store.dispatch(actions.ticker.dec('apiDec', value));
    },
    getDate: () => (destroyed ? '' : store.getState().ticker.currentDate),
    setDate: (inputDate: string | Date) => {
      if (destroyed) return;
      store.dispatch(actions.ticker.updateDate(getDateString(inputDate), 'apiSetDate'));
    },
    getAllDates: () => (destroyed ? [''] : [...store.getState().ticker.dates]),
    createScroller: () => {
      if (destroyed) return;
      createScroller(root, store);
    },
    selections: {
      select: (name: string) => {
        if (destroyed) return;
        d3.select(root)
          .select('rect.' + safeName(name))
          .classed('selected', true);
        store.dispatch(actions.data.addSelection(name));
      },
      unselect: (name: string) => {
        if (destroyed) return;
        d3.select(root)
          .select('rect.' + safeName(name))
          .classed('selected', false);
        store.dispatch(actions.data.removeSelection(name));
      },
      unselectAll: () => {
        if (destroyed) return;
        d3.select(root).selectAll('rect').classed('selected', false);
        store.dispatch(actions.data.resetSelections());
      },
    },
    groups: {
      hide: (group: string) => {
        if (destroyed) return;
        store.dispatch(actions.data.addFilter(group));
      },
      show: (group: string) => {
        if (destroyed) return;
        store.dispatch(actions.data.removeFilter(group));
      },
      showOnly: (group: string) => {
        if (destroyed) return;
        store.dispatch(actions.data.allExceptFilter(group));
      },
      showAll: () => {
        if (destroyed) return;
        store.dispatch(actions.data.resetFilters());
      },
    },
    destroy: () => {
      if (destroyed) return;
      destroy();
    },
  };
}
