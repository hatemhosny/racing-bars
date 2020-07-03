import { Options, OptionsAction } from './options.models';

export const actionTypes = {
  optionsLoaded: 'options/loaded',
  changeOptions: 'options/change',
  optionsChanged: 'options/changed',
};

export const optionsLoaded = (options: Partial<Options>): OptionsAction => ({
  type: actionTypes.optionsLoaded,
  payload: options,
});

export const changeOptions = (options: Partial<Options>): OptionsAction => ({
  type: actionTypes.changeOptions,
  payload: options,
});
