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

  /**
   * API for controlling the ticker.
   */
  const API = {
    /**
     * Starts the ticker if it is not already running.
     */
    play() {
      if (store.getState().ticker.isRunning) return;
      ticker.start();
    },

    /**
     * Pauses the ticker.
     */
    pause() {
      ticker.stop();
    },

    /**
     * Toggles the ticker between running and paused states.
     */
    toggle() {
      ticker.toggle();
    },

    /**
     * Skips the ticker back by one step.
     */
    skipBack() {
      ticker.skipBack();
    },

    /**
     * Skips the ticker forward by one step.
     */
    skipForward() {
      ticker.skipForward();
    },

    /**
     * Increments the ticker by a specified value.
     * @param {number} [value=1] - The value to increment by.
     */
    inc(value = 1) {
      if (!isNaN(Number(value))) value = 1;
      store.dispatch(actions.ticker.inc(Number(value)));
    },

    /**
     * Decrements the ticker by a specified value.
     * @param {number} [value=1] - The value to decrement by.
     */
    dec(value = 1) {
      if (!isNaN(Number(value))) value = 1;
      store.dispatch(actions.ticker.dec(Number(value)));
    },

    /**
     * Sets the ticker to a specific date.
     * @param {string | Date} inputDate - The date to set the ticker to.
     */
    setDate(inputDate: string | Date) {
      store.dispatch(actions.ticker.updateDate(getDateString(inputDate)));
    },

    /**
     * Gets the current date of the ticker.
     * @returns {string | Date} The current date.
     */
    getDate() {
      return store.getState().ticker.currentDate;
    },

    /**
     * Gets all dates available in the ticker.
     * @returns {Array<string | Date>} An array of all dates.
     */
    getAllDates() {
      return [...store.getState().ticker.dates];
    },

    /**
     * Checks if the ticker is currently running.
     * @returns {boolean} True if the ticker is running, false otherwise.
     */
    isRunning() {
      return store.getState().ticker.isRunning;
    },

    /**
     * Selects a specific item by name.
     * @param {string} name - The name of the item to select.
     */
    select(name: string) {
      d3.select(root)
        .select('rect.' + safeName(name))
        .classed('selected', true);
      store.dispatch(actions.data.addSelection(String(name)));
    },

    /**
     * Unselects a specific item by name.
     * @param {string} name - The name of the item to unselect.
     */
    unselect(name: string) {
      d3.select(root)
        .select('rect.' + safeName(name))
        .classed('selected', false);
      store.dispatch(actions.data.removeSelection(String(name)));
    },

    /**
     * Unselects all items.
     */
    unselectAll() {
      d3.select(root).selectAll('rect').classed('selected', false);
      store.dispatch(actions.data.resetSelections());
    },

    /**
     * Hides a specific group.
     * @param {string} group - The name of the group to hide.
     */
    hideGroup(group: string) {
      store.dispatch(actions.data.addFilter(String(group)));
    },

    /**
     * Shows a specific group.
     * @param {string} group - The name of the group to show.
     */
    showGroup(group: string) {
      store.dispatch(actions.data.removeFilter(String(group)));
    },

    /**
     * Shows only a specific group, hiding all others.
     * @param {string} group - The name of the group to show only.
     */
    showOnlyGroup(group: string) {
      store.dispatch(actions.data.allExceptFilter(String(group)));
    },

    /**
     * Shows all groups.
     */
    showAllGroups() {
      store.dispatch(actions.data.resetFilters());
    },

    /**
     * Changes the options of the ticker.
     * @param {Partial<Options>} newOptions - The new options to apply.
     * @throws Will throw an error if an option cannot be changed.
     */
    async changeOptions(newOptions: Partial<Options>) {
      /**
       * Validates and changes the options of the ticker.
       *
       * First:
       * validates the provided options using the `validateOptions` function.
       * It then checks for any options that are not allowed to be changed, specifically `dataShape`
       * and `dataType`. If any of these options are attempted to be changed, an error is thrown.
       *
       * Second:
       * it checks if any data-related options have changed. If so, it clears the current
       * date slices and prepares new data before creating a new renderer.
       *
       * Third:
       * it handles style injection and theme changes, and re-renders the initial view.
       * If autorun is enabled and the ticker is at the first date, it starts the ticker.
       */
      const newValidOptions = validateOptions(newOptions);

      // First
      const unAllowedOptions: Array<keyof Options> = ['dataShape', 'dataType'];
      unAllowedOptions.forEach((key) => {
        if (newValidOptions[key] && newValidOptions[key] !== store.getState().options[key]) {
          throw new Error(`The option "${key}" cannot be changed.`);
        }
      });

      // Second
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

      // Third
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
     * Sets a callback function to be called when the ticker reaches a specific date.
     * @param {string | Date} date - The date to watch for.
     * @param {ApiCallback} fn - The callback function to execute.
     * @returns {Object} An object with a remove method to unsubscribe.
     * @throws Will throw an error if the second argument is not a function.
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
     * Sets a callback function to be called when a specific event occurs.
     * @param {EventType} event - The event type to listen for.
     * @param {ApiCallback} fn - The callback function to execute.
     * @returns {Object} An object with a remove method to unsubscribe.
     * @throws Will throw an error if the second argument is not a function.
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
     * Destroys the API, stopping the ticker and cleaning up resources.
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
