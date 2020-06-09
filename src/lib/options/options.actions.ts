import { Options, OptionsAction, RequiredOptions } from './options.models';

export const actionTypes = {
  optionsLoaded: 'options/loaded',
  changeOptions: 'options/change',
  optionsChanged: 'options/changed',
};

export const optionsLoaded = (options: Options | RequiredOptions): OptionsAction => ({
  type: actionTypes.optionsLoaded,
  payload: options,
});

export const changeOptions = (options: Options): OptionsAction => ({
  type: actionTypes.changeOptions,
  payload: options,
});

export const optionsChanged = (options: Options): OptionsAction => ({
  type: actionTypes.optionsChanged,
  payload: options,
});
