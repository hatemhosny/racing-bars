import * as d3 from '../d3';
import { actions, Store } from '../store';
import { Ticker } from './ticker.models';

export function createTicker(store: Store): Ticker {
  store.dispatch(actions.ticker.initialize(store.getState().data.dates));

  let ticker: d3.Timer;

  function start() {
    ticker = d3.interval(showRace, store.getState().options.tickDuration);
    store.dispatch(actions.ticker.setRunning(true));

    function showRace(_: number) {
      if (store.getState().ticker.isLastDate) {
        if (store.getState().options.loop) {
          loop();
        } else {
          stop();
        }
      } else {
        store.dispatch(actions.ticker.inc());
      }
    }
  }

  function stop() {
    if (ticker) {
      ticker.stop();
    }
    store.dispatch(actions.ticker.setRunning(false));
  }

  function skipBack() {
    stop();
    store.dispatch(actions.ticker.setFirst());
  }

  function loop() {
    store.dispatch(actions.ticker.setFirst());
  }

  function skipForward() {
    stop();
    store.dispatch(actions.ticker.setLast());
  }

  function toggle() {
    if (store.getState().ticker.isLastDate) {
      skipBack();
      start();
    } else if (store.getState().ticker.isRunning) {
      stop();
    } else {
      if (!store.getState().ticker.isFirstDate) {
        // to avoid lastValue flicker
        store.dispatch(actions.ticker.inc());
      }
      start();
    }
  }

  function goToDate(date: string) {
    store.dispatch(actions.ticker.updateDate(date));
  }

  return {
    start,
    stop,
    skipBack,
    loop,
    skipForward,
    toggle,
    goToDate,
  };
}
