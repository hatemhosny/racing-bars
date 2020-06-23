import * as d3 from '../d3';
import { actions, Store } from '../store';
import { Ticker, TickerEvent } from './ticker.models';

export function createTicker(store: Store): Ticker {
  let ticker: d3.Timer;

  function start(event: TickerEvent) {
    ticker = d3.interval(showRace, store.getState().options.tickDuration);
    store.dispatch(actions.ticker.setRunning(true, event));

    function showRace(_: number) {
      if (store.getState().ticker.isLastDate) {
        if (
          store.getState().options.loop ||
          store.getState().ticker.event === 'playButton' ||
          store.getState().ticker.event === 'apiStart' ||
          store.getState().ticker.event === 'keyboardToggle' ||
          store.getState().ticker.event === 'mouseClick'
        ) {
          loop();
        } else {
          stop('end');
        }
      } else {
        store.dispatch(actions.ticker.inc('running'));
      }
    }
  }

  function stop(event: TickerEvent) {
    if (ticker) {
      ticker.stop();
    }
    store.dispatch(actions.ticker.setRunning(false, event));
  }

  function skipBack(event: TickerEvent) {
    stop(event);
    store.dispatch(actions.ticker.setFirst(event));
  }

  function loop() {
    store.dispatch(actions.ticker.setFirst('loop'));
  }

  function skipForward(event: TickerEvent) {
    stop(event);
    store.dispatch(actions.ticker.setLast(event));
  }

  function toggle(event: TickerEvent) {
    if (store.getState().ticker.isLastDate) {
      skipBack(event);
      start(event);
    } else if (store.getState().ticker.isRunning) {
      stop(event);
    } else {
      // if (!store.getState().ticker.isFirstDate) {
      //   // to avoid lastValue flicker
      //   store.dispatch(actions.ticker.inc(event));
      // }
      start(event);
    }
  }

  function goToDate(date: string, event: TickerEvent) {
    store.dispatch(actions.ticker.updateDate(date, event));
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
