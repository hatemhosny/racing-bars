import * as d3 from 'd3';

export function createTicker() {
  let ticker: any;
  let tickerDate: any;
  let running: boolean;
  let tickDuration: number;
  let loop: boolean;
  let selector: string;
  let runRenderFrame: () => void;

  function tickerDateFactory(
    dates: string[],
    _tickDuration: number,
    _loop: boolean,
    _selector: string,
    updateDateSlice: (currentDate: string) => void,
    _runRenderFrame: () => void
  ) {
    tickDuration = _tickDuration;
    loop = _loop;
    selector = _selector;
    runRenderFrame = _runRenderFrame;

    let dateCounter = 0;
    let currentDate: string;
    const lastIndex = dates.length - 1;
    const maxDate = dates[lastIndex];

    function updateDate() {
      currentDate = dates[dateCounter];
      updateDateSlice(currentDate);
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
      set: (date: string) => {
        const dateIndex = dates.indexOf(date);
        if (dateIndex > -1) {
          dateCounter = dateIndex;
          updateDate();
        }
      },
      getDate: () => currentDate,
      isLast: () => currentDate === maxDate,
      getDates: () => [...dates],
      isRunning: () => running,
      setRunning: (flag: boolean) => setRunning(flag)
    };

    return tickerDate;
  }

  function startTicker() {
    setRunning(true);
    ticker = d3.interval(showRace, tickDuration);

    function showRace(_: number) {
      if (tickerDate.isLast()) {
        runRenderFrame();
        if (loop) {
          loopTicker();
        } else {
          stopTicker();
        }
      } else {
        tickerDate.inc();
      }
    }
  }

  function stopTicker() {
    ticker.stop();
    setRunning(false);
  }

  function rewindTicker() {
    stopTicker();
    tickerDate.setFirst();
    runRenderFrame();
  }

  function loopTicker() {
    tickerDate.setFirst();
    runRenderFrame();
  }

  function fastForwardTicker() {
    stopTicker();
    tickerDate.setLast();
    runRenderFrame();
  }

  function toggle() {
    if (tickerDate.isLast()) {
      rewindTicker();
      startTicker();
    } else if (running) {
      stopTicker();
    } else {
      startTicker();
    }
  }

  function setRunning(flag = true) {
    const playButton = document.querySelector(selector + ' .play') as HTMLElement;
    const pauseButton = document.querySelector(selector + ' .pause') as HTMLElement;
    if (flag) {
      running = true;
      playButton.style.display = 'none';
      pauseButton.style.display = 'unset';
    } else {
      running = false;
      playButton.style.display = 'unset';
      pauseButton.style.display = 'none';
    }
  }

  return {
    tickerDateFactory,
    startTicker,
    stopTicker,
    rewindTicker,
    loopTicker,
    fastForwardTicker,
    toggle,
    setRunning
  };
}
