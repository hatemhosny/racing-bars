import * as d3 from './d3';
import { prepareData, computeNextDateSubscriber } from './data-utils';
import { getDateString } from './dates';
import { Data, WideData } from './data';
import { createRenderer, rendererSubscriber, Renderer } from './renderer';
import { createTicker } from './ticker';
import { styleInject } from './styles';
import { actions, createStore, rootReducer, Store } from './store';
import { Options } from './options';
import { registerEvents, DOMEventSubscriber } from './events';
import { safeName } from './utils';
import { Race } from './models';

export function race(data: Data[] | WideData[], options: Partial<Options> = {}): Race {
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error('No valid data supplied.');
  }

  const store = createStore(rootReducer);
  store.dispatch(actions.options.loadOptions(options));
  const ticker = createTicker(store);
  let preparedData = prepareData(data as Data[], store);
  let renderer = createRenderer(preparedData, store);

  const { selector, injectStyles, theme, autorun } = store.getState().options;

  const root = document.querySelector(selector) as HTMLElement;
  if (!root) throw new Error('No element found with the selector: ' + selector);

  subscribeToStore(store, renderer, preparedData);

  let stylesId: string;
  if (injectStyles) {
    stylesId = styleInject(selector, theme);
  }

  renderer.renderInitalView();
  ticker.start();
  if (!autorun) {
    ticker.stop();
  }

  let events = registerEvents(store, ticker);
  window.addEventListener('resize', resize);

  function subscribeToStore(store: Store, renderer: Renderer, data: Data[]) {
    store.subscribe(rendererSubscriber(store, renderer));
    store.subscribe(computeNextDateSubscriber(data, store));
    store.subscribe(DOMEventSubscriber(store));
  }

  function resize() {
    renderer.resize();
    events.unregister();
    events = registerEvents(store, ticker);
  }

  function changeOptions(newOptions: Partial<Options>) {
    const unAllowedOptions: Array<keyof Options> = ['selector', 'dataShape'];
    unAllowedOptions.forEach((key) => {
      if (newOptions[key] && newOptions[key] !== store.getState().options[key]) {
        throw new Error(`The option "${key}" cannot be changed.`);
      }
    });

    const dataOptions: Array<keyof Options> = [
      'dataTransform',
      'fillDateGapsInterval',
      'fillDateGapsValue',
      'startDate',
      'endDate',
      'fixedOrder',
    ];
    let dataOptionsChanged = false;
    dataOptions.forEach((key) => {
      if (newOptions[key] && newOptions[key] !== store.getState().options[key]) {
        dataOptionsChanged = true;
      }
    });

    store.dispatch(actions.options.changeOptions(newOptions));
    const { injectStyles, theme, autorun } = store.getState().options;

    if (dataOptionsChanged) {
      store.unsubscribeAll();
      store.dispatch(actions.data.clearDateSlices());
      preparedData = prepareData(data as Data[], store, true);
      renderer = createRenderer(preparedData, store);
      subscribeToStore(store, renderer, preparedData);
    }

    if ('injectStyles' in newOptions || 'theme' in newOptions) {
      document.getElementById(stylesId)?.remove();
      if (injectStyles) {
        stylesId = styleInject(selector, theme);
      }
    }

    renderer.renderInitalView();
    events.unregister();
    events = registerEvents(store, ticker);

    if (autorun) {
      const { isFirstDate, isRunning } = store.getState().ticker;
      if (isFirstDate && !isRunning) {
        ticker.start();
      }
    }
  }

  function destroy() {
    ticker.stop();
    store.unsubscribeAll();
    events.unregister();
    window.removeEventListener('resize', resize);
    root.innerHTML = '';
    document.getElementById(stylesId)?.remove();
    for (const method of Object.keys(API)) {
      API[method as keyof Race] = () => {
        throw new Error('Cannot perform this operation after calling destroy()');
      };
    }
  }

  const API = {
    // TODO: validate user input
    play: () => (!store.getState().ticker.isRunning ? ticker.start() : undefined),
    pause: () => ticker.stop(),
    toggle: () => ticker.toggle(),
    skipBack: () => ticker.skipBack(),
    skipForward: () => ticker.skipForward(),
    inc: (value = 1) => store.dispatch(actions.ticker.inc(+value)),
    dec: (value = 1) => store.dispatch(actions.ticker.dec(+value)),
    getDate: () => store.getState().ticker.currentDate,
    setDate: (inputDate: string | Date) =>
      store.dispatch(actions.ticker.updateDate(getDateString(inputDate))),
    getAllDates: () => [...store.getState().ticker.dates],
    isRunning: () => store.getState().ticker.isRunning,
    select: (name: string) => {
      d3.select(root)
        .select('rect.' + safeName(name))
        .classed('selected', true);
      store.dispatch(actions.data.addSelection(name));
    },
    unselect: (name: string) => {
      d3.select(root)
        .select('rect.' + safeName(name))
        .classed('selected', false);
      store.dispatch(actions.data.removeSelection(name));
    },
    unselectAll: () => {
      d3.select(root).selectAll('rect').classed('selected', false);
      store.dispatch(actions.data.resetSelections());
    },
    hideGroup: (group: string) => store.dispatch(actions.data.addFilter(String(group))),
    showGroup: (group: string) => store.dispatch(actions.data.removeFilter(String(group))),
    showOnlyGroup: (group: string) => store.dispatch(actions.data.allExceptFilter(String(group))),
    showAllGroups: () => store.dispatch(actions.data.resetFilters()),
    changeOptions,
    destroy,
  };

  return API;
}
