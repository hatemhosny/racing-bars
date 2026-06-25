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
 * Creates a racing bar chart and returns its API object.
 *
 * This is the main function that generates the racing bar chart. It accepts data as an array,
 * a Promise, or a URL to a data file (JSON, CSV, TSV, XML), mounts the chart into the specified
 * container, and returns a {@link Race} object for runtime interaction.
 *
 * @param data - The chart data. Accepts an array of {@link Data} (long format) or {@link WideData} (wide format) objects,
 * a Promise resolving to one of the above, or a URL string pointing to a data file (the `dataType` option controls parsing).
 * @param container - The DOM element or CSS selector to mount the chart into.
 * If omitted, a new `<div>` is appended to `<body>`. Existing content inside the container is cleared.
 * @param options - Partial configuration options. See {@link Options} for all available settings.
 * @returns A Promise that resolves to the {@link Race} API object for controlling the chart.
 *
 * @example
 * ```ts
 * import { race } from 'racing-bars';
 * const racer = await race('/data/population.csv', '#race', {
 *   title: 'World Population',
 *   dataType: 'csv',
 * });
 * ```
 *
 * @see https://racing-bars.hatemhosny.dev/documentation/api
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
    /** Starts running the chart animation. No-op if already running. */
    play() {
      if (!store.getState().ticker.isRunning) {
        ticker.start();
      }
    },
    /** Pauses the chart at the current date. */
    pause() {
      ticker.stop();
    },
    /** Toggles between play and pause states. */
    toggle() {
      ticker.toggle();
    },
    /** Stops the chart and resets the date to the first date in the dataset. */
    skipBack() {
      ticker.skipBack();
    },
    /** Stops the chart and sets the date to the last date in the dataset. */
    skipForward() {
      ticker.skipForward();
    },
    /**
     * Advances the chart forward by the specified number of dates.
     * @param value - Number of dates to advance (default: 1).
     */
    inc(value = 1) {
      if (!isNaN(Number(value))) value = 1;
      store.dispatch(actions.ticker.inc(Number(value)));
    },
    /**
     * Moves the chart backward by the specified number of dates.
     * @param value - Number of dates to go back (default: 1).
     */
    dec(value = 1) {
      if (!isNaN(Number(value))) value = 1;
      store.dispatch(actions.ticker.dec(Number(value)));
    },
    /**
     * Sets the chart to a specific date.
     * @param inputDate - A date string (e.g. `'1960-01-01'`) or a JavaScript `Date` object.
     */
    setDate(inputDate: string | Date) {
      store.dispatch(actions.ticker.updateDate(getDateString(inputDate)));
    },
    /** Returns the current date as a `'YYYY-MM-DD'` string. */
    getDate() {
      return store.getState().ticker.currentDate;
    },
    /** Returns an array of all unique dates in the dataset, sorted ascending. */
    getAllDates() {
      return [...store.getState().ticker.dates];
    },
    /** Returns `true` if the chart is currently animating, `false` otherwise. */
    isRunning() {
      return store.getState().ticker.isRunning;
    },
    /**
     * Selects a bar by name, adding the CSS class `selected` to it.
     * @param name - The name of the bar to select.
     */
    select(name: string) {
      d3.select(root)
        .select('rect.' + safeName(name))
        .classed('selected', true);
      store.dispatch(actions.data.addSelection(String(name)));
    },
    /**
     * Unselects a previously selected bar by name.
     * @param name - The name of the bar to unselect.
     */
    unselect(name: string) {
      d3.select(root)
        .select('rect.' + safeName(name))
        .classed('selected', false);
      store.dispatch(actions.data.removeSelection(String(name)));
    },
    /** Unselects all bars. */
    unselectAll() {
      d3.select(root).selectAll('rect').classed('selected', false);
      store.dispatch(actions.data.resetSelections());
    },
    /**
     * Hides all bars belonging to the specified group.
     * @param group - The group name to hide.
     */
    hideGroup(group: string) {
      store.dispatch(actions.data.addFilter(String(group)));
    },
    /**
     * Shows bars of the specified group if they were previously hidden.
     * @param group - The group name to show.
     */
    showGroup(group: string) {
      store.dispatch(actions.data.removeFilter(String(group)));
    },
    /**
     * Hides all groups except the one specified.
     * @param group - The group name to keep visible.
     */
    showOnlyGroup(group: string) {
      store.dispatch(actions.data.allExceptFilter(String(group)));
    },
    /** Shows all groups (resets any group filters). */
    showAllGroups() {
      store.dispatch(actions.data.resetFilters());
    },
    /**
     * Changes chart options during runtime.
     *
     * Note: `dataShape` and `dataType` cannot be changed and will throw an error.
     * Options like `dataTransform`, `fillDateGapsInterval`, `startDate`, `endDate`,
     * `fixedOrder`, and `makeCumulative` trigger a full data re-process when changed.
     *
     * @param newOptions - A partial {@link Options} object with the options to update.
     * @throws {Error} If `dataShape` or `dataType` are included in `newOptions`.
     *
     * @example
     * ```ts
     * racer.changeOptions({ title: 'Updated Title', loop: true });
     * ```
     */
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
    /**
     * Registers a callback that fires when a specific date becomes the current date.
     *
     * @param date - The date to watch (string or `Date` object).
     * @param fn - Callback function receiving a {@link TickDetails} object.
     * @returns An object with a `remove()` method to unsubscribe the callback.
     *
     * @example
     * ```ts
     * const watcher = racer.onDate('1960-01-01', (details) => {
     *   console.log('1960 reached!', details);
     * });
     * // Later: watcher.remove();
     * ```
     */
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
    /**
     * Registers a callback for chart lifecycle events.
     *
     * @param event - The event type to listen for: `'dateChange'`, `'firstDate'`, `'lastDate'`, `'play'`, or `'pause'`.
     * @param fn - Callback function receiving a {@link TickDetails} object.
     * @returns An object with a `remove()` method to unsubscribe the callback.
     *
     * @example
     * ```ts
     * const watcher = racer.on('dateChange', ({ date }) => {
     *   console.log('Date changed to:', date);
     * });
     * // Later: watcher.remove();
     * ```
     */
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
    /**
     * Destroys the chart instance and cleans up all resources.
     *
     * Stops the ticker, unsubscribes all store listeners, unregisters DOM events,
     * clears the container content, and removes injected styles. After calling
     * this method, any subsequent calls to the chart API will throw an error.
     */
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
