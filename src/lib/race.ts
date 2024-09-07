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

/**
 * The main function that generates the racing bar chart.
 *
 * @param {Data[] | WideData[] | Promise<Data[]> | Promise<WideData[]> | string} data
 * The data for the race visualization can be one of:
 * ```text
 * 1- Array of `Data` objects.
 * 2- Array of `WideData` objects.
 * 3- Promise that resolves to an array of `Data` objects.
 * 4- Promise that resolves to an array of `WideData` objects.
 * 5- String representing the file path to load the data from.
 * ```
 * @see {@link https://racing-bars.hatemhosny.dev/documentation/data/} for more information.
 *
 * @param {string | HTMLElement} [container] Optional. The container element or selector.
 * If not provided, a new `<div>` element will be created and appended to the document body.
 *
 * @param {Partial<Options>} [options={}] Optional. Configuration object for chart options. Defaults to an empty object.
 * @see {@link https://racing-bars.hatemhosny.dev/api/internal/interfaces/Options/} for detailed options.
 *
 * @returns {Promise<Race>} The function returns a promise that resolves to an object that allows interaction with the chart.
 *
 * @example
 * const data: Data[] | WideData[] | Promise<Data[]> | Promise<WideData[]> | string = [ ...fill with data... ];
 *
 * const container = document.getElementById('race-container');
 *
 * const options: Partial<Options>  = {
 *   width: 800,
 *   height: 400,
 * };
 *
 * const raceAPI = await race(data, container, options);
 *
 * raceAPI.play();
 *
 * @see {@link https://racing-bars.hatemhosny.dev/documentation/api#race} for more details.
 */
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
    [...subscriptions, ...apiSubscriptions].forEach((subscription) => {
      store.subscribe(subscription);
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
      if (!isNaN(Number(value))) value = 1;
      store.dispatch(actions.ticker.inc(Number(value)));
    },
    dec(value = 1) {
      if (!isNaN(Number(value))) value = 1;
      store.dispatch(actions.ticker.dec(Number(value)));
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
      store.dispatch(actions.data.addSelection(String(name)));
    },
    unselect(name: string) {
      d3.select(root)
        .select('rect.' + safeName(name))
        .classed('selected', false);
      store.dispatch(actions.data.removeSelection(String(name)));
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
        'makeCumulative',
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
      if (typeof fn !== 'function') {
        throw new Error('The second argument must be a function');
      }
      const dateString = getDateString(date);
      let lastDate = '';
      const watcher = addApiSubscription(() => {
        if (store.getState().ticker.currentDate === dateString && dateString !== lastDate) {
          lastDate = store.getState().ticker.currentDate; // avoid infinite loop if fn dispatches action
          fn(getTickDetails(store));
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
      if (typeof fn !== 'function') {
        throw new Error('The second argument must be a function');
      }
      const watcher = events.addApiEventHandler(event, () => {
        fn(getTickDetails(store));
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
