import * as d3 from 'd3';

import { TickerDate, TickerOptions } from './models';

export function createTicker(runningCallback: (running: boolean) => void) {
  let ticker: d3.Timer;
  let tickerDate: TickerDate;
  let running: boolean;
  let tickDuration: number;
  let loopOption: boolean;
  let renderFrame: () => void;

  function tickerDateFactory(
    dates: string[],
    tickerOptions: TickerOptions,
    updateDateCallback: (currentDate: string) => void,
    _renderFrameFn: () => void
  ) {
    tickDuration = tickerOptions.tickDuration;
    loopOption = tickerOptions.loop;
    renderFrame = _renderFrameFn;

    let dateCounter = 0;
    let currentDate: string;
    const lastIndex = dates.length - 1;
    const maxDate = dates[lastIndex];

    function updateDate() {
      currentDate = dates[dateCounter];
      updateDateCallback(currentDate);
    }

    tickerDate = {
      inc: (value = 1) => {
        const newValue = dateCounter + value;
        dateCounter = newValue > lastIndex ? lastIndex : newValue;
        updateDate();
      },
      dec: (value = 1) => {
        const newValue = dateCounter - value;
        dateCounter = newValue < 0 ? 0 : newValue;
        updateDate();
      },
      setFirst: () => {
        dateCounter = 0;
        updateDate();
      },
      setLast: () => {
        dateCounter = dates.length - 1;
        updateDate();
      },
      update: () => {
        updateDate();
      },
      getDate: () => currentDate,
      setDate: (date: string) => {
        const dateIndex = dates.indexOf(date);
        if (dateIndex > -1) {
          dateCounter = dateIndex;
          updateDate();
        }
      },
      isLast: () => currentDate === maxDate,
    };

    return tickerDate;
  }

  function start() {
    setRunning(true);
    ticker = d3.interval(showRace, tickDuration);

    function showRace(_: number) {
      if (tickerDate.isLast()) {
        renderFrame();
        if (loopOption) {
          loop();
        } else {
          stop();
        }
      } else {
        tickerDate.inc();
      }
    }
  }

  function stop() {
    if (ticker) {
      ticker.stop();
    }
    setRunning(false);
  }

  function rewind() {
    stop();
    tickerDate.setFirst();
    renderFrame();
  }

  function loop() {
    tickerDate.setFirst();
    renderFrame();
  }

  function fastForward() {
    stop();
    tickerDate.setLast();
    renderFrame();
  }

  function toggle() {
    if (tickerDate.isLast()) {
      rewind();
      start();
    } else if (running) {
      stop();
    } else {
      start();
    }
  }

  function isRunning() {
    return running;
  }

  function setRunning(flag = true) {
    running = flag;
    runningCallback(running);
  }

  return {
    tickerDateFactory,
    start,
    stop,
    rewind,
    loop,
    fastForward,
    toggle,
    isRunning,
  };
}
