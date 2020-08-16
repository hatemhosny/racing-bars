import { elements } from './renderer';
import { Store } from './store';
import { Ticker } from './ticker';
import { hideElement, getElement, getClicks } from './utils';
import { DOMCustomEvent } from './models';

export function registerEvents(store: Store, ticker: Ticker) {
  const root = document.querySelector(store.getState().options.selector) as HTMLElement;
  const events: Array<{
    element: HTMLElement | Document;
    event: string;
    handler: EventListener;
  }> = [];

  registerControlButtonEvents();
  registerOverlayEvents();
  registerClickEvents();
  registerKeyboardEvents();
  return { unregister };

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
      document.addEventListener('keyup', handleKeyboardEvents);
      events.push({
        element: document,
        event: 'keyup',
        handler: handleKeyboardEvents as EventListener,
      });
    }
  }

  function handleKeyboardEvents(e: KeyboardEvent) {
    // ignore keyboard when user is typing in input or textarea
    const target = document.activeElement;
    if (target && ['input', 'textarea'].includes(target.tagName.toLowerCase())) return;

    const keys = {
      spacebar: ' ',
      A: 'a',
      S: 's',
      D: 'd',
    };

    switch (e.key) {
      case keys.spacebar:
        ticker.toggle('keyboardToggle');
        e.preventDefault(); // prevent scroll triggered by spacebar
        break;
      case keys.A:
        ticker.skipBack('keyboardSkipBack');
        break;
      case keys.S:
        ticker.toggle('keyboardToggle');
        break;
      case keys.D:
        ticker.skipForward('keyboardSkipForward');
        break;
    }
  }

  function unregister() {
    events.forEach((event) => {
      event.element.removeEventListener(event.event, event.handler);
    });
  }

  function addEventHandler(
    root: HTMLElement,
    className: string,
    event: string,
    handler: () => void,
  ) {
    const element = getElement(root, className);
    if (element) {
      element.addEventListener(event, handler);
      events.push({
        element,
        event,
        handler,
      });
    }
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
