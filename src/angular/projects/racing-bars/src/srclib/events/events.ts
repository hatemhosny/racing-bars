import { elements } from '../renderer';
import { Store } from '../store';
import { Ticker } from '../ticker';
import { hideElement, getElement, getClicks } from '../utils';
import { DOMCustomEvent, EventType, Event, TickDetails } from './models';

export function registerEvents(store: Store, ticker: Ticker) {
  const root = document.querySelector(store.getState().options.selector) as HTMLElement;
  const events: Event[] = [];
  register();

  return { reregister, unregister, addApiEventHandler };

  function register() {
    registerControlButtonEvents();
    registerOverlayEvents();
    registerClickEvents();
    registerKeyboardEvents();
  }

  function reregister() {
    unregister(false);
    register();
  }

  function registerControlButtonEvents() {
    addEventHandler(root, elements.skipBack, 'click', () => ticker.skipBack());
    addEventHandler(root, elements.play, 'click', () => ticker.start());
    addEventHandler(root, elements.pause, 'click', () => ticker.stop());
    addEventHandler(root, elements.skipForward, 'click', () => ticker.skipForward());
  }

  function registerOverlayEvents() {
    addEventHandler(root, elements.overlayPlay, 'click', () => {
      hideElement(root, elements.overlay);
      ticker.start();
    });
    addEventHandler(root, elements.overlayRepeat, 'click', () => {
      hideElement(root, elements.overlay);
      ticker.skipBack();
      ticker.start();
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
            ticker.skipBack();
          } else if (clicks === 2) {
            ticker.skipForward();
          } else {
            ticker.toggle();
          }
        });
      });
    }
  }

  function registerKeyboardEvents() {
    if (store.getState().options.keyboardControls) {
      addEventHandler(document, '', 'keyup', handleKeyboardEvents);
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
        ticker.toggle();
        e.preventDefault(); // prevent scroll triggered by spacebar
        break;
      case keys.A:
        ticker.skipBack();
        break;
      case keys.S:
        ticker.toggle();
        break;
      case keys.D:
        ticker.skipForward();
        break;
    }
  }

  function unregister(removeUserDefined = true) {
    events
      .filter((event) => (removeUserDefined ? true : !event.userDefined))
      .forEach((event) => {
        event.element.removeEventListener(event.eventType, event.handler);
        events.splice(events.indexOf(event), 1);
      });
  }

  function addEventHandler(
    root: HTMLElement | HTMLDocument,
    className: string,
    eventType: Event['eventType'],
    handler: (e?: any) => void,
  ) {
    const element = getElement(root, className);
    if (element) {
      element.addEventListener(eventType, handler);
      events.push({
        element,
        userDefined: false,
        eventType,
        handler,
      });
    }
  }

  function addApiEventHandler(eventType: EventType, handler: () => void) {
    root.addEventListener(eventType, handler);
    events.push({
      element: root,
      userDefined: true,
      eventType,
      handler,
    });
  }
}

export function getTickDetails(store: Store): TickDetails {
  const { ticker, data } = store.getState();
  return {
    date: ticker.currentDate,
    isFirstDate: ticker.isFirstDate,
    isLastDate: ticker.isLastDate,
    isRunning: ticker.isRunning,
    allDates: data.datesCache,
  };
}

function dispatchDOMEvent(store: Store, eventType: EventType) {
  const element = document.querySelector(store.getState().options.selector) as HTMLElement;
  if (!element) return;
  element.dispatchEvent(
    new CustomEvent(eventType, {
      bubbles: true,
      detail: getTickDetails(store),
    } as DOMCustomEvent),
  );
}

export function DOMEventSubscriber(store: Store) {
  let lastDate = '';
  let wasRunning: boolean;
  return function () {
    const currentDate = store.getState().ticker.currentDate;
    const isRunning = store.getState().ticker.isRunning;
    if (currentDate !== lastDate) {
      dispatchDOMEvent(store, 'dateChange');
      if (store.getState().ticker.isFirstDate) {
        dispatchDOMEvent(store, 'firstDate');
      }
      if (store.getState().ticker.isLastDate) {
        dispatchDOMEvent(store, 'lastDate');
      }
      lastDate = currentDate;
    }
    if (!wasRunning && isRunning) {
      dispatchDOMEvent(store, 'play');
    }
    if (wasRunning && !isRunning) {
      dispatchDOMEvent(store, 'pause');
    }
    wasRunning = isRunning;
  };
}
