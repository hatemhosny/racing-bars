import { optionsReducer, OptionsAction } from '../options';
import { tickerReducer, TickerAction } from '../ticker';
import { dataReducer, DataAction } from '../data';
import { Action, State, Reducer } from './models';

export const rootReducer: Reducer<State, Action> = (state, action) => ({
  data: dataReducer(state.data, action as DataAction),
  options: optionsReducer(state.options, action as OptionsAction),
  ticker: tickerReducer(state.ticker, action as TickerAction),
  triggerRender: action.triggerRender ?? true,
});
