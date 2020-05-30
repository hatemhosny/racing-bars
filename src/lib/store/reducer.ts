import { optionsReducer, OptionsAction } from '../options';
import { Action, State } from './models';

export function rootReducer(state: State, action: Action): State {
  return {
    ticker: {},
    dates: {},
    controls: {},
    data: {},
    options: optionsReducer(state.options, action as OptionsAction),
  };
}
