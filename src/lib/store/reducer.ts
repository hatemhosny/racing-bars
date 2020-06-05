import { optionsReducer, OptionsAction } from '../options';
import { tickerReducer, TickerAction } from '../ticker';
import { Action, State } from './models';

export function rootReducer(state: State, action: Action): State {
  return {
    options: optionsReducer(state.options, action as OptionsAction),
    ticker: tickerReducer(state.ticker, action as TickerAction),
  };
}
