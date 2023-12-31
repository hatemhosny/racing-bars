import * as d3 from './d3';
import { getDateString, prepareData, computeNextDateSubscriber, safeName } from './utils';
import { Data, WideData } from './data';
import { createRenderer, rendererSubscriber, Renderer } from './renderer';
import { createTicker } from './ticker';
import { styleInject } from './styles';
import { actions, createStore, rootReducer, Store } from './store';
import { Options } from './options';
import { registerEvents, DOMEventSubscriber, getTickDetails, EventType } from './events';
import { Race, ApiMethod, ApiCallback } from './models';

export async function race(
  data: Data[] | WideData[] | Promise<Data[]> | Promise<WideData[]> | string,
  container: string | HTMLElement = 'body',
  options: Partial<Options> = {},
): Promise<Race> {
  // for backward compatibility
  if (
    typeof container === 'object' &&
    !(container instanceof HTMLElement) &&
    (!options || Object.keys(options).length === 0)
  ) {
    options = container;
    container = (options as any).selector || 'body';
  }

  const root =
    typeof container === 'string' ? document.querySelector<HTMLElement>(container) : container;
  if (!root) throw new Error('Container element is not found.');

  const store = createStore(rootReducer);
  store.dispatch(actions.container.setContainer({ element: root }));
  store.dispatch(actions.options.loadOptions(options));
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

  renderer.renderInitalView();
  ticker.start();
  if (!autorun) {
    ticker.stop();
  }

  const events = registerEvents(store, ticker);
  window.addEventListener('resize', resize);

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
    store.subscribe(fn);
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
      return API;
    },
    pause() {
      ticker.stop();
      return API;
    },
    toggle() {
      ticker.toggle();
      return API;
    },
    skipBack() {
      ticker.skipBack();
      return API;
    },
    skipForward() {
      ticker.skipForward();
      return API;
    },
    inc(value = 1) {
      store.dispatch(actions.ticker.inc(+value));
      return API;
    },
    dec(value = 1) {
      store.dispatch(actions.ticker.dec(+value));
      return API;
    },
    setDate(inputDate: string | Date) {
      store.dispatch(actions.ticker.updateDate(getDateString(inputDate)));
      return API;
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
      return API;
    },
    unselect(name: string) {
      d3.select(root)
        .select('rect.' + safeName(name))
        .classed('selected', false);
      store.dispatch(actions.data.removeSelection(name));
      return API;
    },
    unselectAll() {
      d3.select(root).selectAll('rect').classed('selected', false);
      store.dispatch(actions.data.resetSelections());
      return API;
    },
    hideGroup(group: string) {
      store.dispatch(actions.data.addFilter(String(group)));
      return API;
    },
    showGroup(group: string) {
      store.dispatch(actions.data.removeFilter(String(group)));
      return API;
    },
    showOnlyGroup(group: string) {
      store.dispatch(actions.data.allExceptFilter(String(group)));
      return API;
    },
    showAllGroups() {
      store.dispatch(actions.data.resetFilters());
      return API;
    },
    async changeOptions(newOptions: Partial<Options>) {
      const unAllowedOptions: Array<keyof Options> = ['dataShape'];
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
        preparedData = await prepareData(data, store, true);
        renderer = createRenderer(preparedData, store, root);
        subscribeToStore(store, renderer, preparedData);
      }

      if ('injectStyles' in newOptions || 'theme' in newOptions) {
        document.getElementById(stylesId)?.remove();
        if (injectStyles) {
          stylesId = styleInject(root, theme);
        }
      }

      renderer.renderInitalView();
      events.reregister();

      if (autorun) {
        const { isFirstDate, isRunning } = store.getState().ticker;
        if (isFirstDate && !isRunning) {
          ticker.start();
        }
      }

      return API;
    },
    call(fn: ApiCallback) {
      fn.call(API, getTickDetails(store));
      return API;
    },
    delay(duration = 0) {
      let queue: Array<{ fn: ApiMethod; args: unknown[] }> = [];
      let newQueue: Array<{ fn: ApiMethod; args: unknown[] }> = [];
      const originalMethods: any = {};
      let destroyCalled = false;

      for (const method of Object.keys(this)) {
        if (typeof this[method] !== 'function') continue;
        originalMethods[method] = this[method];
        this[method] = (...args: unknown[]) => {
          addToQueue(originalMethods[method], args);
          return API;
        };
      }

      function addToQueue(fn: ApiMethod, args: unknown[]) {
        if (!destroyCalled) {
          queue.push({ fn, args });
        } else {
          queue.push({ fn: destroyed, args: [] });
        }
        if (fn.name === 'destroy') {
          destroyCalled = true;
        }
      }

      function asValidNumber(duration: unknown) {
        return isNaN(Number(duration)) || Number(duration) < 0 ? 0 : Number(duration);
      }

      (function runQueue(dur: number) {
        setTimeout(() => {
          let queueItem = queue.shift();
          let newDuration = 0;
          while (queueItem) {
            if (queueItem.fn.name !== 'delay') {
              queueItem.fn(...queueItem.args);
            } else {
              newQueue = [...queue];
              queue = [];
              newDuration = asValidNumber(queueItem.args[0]);
            }
            queueItem = queue.shift();
          }

          if (newQueue.length > 0) {
            queue = [...newQueue];
            newQueue = [];
            runQueue(newDuration);
          } else {
            for (const method of Object.keys(originalMethods)) {
              this[method] = originalMethods[method];
            }
          }
        }, dur);
      })(asValidNumber(duration));

      return API;
    },
    onDate(date: string | Date, fn: ApiCallback) {
      const dateString = getDateString(date);
      let lastDate = '';
      addApiSubscription(() => {
        if (store.getState().ticker.currentDate === dateString && dateString !== lastDate) {
          lastDate = store.getState().ticker.currentDate; // avoid infinite loop if fn dispatches action
          fn.call(API, getTickDetails(store));
        }
        lastDate = store.getState().ticker.currentDate;
      });
      return API;
    },
    on(event: EventType, fn: ApiCallback) {
      events.addApiEventHandler(event, () => {
        fn.call(API, getTickDetails(store));
      });
      return API;
    },
    destroy() {
      ticker.stop();
      store.unsubscribeAll();
      events.unregister();
      window.removeEventListener('resize', resize);
      root.innerHTML = '';
      document.getElementById(stylesId)?.remove();
      for (const method of Object.keys(this)) {
        this[method] = destroyed;
      }
      return API;
    },
  };

  return API;
}
