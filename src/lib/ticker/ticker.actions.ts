import { TickerAction, TickerEvent } from './ticker.models';

export const actionTypes = {
  initialize: 'ticker/initialize',
  updateDate: 'ticker/updateDate',
  setRunning: 'ticker/setRunning',
  setFirst: 'ticker/setFirst',
  setLast: 'ticker/setLast',
  inc: 'ticker/inc',
  dec: 'ticker/dec',
  event: 'ticker/event',
};

export const initialize = (dates: string[]): TickerAction => ({
  type: actionTypes.initialize,
  payload: dates,
  event: 'initial',
});

export const updateDate = (currentDate: string, event: TickerEvent): TickerAction => ({
  type: actionTypes.updateDate,
  payload: currentDate,
  event,
});

export const setRunning = (running: boolean, event: TickerEvent): TickerAction => ({
  type: actionTypes.setRunning,
  payload: running,
  event,
});

export const setFirst = (event: TickerEvent): TickerAction => ({
  type: actionTypes.setFirst,
  event,
});

export const setLast = (event: TickerEvent): TickerAction => ({
  type: actionTypes.setLast,
  event,
});

export const inc = (event: TickerEvent, value = 1): TickerAction => ({
  type: actionTypes.inc,
  payload: value,
  event,
});

export const dec = (event: TickerEvent, value = 1): TickerAction => ({
  type: actionTypes.dec,
  payload: value,
  event,
});
