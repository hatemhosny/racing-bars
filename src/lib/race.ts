import { fillGaps, getDateSlice, prepareData } from './data-utils';
import { filterDates, formatDate, getDateString, getDates } from './dates';
import { ControlButtons, Data, Options, RenderOptions, TickerOptions, LastValues } from './models';
import { createRenderer } from './renderer';
import { createTicker } from './ticker';
import * as styles from './styles';

export function race(data: Data[], options: Options = {}) {
  // ********************
  // User-defined options
  // ********************

  const dataShape = options.dataShape || 'long';
  const fillDateGaps = options.fillDateGaps;
  // const fillDateGapsValue = options.fillDateGapsValue || "last";
  const selector = options.selector || '#race';
  const startDate = options.startDate ? getDateString(options.startDate) : '';
  const endDate = options.endDate ? getDateString(options.endDate) : '';
  const colorSeed = options.colorSeed || '';
  const disableGroupColors = options.disableGroupColors || false;
  const tickDuration = Number(options.tickDuration) || 500;
  const topN = Number(options.topN) || 10;
  const disableClickEvents = options.disableClickEvents !== false;
  const disableKeyboardEvents = options.disableKeyboardEvents;
  const autorun = options.autorun !== false;
  const injectStyles = options.injectStyles !== false;

  const renderOptions: RenderOptions = {
    selector,
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
    topN,
  };

  const tickerOptions: TickerOptions = {
    loop: options.loop || false,
    tickDuration,
  };

  const element = document.querySelector(selector) as HTMLElement;
  if (!element) {
    throw new Error('Cannot find element with this selector: ' + selector);
  }

  if (injectStyles) {
    styles.styleInject(selector, 'top');
  }

  // ********************
  //  Stateful functions
  // ********************

  const renderer = createRenderer(selector, renderOptions);
  const ticker = createTicker(notifyRenderer);

  // ********************
  //   Create the chart
  // ********************

  let lastValues: LastValues;

  data = filterDates(data, startDate, endDate);
  data = prepareData(data, dataShape, disableGroupColors, colorSeed);

  const dates = getDates(data);

  if (fillDateGaps) {
    data = fillGaps(data, dates, fillDateGaps);
  }

  const tickerDate = ticker.tickerDateFactory(dates, tickerOptions, updateDate, renderFrame);

  let dateSlice: Data[];
  initialize();

  renderInitalView();
  renderFrame();

  ticker.start();

  if (!autorun) {
    ticker.stop();
  }

  if (!disableClickEvents) {
    registerClickEvents();
  }
  if (!disableKeyboardEvents) {
    registerKeyboardEvents();
  }

  window.addEventListener('resize', resize);

  // ********************
  //   Helper functions
  // ********************

  function renderInitalView() {
    element.innerHTML = '';
    renderer.renderInitalView(dateSlice);
    ticker.stop();
    const controlButtons = renderer.getControlButtons();
    registerControlButtonEvents(controlButtons);
  }

  function renderFrame() {
    renderer.renderFrame(dateSlice);
  }

  function notifyRenderer(running: boolean) {
    renderer.renderAsRunning(running);
  }

  function registerControlButtonEvents(controlButtons: ControlButtons) {
    if (!controlButtons) {
      return;
    }
    controlButtons.skipBack.addEventListener('click', ticker.rewind);
    controlButtons.play.addEventListener('click', ticker.toggle);
    controlButtons.pause.addEventListener('click', ticker.toggle);
    controlButtons.skipForward.addEventListener('click', ticker.fastForward);
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

  function updateDate(currentDate: string) {
    dateSlice = getDateSlice(data, tickerDate.getDate(), lastValues, topN);
    renderFrame();
    element.dispatchEvent(
      new CustomEvent('dateChanged', {
        detail: { date: formatDate(currentDate, 'YYYY-MM-DD') },
      }),
    );
  }

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
