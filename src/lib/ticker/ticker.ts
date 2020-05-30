import * as d3 from '../d3';
import { store, state } from '../store';
import {
  initializeTicker,
  tickerSetRunning,
  tickerInc,
  tickerSetFirst,
  tickerSetLast,
  updateTickerDate,
} from './ticker.actions';

export function createTicker(dates: string[]) {
  let ticker: d3.Timer;

  store.dispatch(initializeTicker(dates));

  function renderFrame() {
    store.dispatch(render());
  }

  function start() {
    ticker = d3.interval(showRace, state.options.tickDuration);
    store.dispatch(tickerSetRunning(true));

    function showRace(_: number) {
      if (state.ticker.isLastDate) {
        renderFrame();
        if (state.options.loop) {
          loop();
        } else {
          stop();
        }
      } else {
        store.dispatch(tickerInc());
      }
    }
  }

  function stop() {
    if (ticker) {
      ticker.stop();
    }
    store.dispatch(tickerSetRunning(false));
  }

  function skipBack() {
    stop();
    store.dispatch(tickerSetFirst());
    renderFrame();
    store.dispatch(tickerSetRunning(true));
  }

  function loop() {
    store.dispatch(tickerSetFirst());
    renderFrame();
  }

  function skipForward() {
    stop();
    store.dispatch(tickerSetLast());
    renderFrame();
  }

  function toggle() {
    if (state.ticker.isLastDate) {
      skipBack();
      start();
    } else if (state.ticker.isRunning) {
      stop();
    } else {
      start();
    }
  }

  function goToDate(date: string) {
    store.dispatch(updateTickerDate(date));
    renderFrame();
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
