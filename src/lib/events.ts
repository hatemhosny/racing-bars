import { elements } from './elements';
import { store } from './store';
import { Ticker } from './ticker';
import { addEventHandler, hideElement } from './utils';
import { formatDate } from './dates';
import { DOMCustomEvent } from './models';

export function registerEvents(element: HTMLElement, ticker: Ticker) {
  registerControlButtonEvents();
  registerOverlayEvents();
  registerClickEvents();
  registerKeyboardEvents();

  function registerControlButtonEvents() {
    addEventHandler(elements.skipBack, 'click', ticker.skipBack);
    addEventHandler(elements.play, 'click', ticker.toggle);
    addEventHandler(elements.pause, 'click', ticker.toggle);
    addEventHandler(elements.skipForward, 'click', ticker.skipForward);
  }

  function registerOverlayEvents() {
    addEventHandler(elements.overlayPlay, 'click', () => {
      hideElement(elements.overlay);
      ticker.start();
    });
    addEventHandler(elements.overlayRepeat, 'click', () => {
      hideElement(elements.overlay);
      ticker.loop();
      ticker.start();
    });
  }

  function registerClickEvents() {
    if (!store.getState().options.disableClickEvents) {
      const svg = element.querySelector('svg') as SVGSVGElement;
      svg.addEventListener('click', ticker.toggle);
      element.addEventListener('dblclick', ticker.skipForward);
    }
  }

  function registerKeyboardEvents() {
    if (!store.getState().options.disableKeyboardEvents) {
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
  }
}

function dispatchDOMEvent(element: HTMLElement, currentDate: string) {
  element.dispatchEvent(
    new CustomEvent('racingBars/dateChanged', {
      bubbles: true,
      detail: {
        date: formatDate(currentDate),
        isFirst: store.getState().ticker.isFirstDate,
        isLast: store.getState().ticker.isLastDate,
      },
    } as DOMCustomEvent),
  );
}

export function DOMEventSubscriber(element: HTMLElement) {
  let lastDate = '';
  return function () {
    const currentDate = store.getState().ticker.currentDate;
    if (currentDate !== lastDate) {
      dispatchDOMEvent(element, currentDate);
      lastDate = currentDate;
    }
  };
}
