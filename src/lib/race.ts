import { fillGaps, prepareData } from './data-utils';
import { filterDates, formatDate, getDateString, getDates } from './dates';
import { Controls, Data, LastValues, Overlays } from './models';
import { createRenderer } from './renderer';
import { createTicker } from './ticker';
import * as styles from './styles';
import { actions, store, state } from './store';
import { Options } from './options';

export function race(data: Data[], options: Options) {
  store.dispatch(actions.options.optionsLoaded(options));

  const element = document.querySelector(state.options.selector) as HTMLElement;
  if (!element) {
    throw new Error('Cannot find element with this selector: ' + state.options.selector);
  }

  if (state.options.injectStyles) {
    styles.styleInject(state.options.selector, 'top');
  }

  // ********************
  //  Stateful functions
  // ********************

  const renderer = createRenderer();
  const ticker = createTicker();

  // ********************
  //   Create the chart
  // ********************

  let lastValues: LastValues;

  data = filterDates(data, state.options.startDate, state.options.endDate);
  data = prepareData(data, state.options);

  const dates = getDates(data);

  if (state.options.fillDateGaps) {
    data = fillGaps(data, dates, state.options.fillDateGaps);
  }

  const tickerDate = ticker.tickerDateFactory();

  // let dateSlice: Data[];
  initialize();

  renderInitalView();
  renderFrame();

  ticker.start();

  if (!state.options.autorun) {
    ticker.stop();
  }

  if (!state.options.disableClickEvents) {
    registerClickEvents();
  }
  if (!state.options.disableKeyboardEvents) {
    registerKeyboardEvents();
  }

  window.addEventListener('resize', resize);

  // ********************
  //   Helper functions
  // ********************

  function renderInitalView() {
    element.innerHTML = '';
    renderer.renderInitalView();
    ticker.stop();
    const controls = renderer.getControls();
    registerControlButtonEvents(controls);
    registerOverlayEvents(controls);
  }

  function renderFrame() {
    renderer.renderFrame();
  }

  // function notifyRenderer(running: boolean, position: 'first' | 'last' | '') {
  //   renderer.updateControls(running, position);
  // }

  function registerControlButtonEvents(controls: Controls) {
    if (!controls) {
      return;
    }
    controls.skipBack.addEventListener('click', ticker.rewind);
    controls.play.addEventListener('click', ticker.toggle);
    controls.pause.addEventListener('click', ticker.toggle);
    controls.skipForward.addEventListener('click', ticker.fastForward);
  }

  function registerOverlayEvents(controls: Overlays) {
    if (!controls) {
      return;
    }
    controls.overlayPlay.addEventListener('click', ticker.start);
    controls.overlayRepeat.addEventListener('click', () => {
      ticker.rewind();
      ticker.start();
    });
  }

  function resize() {
    renderer.resize(reset);

    function reset() {
      const currentlyRunning = ticker.isRunning();
      tickerDate.update();
      renderInitalView();

      if (currentlyRunning) {
        ticker.start();
      }
    }
  }

  // function updateDate(currentDate: string) {
  //   dateSlice = getDateSlice(data, tickerDate.getDate(), lastValues, topN);
  //   renderFrame();
  //   element.dispatchEvent(
  //     new CustomEvent('dateChanged', {
  //       detail: { date: formatDate(currentDate, 'YYYY-MM-DD') },
  //     }),
  //   );
  // }

  function initialize() {
    initializeLastValues();
    tickerDate.setFirst();

    function initializeLastValues() {
      lastValues = {};
      data.forEach((d) => {
        d.lastValue = d.value;
        if (!lastValues[d.name] || d.date < lastValues[d.name].date) {
          lastValues[d.name] = {
            date: d.date,
            value: d.value,
          };
        }
      });
    }
  }

  function createScroller() {
    prepareDOM();

    const step = document.body.clientHeight / dates.length;

    subscribeToEvents();

    function prepareDOM() {
      element.style.position = 'fixed';
      element.style.top = '0';

      const scrollElement = document.createElement('div');
      scrollElement.style.height = window.innerHeight * 10 + 'px';
      document.body.appendChild(scrollElement);
    }

    function subscribeToEvents() {
      window.addEventListener('scroll', goToDate);
      // element.addEventListener("dateChanged", scrollToPosition);
    }

    // function scrollToPosition(e: CustomEvent) {
    //   let currentDate = getDateString(e.detail.date);
    //   let index = dates.indexOf(currentDate);
    //   ignoreNextScrollEvent = true;
    //   window.scroll({
    //     top: index * step,
    //     behavior: "smooth",
    //   });
    // }

    function goToDate() {
      const index = Math.ceil(window.pageYOffset / step);
      if (index < dates.length) {
        tickerDate.setDate(dates[index]);
      } else {
        tickerDate.setLast();
      }
    }
  }

  function registerClickEvents() {
    const svg = element.querySelector('svg') as SVGSVGElement;
    svg.addEventListener('click', ticker.toggle);
    element.addEventListener('dblclick', ticker.fastForward);
  }

  function registerKeyboardEvents() {
    document.addEventListener('keypress', function (e) {
      const keyCodes = {
        spacebar: 32,
        a: 97,
        d: 100,
        s: 115,
      };

      // TODO: keyCode is deprecated
      switch (e.keyCode) {
        case keyCodes.spacebar:
          ticker.toggle();
          break;
        case keyCodes.a:
          ticker.rewind();
          break;
        case keyCodes.s:
          ticker.toggle();
          break;
        case keyCodes.d:
          ticker.fastForward();
          break;
      }
    });
  }

  // ********************
  //      Public API
  // ********************

  return {
    // TODO: validate user input
    start: () => {
      if (!ticker.isRunning()) {
        ticker.start();
      }
    },
    stop: () => {
      ticker.stop();
    },
    rewind: () => {
      ticker.rewind();
    },
    fastforward: () => {
      ticker.fastForward();
    },
    loop: () => {
      ticker.loop();
    },
    inc: (value = 1) => {
      tickerDate.inc(value);
    },
    dec: (value = 1) => {
      tickerDate.dec(value);
    },
    getDate: () => tickerDate.getDate(),
    setDate: (inputDate: string | Date) => {
      tickerDate.setDate(getDateString(inputDate));
    },
    getAllDates: () => dates.map((date: string) => formatDate(date, 'YYYY-MM-DD')),
    createScroller: () => {
      createScroller();
    },
  };
}
