import { elements } from './elements';
import { Store } from './store';
import { Ticker } from './ticker';
import { addEventHandler, hideElement } from './utils';
import { DOMCustomEvent } from './models';

export function registerEvents(store: Store, ticker: Ticker) {
  const root = document.querySelector(store.getState().options.selector) as HTMLElement;

  registerControlButtonEvents();
  registerOverlayEvents();
  registerClickEvents();
  registerKeyboardEvents();

  function registerControlButtonEvents() {
    addEventHandler(root, elements.skipBack, 'click', ticker.skipBack);
    addEventHandler(root, elements.play, 'click', ticker.start);
    addEventHandler(root, elements.pause, 'click', ticker.stop);
    addEventHandler(root, elements.skipForward, 'click', ticker.skipForward);
  }

  function registerOverlayEvents() {
    addEventHandler(root, elements.overlayPlay, 'click', () => {
      hideElement(root, elements.overlay);
      ticker.start();
    });
    addEventHandler(root, elements.overlayRepeat, 'click', () => {
      hideElement(root, elements.overlay);
      ticker.loop();
      ticker.start();
    });
  }

  function registerClickEvents() {
    if (!store.getState().options.disableClickEvents) {
      const svg = root.querySelector('svg') as SVGSVGElement;
      svg.addEventListener('click', ticker.toggle);
      root.addEventListener('dblclick', ticker.skipForward);
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

function dispatchDOMEvent(store: Store) {
  const element = document.querySelector(store.getState().options.selector) as HTMLElement;
  if (!element) {
    return;
  }
  element.dispatchEvent(
    new CustomEvent('racingBars/dateChanged', {
      bubbles: true,
      detail: {
        date: store.getState().ticker.currentDate,
        isFirst: store.getState().ticker.isFirstDate,
        isLast: store.getState().ticker.isLastDate,
      },
    } as DOMCustomEvent),
  );
}

export function DOMEventSubscriber(store: Store) {
  let lastDate = '';
  return function () {
    const currentDate = store.getState().ticker.currentDate;
    if (currentDate !== lastDate) {
      dispatchDOMEvent(store);
      lastDate = currentDate;
    }
  };
}
