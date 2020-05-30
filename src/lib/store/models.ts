import { Options } from '../options';
import { RendererState } from '../renderer';
import { TickerState } from '../ticker';

export interface Action {
  type: string;
  payload?: any;
  error?: Error;
}

export type Reducer = (state: any, action: Action) => any;

export interface State {
  ticker: TickerState;
  renderer: RendererState;
  options: Options;
}

export interface Store {
  getState: () => State;
  dispatch: (action: Action) => void;
  subscribe: (fn: Subscriber) => { unsubscribe: () => void };
}

export type Subscriber = () => void;
