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
  if (!root) {
    throw new Error('No element found with the selector: ' + selector);
  }

  subscribeToStore(store, renderer, preparedData);

  let stylesId: string;
  if (injectStyles) {
    stylesId = styleInject(selector, theme);
  }

  renderer.renderInitalView();
  ticker.start('loaded');
  if (!autorun) {
    ticker.stop('loaded');
  }

  let unRegisterEvents = registerEvents(store, ticker);
  window.addEventListener('resize', resize);

  function resize() {
    renderer.resize();
    unRegisterEvents();
    unRegisterEvents = registerEvents(store, ticker);
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
      store.unubscribeAll();
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
    unRegisterEvents();
    unRegisterEvents = registerEvents(store, ticker);

    if (autorun) {
      const { isFirstDate, isRunning } = store.getState().ticker;
      if (isFirstDate && !isRunning) {
        ticker.start('optionsChanged');
      }
    }
  }

  let destroyed = false;
  function destroy() {
    ticker.stop('destroy');
    store.unubscribeAll();
    unRegisterEvents();
    window.removeEventListener('resize', resize);
    root.innerHTML = '';
    document.getElementById(stylesId)?.remove();
    destroyed = true;
  }

  return {
    // TODO: validate user input
    play: () => {
      if (destroyed) return;
      if (!store.getState().ticker.isRunning) {
        ticker.start('apiStart');
      }
    },
    pause: () => {
      if (destroyed) return;
      ticker.stop('apiStop');
    },
    toggle: () => {
      if (destroyed) return;
      ticker.toggle('apiToggle');
    },
    skipBack: () => {
      if (destroyed) return;
      ticker.skipBack('apiSkipBack');
    },
    skipForward: () => {
      if (destroyed) return;
      ticker.skipForward('apiSkipForward');
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
    getAllDates: () => (destroyed ? [] : [...store.getState().ticker.dates]),
    isRunning: () => store.getState().ticker.isRunning,
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
    hideGroup: (group: string) => {
      if (destroyed) return;
      store.dispatch(actions.data.addFilter(group));
    },
    showGroup: (group: string) => {
      if (destroyed) return;
      store.dispatch(actions.data.removeFilter(group));
    },
    showOnlyGroup: (group: string) => {
      if (destroyed) return;
      store.dispatch(actions.data.allExceptFilter(group));
    },
    showAllGroups: () => {
      if (destroyed) return;
      store.dispatch(actions.data.resetFilters());
    },
    changeOptions: (newOptions: Partial<Options>) => {
      if (destroyed) return;
      changeOptions(newOptions);
    },
    destroy: () => {
      if (destroyed) return;
      destroy();
    },
  };
}

function subscribeToStore(store: Store, renderer: Renderer, data: Data[]) {
  store.subscribe(rendererSubscriber(store, renderer));
  store.subscribe(computeNextDateSubscriber(data, store));
  store.subscribe(DOMEventSubscriber(store));
}
