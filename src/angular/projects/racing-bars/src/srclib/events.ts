import { elements } from './renderer';
import { Store } from './store';
import { Ticker } from './ticker';
import { hideElement, getElement, getClicks } from './utils';
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
      svg.addEventListener('click', (clickEvent) => {
        // ignore clicks to group legends
        const target = clickEvent.target as HTMLElement;
        if (!target || target.classList.contains('legend')) return;

        getClicks(clickEvent, function (event: any) {
          const clicks = event.detail;
          if (clicks === 3) {
            ticker.skipBack('mouseTripleClick');
          } else if (clicks === 2) {
            ticker.skipForward('mouseDoubleClick');
          } else {
            ticker.toggle('mouseClick');
          }
        });
      });
    }
  }

  function registerKeyboardEvents() {
    if (store.getState().options.keyboardControls) {
      document.addEventListener('keypress', function (e) {
        // ignore keyboard when user is typing in input or textarea
        const target = document.activeElement;
        if (target && ['input', 'textarea'].includes(target.tagName.toLowerCase())) return;

        const keyCodes = {
          spacebar: 32,
          A: 97,
          S: 115,
          D: 100,
        };

        // TODO: keyCode is deprecated
        switch (e.keyCode) {
          case keyCodes.spacebar:
            ticker.toggle('keyboardToggle');
            e.preventDefault(); // prevent scroll triggered by spacebar
            break;
          case keyCodes.A:
            ticker.skipBack('keyboardSkipBack');
            break;
          case keyCodes.S:
            ticker.toggle('keyboardToggle');
            break;
          case keyCodes.D:
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
  if (!element) return;

  element.dispatchEvent(
    new CustomEvent('racingBars/dateChange', {
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
