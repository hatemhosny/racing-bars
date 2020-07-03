import { Action } from '../store';

export interface TickerAction extends Action {
  payload?: string | string[] | boolean | number;
  event: TickerEvent;
}

export interface TickerState {
  event: TickerEvent;
  isRunning: boolean;
  currentDate: string;
  isFirstDate: boolean;
  isLastDate: boolean;
  dates: string[];
}

export interface Ticker {
  start: (event: TickerEvent) => void;
  stop: (event: TickerEvent) => void;
  skipBack: (event: TickerEvent) => void;
  loop: () => void;
  skipForward: (event: TickerEvent) => void;
  toggle: (event: TickerEvent) => void;
  goToDate: (date: string, event: TickerEvent) => void;
}

export type TickerEvent =
  | 'initial'
  | 'loaded'
  | 'autorun'
  | 'running'
  | 'playButton'
  | 'pauseButton'
  | 'skipBackButton'
  | 'skipForwardButton'
  | 'end'
  | 'loop'
  | 'playOverlay'
  | 'repeatOverlay'
  | 'mouseClick'
  | 'mouseDoubleClick'
  | 'mouseTripleClick'
  | 'keyboardToggle'
  | 'keyboardSkipBack'
  | 'keyboardSkipForward'
  | 'apiStart'
  | 'apiStop'
  | 'apiSkipBack'
  | 'apiSkipForward'
  | 'apiInc'
  | 'apiDec'
  | 'apiSetDate'
  | 'scroll'
  | 'destroy';
