import { TickerAction } from './ticker.models';

export const actionTypes = {
  initializeTicker: 'ticker/initializeTicker',
  updateTickerDate: 'ticker/updateTickerDate',
  tickerSetRunning: 'ticker/tickerSetRunning',
  tickerSetFirst: 'ticker/tickerSetFirst',
  tickerSetLast: 'ticker/tickerSetLast',
  tickerInc: 'ticker/tickerInc',
  tickerDec: 'ticker/tickerDec',
};

export const initializeTicker = (dates: string[]): TickerAction => ({
  type: actionTypes.initializeTicker,
  payload: dates,
});

export const updateTickerDate = (currentDate: string): TickerAction => ({
  type: actionTypes.updateTickerDate,
  payload: currentDate,
});

export const tickerSetRunning = (running: boolean): TickerAction => ({
  type: actionTypes.tickerSetRunning,
  payload: running,
});

export const tickerSetFirst = (): TickerAction => ({
  type: actionTypes.tickerSetFirst,
});

export const tickerSetLast = (): TickerAction => ({
  type: actionTypes.tickerSetLast,
});

export const tickerInc = (value = 1): TickerAction => ({
  type: actionTypes.tickerInc,
  payload: value,
});

export const tickerDec = (value = 1): TickerAction => ({
  type: actionTypes.tickerDec,
  payload: value,
});
