import { fillGaps, getDateSlice, prepareData } from './data-utils';
import { filterDates, formatDate, getDateString, getDates } from './dates';
import { Data, Options } from './models';
import { renderInitalView, renderFrame, resize } from './render';
import {
  tickerDateFactory,
  startTicker,
  stopTicker,
  rewindTicker,
  fastForwardTicker,
  toggle,
  loopTicker
} from './ticker';

export function race(data: Data[], options: Options = {}) {
  const dataShape = options.dataShape || 'long';
  const fillDateGaps = options.fillDateGaps;
  // const fillDateGapsValue = options.fillDateGapsValue || "last";
  const selector = options.selector || '#race';
  const startDate = options.startDate ? getDateString(options.startDate) : '';
  const endDate = options.endDate ? getDateString(options.endDate) : '';
  const loop = options.loop || false;
  const colorSeed = options.colorSeed || '';
  const disableGroupColors = options.disableGroupColors || false;
  const tickDuration = Number(options.tickDuration) || 500;
  const topN = Number(options.topN) || 10;
  const disableClickEvents = options.disableClickEvents || true;
  const disableKeyboardEvents = options.disableKeyboardEvents;
  const autorun = options.autorun !== false;

  const renderOptions = {
    title: options.title || '18 years of Top Global Brands',
    subTitle: options.subTitle || 'Brand value, $m',
    caption: options.caption || 'Source: Interbrand',
    dateCounterFormat: options.dateCounterFormat || 'YYYY',
    labelsOnBars: options.labelsOnBars !== false,
    labelsWidth: options.labelsWidth || 100,
    showControls: options.showControls || 'all',
    inputHeight: options.height,
    inputWidth: options.width,
    minHeight: 300,
    minWidth: 500,
    tickDuration,
    topN
  };

  const element = document.querySelector(selector) as HTMLElement;
  let lastValues: any;

  data = filterDates(data, startDate, endDate);
  data = prepareData(data, dataShape, disableGroupColors, colorSeed);

  if (fillDateGaps) {
    data = fillGaps(data, getDates(data), fillDateGaps);
  }

  const tickerDate = tickerDateFactory(
    getDates(data),
    tickDuration,
    loop,
    selector,
    updateDateSlice,
    runRenderFrame
  );

  let dateSlice: Data[];
  initialize();

  runRenderInitalView();
  runRenderFrame();

  startTicker();

  if (!autorun) {
    stopTicker();
  }

  if (!disableClickEvents) {
    registerClickEvents();
  }
  if (!disableKeyboardEvents) {
    registerKeyboardEvents();
  }

  window.addEventListener('resize', runResize);

  function runRenderInitalView() {
    const controlFns = {
      rewindTicker,
      toggle,
      fastForwardTicker
    };

    renderInitalView(
      selector,
      dateSlice,
      renderOptions,
      tickerDate.getDate,
      controlFns,
      tickerDate.setRunning
    );
  }

  function runRenderFrame() {
    renderFrame(dateSlice, renderOptions, tickerDate.getDate);
  }

  function runResize() {
    resize(element, renderOptions, reset);

    function reset() {
      const currentlyRunning = tickerDate.isRunning();
      stopTicker();
      element.innerHTML = '';
      tickerDate.update();
      runRenderInitalView();

      if (currentlyRunning) {
        startTicker();
      }
    }
  }

  function updateDateSlice(currentDate: string) {
    dateSlice = getDateSlice(data, tickerDate.getDate(), lastValues, topN);
    runRenderFrame();
    element.dispatchEvent(
      new CustomEvent('dateChanged', {
        detail: { date: formatDate(currentDate, 'YYYY-MM-DD') }
      })
    );
  }

  function initialize() {
    initializeLastValues();
    tickerDate.setFirst();

    function initializeLastValues() {
      lastValues = {};
      data.forEach(d => {
        d.lastValue = d.value;
        if (!lastValues[d.name] || d.date < lastValues[d.name].date) {
          lastValues[d.name] = {
            date: d.date,
            value: d.value
          };
        }
      });
    }
  }

  function createScroller() {
    prepareDOM();

    const dates = tickerDate.getDates();
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
        tickerDate.set(dates[index]);
      } else {
        tickerDate.setLast();
      }
    }
  }

  function registerClickEvents() {
    const svg = element.querySelector('svg') as SVGSVGElement;
    svg.addEventListener('click', toggle);

    element.addEventListener('dblclick', fastForwardTicker);
  }

  function registerKeyboardEvents() {
    document.addEventListener('keypress', function(e) {
      const keyCodes = {
        spacebar: 32,
        a: 97,
        d: 100,
        s: 115
      };

      // TODO: keyCode is deprecated
      switch (e.keyCode) {
        case keyCodes.spacebar:
          toggle();
          break;
        case keyCodes.a:
          rewindTicker();
          break;
        case keyCodes.s:
          toggle();
          break;
        case keyCodes.d:
          fastForwardTicker();
          break;
      }
    });
  }

  return {
    // TODO: validate user input
    start: () => {
      if (!tickerDate.isRunning()) {
        startTicker();
      }
    },
    stop: () => {
      stopTicker();
    },
    rewind: () => {
      rewindTicker();
    },
    fastforward: () => {
      fastForwardTicker();
    },
    loop: () => {
      loopTicker();
    },
    inc: (value = 1) => {
      tickerDate.inc(value);
    },
    dec: (value = 1) => {
      tickerDate.dec(value);
    },
    getCurrentDate: () => tickerDate.getDate(),
    getDates: () => tickerDate.getDates().map((date: string) => formatDate(date, 'YYYY-MM-DD')),
    setDate: (inputDate: string | Date) => {
      tickerDate.set(getDateString(inputDate));
    },
    createScroller: () => {
      createScroller();
    }
  };
}
