import { Options } from '../options';
import { TickerState } from '../ticker';
import { DataState } from '../data';

export interface Action {
  type: string;
  payload?: any;
  error?: Error;
  triggerRender?: boolean;
}

export type Reducer = (state: any, action: Action) => any;

export interface State {
  data: DataState;
  options: Options;
  ticker: TickerState;
  triggerRender: boolean;
}

export interface Store {
  getState: () => State;
  dispatch: (action: Action) => void;
  subscribe: (fn: Subscriber) => { unsubscribe: () => void };
}

export type Subscriber = () => void;
