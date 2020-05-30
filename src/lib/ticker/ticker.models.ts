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
