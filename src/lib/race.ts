import * as d3 from './d3';
import { getDateString, prepareData, computeNextDateSubscriber, safeName } from './utils';
import type { Data, WideData } from './data';
import {
  createRenderer,
  createResizeObserver,
  rendererSubscriber,
  type Renderer,
} from './renderer';
import { createTicker } from './ticker';
import { styleInject } from './styles';
import { actions, createStore, rootReducer, type Store } from './store';
import { type Options, validateOptions } from './options';
import { registerEvents, DOMEventSubscriber, getTickDetails, type EventType } from './events';
import type { Race, ApiCallback } from './models';

export async function race(
  data: Data[] | WideData[] | Promise<Data[]> | Promise<WideData[]> | string,
  container?: string | HTMLElement,
  options: Partial<Options> = {},
): Promise<Race> {
  // for backward compatibility
  if (
    typeof container === 'object' &&
    !(container instanceof HTMLElement) &&
    (!options || Object.keys(options).length === 0)
  ) {
    options = container;
    container = (options as any).selector;
  }

  if (!container) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    container = div;
  }

  const root =
    typeof container === 'string' ? document.querySelector<HTMLElement>(container) : container;
  if (!root) throw new Error('Container element is not found.');

  const validOptions = validateOptions(options);

  const store = createStore(rootReducer);
  store.dispatch(actions.container.setContainer({ element: root }));
  store.dispatch(actions.options.loadOptions(validOptions));
  const ticker = createTicker(store);
  let preparedData = await prepareData(data, store);
  let renderer = createRenderer(preparedData, store, root);

  const { injectStyles, theme, autorun } = store.getState().options;

  const apiSubscriptions: Array<() => void> = [];
  subscribeToStore(store, renderer, preparedData);

  let stylesId: string;
  if (injectStyles) {
    stylesId = styleInject(root, theme);
  }

  renderer.renderInitialView();
  ticker.start();
  if (!autorun) {
    ticker.stop();
  }

  const events = registerEvents(store, ticker);
  const resizeObserver = createResizeObserver(resize);
  resizeObserver?.observe(root);

  function subscribeToStore(store: Store, renderer: Renderer, data: Data[]) {
    const subscriptions = [
      rendererSubscriber(store, renderer),
      computeNextDateSubscriber(data, store),
      DOMEventSubscriber(store),
    ];
    [...subscriptions, ...apiSubscriptions].forEach((subcsription) => {
      store.subscribe(subcsription);
    });
  }

  function addApiSubscription(fn: () => void) {
    apiSubscriptions.push(fn);
    return store.subscribe(fn);
  }

  function resize() {
    renderer.resize();
    events.reregister();
  }

  function destroyed() {
    throw new Error('Cannot perform this operation after calling destroy()');
  }

  const API = {
    // TODO: validate user input
    play() {
      if (!store.getState().ticker.isRunning) {
        ticker.start();
      }
    },
    pause() {
      ticker.stop();
    },
    toggle() {
      ticker.toggle();
    },
    skipBack() {
      ticker.skipBack();
    },
    skipForward() {
      ticker.skipForward();
    },
    inc(value = 1) {
      store.dispatch(actions.ticker.inc(+value));
    },
    dec(value = 1) {
      store.dispatch(actions.ticker.dec(+value));
    },
    setDate(inputDate: string | Date) {
      store.dispatch(actions.ticker.updateDate(getDateString(inputDate)));
    },
    getDate() {
      return store.getState().ticker.currentDate;
    },
    getAllDates() {
      return [...store.getState().ticker.dates];
    },
    isRunning() {
      return store.getState().ticker.isRunning;
    },
    select(name: string) {
      d3.select(root)
        .select('rect.' + safeName(name))
        .classed('selected', true);
      store.dispatch(actions.data.addSelection(name));
    },
    unselect(name: string) {
      d3.select(root)
        .select('rect.' + safeName(name))
        .classed('selected', false);
      store.dispatch(actions.data.removeSelection(name));
    },
    unselectAll() {
      d3.select(root).selectAll('rect').classed('selected', false);
      store.dispatch(actions.data.resetSelections());
    },
    hideGroup(group: string) {
      store.dispatch(actions.data.addFilter(String(group)));
    },
    showGroup(group: string) {
      store.dispatch(actions.data.removeFilter(String(group)));
    },
    showOnlyGroup(group: string) {
      store.dispatch(actions.data.allExceptFilter(String(group)));
    },
    showAllGroups() {
      store.dispatch(actions.data.resetFilters());
    },
    async changeOptions(newOptions: Partial<Options>) {
      const newValidOptions = validateOptions(newOptions);

      const unAllowedOptions: Array<keyof Options> = ['dataShape', 'dataType'];
      unAllowedOptions.forEach((key) => {
        if (newValidOptions[key] && newValidOptions[key] !== store.getState().options[key]) {
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
        if (newValidOptions[key] && newValidOptions[key] !== store.getState().options[key]) {
          dataOptionsChanged = true;
        }
      });

      store.dispatch(actions.options.changeOptions(newValidOptions));
      const { injectStyles, theme, autorun } = store.getState().options;

      if (dataOptionsChanged) {
        store.unsubscribeAll();
        store.dispatch(actions.data.clearDateSlices());
        preparedData = await prepareData(data, store, true);
        renderer = createRenderer(preparedData, store, root);
        subscribeToStore(store, renderer, preparedData);
      }

      if ('injectStyles' in newValidOptions || 'theme' in newValidOptions) {
        document.getElementById(stylesId)?.remove();
        if (injectStyles) {
          stylesId = styleInject(root, theme);
        }
      }

      renderer.renderInitialView();
      events.reregister();

      if (autorun) {
        const { isFirstDate, isRunning } = store.getState().ticker;
        if (isFirstDate && !isRunning) {
          ticker.start();
        }
      }
    },
    onDate(date: string | Date, fn: ApiCallback) {
      const dateString = getDateString(date);
      let lastDate = '';
      const watcher = addApiSubscription(() => {
        if (store.getState().ticker.currentDate === dateString && dateString !== lastDate) {
          lastDate = store.getState().ticker.currentDate; // avoid infinite loop if fn dispatches action
          fn.call(API, getTickDetails(store));
        }
        lastDate = store.getState().ticker.currentDate;
      });
      return {
        remove() {
          watcher.unsubscribe();
        },
      };
    },
    on(event: EventType, fn: ApiCallback) {
      const watcher = events.addApiEventHandler(event, () => {
        fn.call(API, getTickDetails(store));
      });
      return {
        remove() {
          watcher.remove();
        },
      };
    },
    destroy() {
      ticker.stop();
      store.unsubscribeAll();
      events.unregister();
      resizeObserver?.unobserve(root);
      root.innerHTML = '';
      document.getElementById(stylesId)?.remove();
      for (const method of Object.keys(this)) {
        this[method] = destroyed;
      }
    },
  };

  return API;
}
