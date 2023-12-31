import type { Options } from '../options';
import type { TickerState } from '../ticker';
import type { DataState } from '../data';
import type { ContainerState } from '../container';

export interface Action {
  type: string;
  payload?: any;
  error?: Error;
  triggerRender?: boolean;
}

export interface State {
  container: ContainerState;
  data: DataState;
  options: Options;
  ticker: TickerState;
  triggerRender: boolean;
}

type StateOrSlice = State | ContainerState | DataState | Options | TickerState;

export type Reducer<T extends StateOrSlice, U extends Action> = (state: T, action: U) => T;

export interface Store {
  getState: () => State;
  dispatch: (action: Action) => void;
  subscribe: (fn: Subscriber) => { unsubscribe: () => void };
  unsubscribeAll: () => void;
}

export type Subscriber = () => void;
