import { elements } from './elements';
import { Store } from './store';
import { Ticker } from './ticker';
import { hideElement, getElement } from './utils';
import { DOMCustomEvent } from './models';

export function registerEvents(store: Store, ticker: Ticker) {
  const root = document.querySelector(store.getState().options.selector) as HTMLElement;

  registerControlButtonEvents();
  registerOverlayEvents();
  registerClickEvents();
  registerKeyboardEvents();

  function registerControlButtonEvents() {
    addEventHandler(root, elements.skipBack, 'click', () => {
      ticker.skipBack('skipBackButton');
    });
    addEventHandler(root, elements.play, 'click', () => {
      ticker.start('playButton');
    });
    addEventHandler(root, elements.pause, 'click', () => {
      ticker.stop('pauseButton');
    });
    addEventHandler(root, elements.skipForward, 'click', () => {
      ticker.skipForward('skipForwardButton');
    });
  }

  function registerOverlayEvents() {
    addEventHandler(root, elements.overlayPlay, 'click', () => {
      hideElement(root, elements.overlay);
      ticker.start('playOverlay');
    });
    addEventHandler(root, elements.overlayRepeat, 'click', () => {
      hideElement(root, elements.overlay);
      ticker.skipBack('repeatOverlay');
      ticker.start('repeatOverlay');
    });
  }

  function registerClickEvents() {
    if (store.getState().options.mouseControls) {
      const svg = root.querySelector('svg') as SVGSVGElement;
      svg.addEventListener('click', () => {
        ticker.toggle('mouseClick');
      });
      root.addEventListener('dblclick', () => {
        ticker.skipForward('mouseDoubleClick');
      });
    }
  }

  function registerKeyboardEvents() {
    if (store.getState().options.keyboardControls) {
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
            ticker.toggle('keyboardToggle');
            break;
          case keyCodes.a:
            ticker.skipBack('keyboardSkipBack');
            break;
          case keyCodes.s:
            ticker.toggle('keyboardToggle');
            break;
          case keyCodes.d:
            ticker.skipForward('keyboardSkipForward');
            break;
        }
      });
    }
  }
}

export function addEventHandler(
  root: HTMLElement,
  className: string,
  event: string,
  handler: () => void,
) {
  const element = getElement(root, className);
  if (element) {
    element.addEventListener(event, handler);
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
