import { optionsReducer, OptionsAction } from '../options';
import { tickerReducer, TickerAction } from '../ticker';
import { dataReducer, DataAction } from '../data';
import { Action, State } from './models';

export function rootReducer(state: State, action: Action): State {
  return {
    data: dataReducer(state.data, action as DataAction),
    options: optionsReducer(state.options, action as OptionsAction),
    ticker: tickerReducer(state.ticker, action as TickerAction),
    triggerRender: action.triggerRender ?? true,
  };
}
