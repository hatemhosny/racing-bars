import { containerReducer, type ContainerAction } from '../container';
import { dataReducer, type DataAction } from '../data';
import { optionsReducer, type OptionsAction } from '../options';
import { tickerReducer, type TickerAction } from '../ticker';
import type { Action, State, Reducer } from './models';

export const rootReducer: Reducer<State, Action> = (state, action) => ({
  container: containerReducer(state.container, action as ContainerAction),
  data: dataReducer(state.data, action as DataAction),
  options: optionsReducer(state.options, action as OptionsAction),
  ticker: tickerReducer(state.ticker, action as TickerAction),
  triggerRender: action.triggerRender ?? true,
});
