import { TickerAction } from './ticker.models';

export const actionTypes = {
  initialize: 'ticker/initialize',
  updateDate: 'ticker/updateDate',
  setRunning: 'ticker/setRunning',
  setFirst: 'ticker/setFirst',
  setLast: 'ticker/setLast',
  inc: 'ticker/inc',
  dec: 'ticker/dec',
};

export const initialize = (dates: string[]): TickerAction => ({
  type: actionTypes.initialize,
  payload: dates,
});

export const updateDate = (currentDate: string): TickerAction => ({
  type: actionTypes.updateDate,
  payload: currentDate,
});

export const setRunning = (running: boolean): TickerAction => ({
  type: actionTypes.setRunning,
  payload: running,
});

export const setFirst = (): TickerAction => ({
  type: actionTypes.setFirst,
});

export const setLast = (): TickerAction => ({
  type: actionTypes.setLast,
});

export const inc = (value = 1): TickerAction => ({
  type: actionTypes.inc,
  payload: value,
});

export const dec = (value = 1): TickerAction => ({
  type: actionTypes.dec,
  payload: value,
});
