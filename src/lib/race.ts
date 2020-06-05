import { prepareData } from './data-utils';
import { getDates } from './dates';
import { Data } from './models';
// import { formatDate, getDateString, getDates } from './dates';
// import { Controls, Data, Overlays } from './models';
import { createRenderer } from './renderer';
import { createTicker } from './ticker';
import * as styles from './styles';
import { actions, store } from './store';
import { Options } from './options';
import { addEventHandler } from './utils';
import { elements } from './elements';

export function race(data: Data[], options: Options) {
  store.dispatch(actions.options.optionsLoaded(options));

  const element = document.querySelector(store.getState().options.selector) as HTMLElement;
  if (!element) {
    throw new Error('Cannot find element with this selector: ' + store.getState().options.selector);
  }

  if (store.getState().options.injectStyles) {
    styles.styleInject(store.getState().options.selector, 'top');
  }

  data = prepareData(data);

  const dates = getDates(data);

  const ticker = createTicker(dates);

  const renderer = createRenderer(data);
  renderer.renderInitalView();
  store.subscribe(renderer.renderFrame);
  ticker.start();

  if (!store.getState().options.autorun) {
    ticker.stop();
  }

  registerEvents();

  function registerEvents() {
    if (!store.getState().options.disableClickEvents) {
      registerClickEvents();
    }
    if (!store.getState().options.disableKeyboardEvents) {
      registerKeyboardEvents();
    }
    registerControlButtonEvents();
    registerOverlayEvents();

    window.addEventListener('resize', resize);
  }

  function registerControlButtonEvents() {
    addEventHandler(elements.skipBack, 'click', ticker.skipBack);
    addEventHandler(elements.play, 'click', ticker.toggle);
    addEventHandler(elements.pause, 'click', ticker.toggle);
    addEventHandler(elements.skipForward, 'click', ticker.skipForward);
  }

  function registerOverlayEvents() {
    addEventHandler(elements.overlayPlay, 'click', ticker.start);
    addEventHandler(elements.overlayRepeat, 'click', () => {
      ticker.skipBack();
      ticker.start();
    });
  }

  function resize() {
    renderer.resize();
    registerEvents();
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

  // function createScroller() {
  //   prepareDOM();

  //   const step = document.body.clientHeight / dates.length;

  //   subscribeToEvents();

  //   function prepareDOM() {
  //     element.style.position = 'fixed';
  //     element.style.top = '0';

  //     const scrollElement = document.createElement('div');
  //     scrollElement.style.height = window.innerHeight * 10 + 'px';
  //     document.body.appendChild(scrollElement);
  //   }

  //   function subscribeToEvents() {
  //     window.addEventListener('scroll', goToDate);
  //     // element.addEventListener("dateChanged", scrollToPosition);
  //   }

  //   // function scrollToPosition(e: CustomEvent) {
  //   //   let currentDate = getDateString(e.detail.date);
  //   //   let index = dates.indexOf(currentDate);
  //   //   ignoreNextScrollEvent = true;
  //   //   window.scroll({
  //   //     top: index * step,
  //   //     behavior: "smooth",
  //   //   });
  //   // }

  //   function goToDate() {
  //     const index = Math.ceil(window.pageYOffset / step);
  //     if (index < dates.length) {
  //       tickerDate.setDate(dates[index]);
  //     } else {
  //       tickerDate.setLast();
  //     }
  //   }
  // }

  function registerClickEvents() {
    const svg = element.querySelector('svg') as SVGSVGElement;
    svg.addEventListener('click', ticker.toggle);
    element.addEventListener('dblclick', ticker.skipForward);
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
          ticker.skipBack();
          break;
        case keyCodes.s:
          ticker.toggle();
          break;
        case keyCodes.d:
          ticker.skipForward();
          break;
      }
    });
  }

  // ********************
  //      Public API
  // ********************

  return {
    // TODO: validate user input
    //   start: () => {
    //     if (!ticker.isRunning()) {
    //       ticker.start();
    //     }
    //   },
    //   stop: () => {
    //     ticker.stop();
    //   },
    //   rewind: () => {
    //     ticker.rewind();
    //   },
    //   fastforward: () => {
    //     ticker.fastForward();
    //   },
    //   loop: () => {
    //     ticker.loop();
    //   },
    //   inc: (value = 1) => {
    //     tickerDate.inc(value);
    //   },
    //   dec: (value = 1) => {
    //     tickerDate.dec(value);
    //   },
    //   getDate: () => tickerDate.getDate(),
    //   setDate: (inputDate: string | Date) => {
    //     tickerDate.setDate(getDateString(inputDate));
    //   },
    //   getAllDates: () => dates.map((date: string) => formatDate(date, 'YYYY-MM-DD')),
    //   createScroller: () => {
    //     createScroller();
    //   },
  };
}
