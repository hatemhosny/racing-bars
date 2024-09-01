import * as d3 from './d3';
import { getDateString, prepareData, computeNextDateSubscriber, safeName } from './utils';
import type { Data, WideData } from './data';
import { createRenderer, rendererSubscriber, type Renderer } from './renderer';
import { createTicker } from './ticker';
import { styleInject } from './styles';
import { actions, createStore, rootReducer, type Store } from './store';
import type { DataTransformType, Options, ParamFunction } from './options';
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

  validateOptions(options);

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

  renderer.renderInitialView();
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
      const unAllowedOptions: Array<keyof Options> = ['dataShape', 'dataType'];
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
      window.removeEventListener('resize', resize);
      root.innerHTML = '';
      document.getElementById(stylesId)?.remove();
      for (const method of Object.keys(this)) {
        this[method] = destroyed;
      }
    },
  };

  return API;
}

export function validateOptions(options: Partial<Options>): void {
  // Validate boolean options
  validateBooleanOpt('makeCumulative', options.makeCumulative);
  validateBooleanOpt('loop', options.loop);
  validateBooleanOpt('showIcons', options.showIcons);
  validateBooleanOpt('showGroups', options.showGroups);
  validateBooleanOpt('mouseControls', options.mouseControls);
  validateBooleanOpt('keyboardControls', options.keyboardControls);
  validateBooleanOpt('autorun', options.autorun);
  validateBooleanOpt('injectStyles', options.injectStyles);
  validateBooleanOpt('highlightBars', options.highlightBars);
  validateBooleanOpt('selectBars', options.selectBars);
  validateBooleanOpt('fixedScale', options.fixedScale);

  // Validate number options
  validateNumberOpt('labelsWidth', options.labelsWidth);
  validateNumberOpt('tickDuration', options.tickDuration);
  validateNumberOpt('topN', options.topN);
  validateNumberOpt('minHeight', options.minHeight);
  validateNumberOpt('minWidth', options.minWidth);
  validateNumberOpt('marginTop', options.marginTop);
  validateNumberOpt('marginRight', options.marginRight);
  validateNumberOpt('marginBottom', options.marginBottom);
  validateNumberOpt('marginLeft', options.marginLeft);

  // Validate string options
  validateStringOpt('theme', options.theme);
  validateStringOpt('startDate', options.startDate);
  validateStringOpt('endDate', options.endDate);

  // Validate string or number options
  validateStringOrNumberOpt('colorSeed', options.colorSeed);
  validateStringOrNumberOpt('inputHeight', options.inputHeight);
  validateStringOrNumberOpt('inputWidth', options.inputWidth);
  validateStringOrNumberOpt('height', options.height);
  validateStringOrNumberOpt('width', options.width);

  // Validate one of options
  const validDataShapes = ['long', 'wide'];
  validateOneOfOpt('dataShape', options.dataShape, validDataShapes);

  const validDataTypes = ['json', 'csv', 'tsv', 'xml'];
  validateOneOfOpt('dataType', options.dataType, validDataTypes);

  const validLabelsPositions = ['inside', 'outside'];
  validateOneOfOpt('labelsPosition', options.labelsPosition, validLabelsPositions);

  const validControlButtons = ['all', 'play', 'none'];
  validateOneOfOpt('controlButtons', options.controlButtons, validControlButtons);

  const validOverlays = ['all', 'play', 'repeat', 'none'];
  validateOneOfOpt('overlays', options.overlays, validOverlays);

  const validFillDateGapsIntervals = [null, 'year', 'month', 'day'];
  validateOneOfOpt(
    'fillDateGapsInterval',
    options.fillDateGapsInterval,
    validFillDateGapsIntervals,
  );

  const validFillDateGapsValues = ['last', 'interpolate'];
  validateOneOfOpt('fillDateGapsValue', options.fillDateGapsValue, validFillDateGapsValues);

  // Validate array of options
  validateIsArrayOfType('fixedOrder', options.fixedOrder, 'string');

  // Validate function or string options
  validateFuncOrStringOpt('title', options.title);
  validateFuncOrStringOpt('subTitle', options.subTitle);
  validateFuncOrStringOpt('dateCounter', options.dateCounter);
  validateFuncOrStringOpt('caption', options.caption);

  // Other validations
  validateColorMap(options.colorMap);
  validateDataTransform(options.dataTransform);
}

function validateBooleanOpt(label: string, value: boolean | undefined): void {
  if (typeof value !== 'undefined' && typeof value !== 'boolean') {
    throw new Error(`Invalid ${label}: ${value}. Must be a boolean.`);
  }
}

function validateStringOpt(label: string, value: string | undefined): void {
  if (value && typeof value !== 'string') {
    throw new Error(`Invalid ${label}: ${value}. Must be a string.`);
  }
}

function validateNumberOpt(label: string, value: number | undefined): void {
  if (typeof value !== 'undefined' && typeof value !== 'number') {
    throw new Error(`Invalid ${label}: ${value}. Must be a number.`);
  }
}

function validateStringOrNumberOpt(label: string, value: number | string | undefined): void {
  if (typeof value !== 'undefined' && typeof value !== 'number' && typeof value !== 'string') {
    throw new Error(`Invalid ${label}: ${value}. Must be a number or a string.`);
  }
}

function validateOneOfOpt(
  label: string,
  value: string | null | undefined,
  values: Array<string | null>,
): void {
  if (value && !values.includes(value)) {
    throw new Error(`Invalid ${label}: ${value}. Must be one of [${values.join(', ')}].`);
  }
}

function validateIsArrayOfType(label: string, value: any, type: string): void {
  if (typeof value === 'undefined') return;

  if (!Array.isArray(value)) {
    throw new Error(`Invalid ${label}: ${value}. Must be an array of '${type}'.`);
  }

  for (const item of value) {
    if (typeof item !== type) {
      throw new Error(`Invalid ${label}. All array items must be '${type}'. '${item}' is not.`);
    }
  }
}

function validateFuncOrStringOpt(label: string, value: string | ParamFunction | undefined): void {
  // TODO: validate params of function
  if (typeof value !== 'undefined' && typeof value !== 'string' && typeof value !== 'function') {
    throw new Error(`Invalid ${label}: ${value}. Must be a string or a function.`);
  }
}

function validateDataTransform(value: DataTransformType | undefined): void {
  // TODO: validate params of function
  if (typeof value !== 'undefined' && value !== null && typeof value !== 'function') {
    throw new Error(`Invalid dataTransform: ${value}. Must be a null or a function.`);
  }
}

function validateColorMap(value: string[] | { [key: string]: string } | undefined): void {
  if (typeof value === 'undefined') return;

  if (value === null) {
    throw new Error(`Invalid colorMap. It cannot be null.`);
  }

  if (typeof value !== 'object' && !Array.isArray(value)) {
    throw new Error(`Invalid colorMap: ${value}. Must be an object or an array.`);
  }

  if (Array.isArray(value)) {
    validateIsArrayOfType('colorMap', value, 'string');
    return;
  }

  for (const [k, v] of Object.entries(value)) {
    if (typeof k !== 'string') {
      throw new Error(`Invalid colorMap: { ${k}: ${v} }. All keys must be strings. '${k}' is not.`);
    }

    if (typeof v !== 'string') {
      throw new Error(
        `Invalid colorMap: { ${k}: ${v} }. All values must be strings. '${v}' is not.`,
      );
    }
  }
}
