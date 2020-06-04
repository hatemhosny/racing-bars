import { optionsReducer, OptionsAction } from '../options';
import { rendererReducer, RendererAction } from '../renderer';
import { tickerReducer, TickerAction } from '../ticker';
import { Action, State } from './models';

export function rootReducer(state: State, action: Action): State {
  return {
    options: optionsReducer(state.options, action as OptionsAction),
    renderer: rendererReducer(state.renderer, action as RendererAction),
    ticker: tickerReducer(state.ticker, action as TickerAction),
  };
}
