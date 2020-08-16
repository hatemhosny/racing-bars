import { Action } from '../store';

export interface TickerAction extends Action {
  payload?: string | string[] | boolean | number;
}

export interface TickerState {
  isRunning: boolean;
  currentDate: string;
  isFirstDate: boolean;
  isLastDate: boolean;
  dates: string[];
}

export interface Ticker {
  start: () => void;
  stop: () => void;
  skipBack: () => void;
  loop: () => void;
  skipForward: () => void;
  toggle: () => void;
  goToDate: (date: string) => void;
}
