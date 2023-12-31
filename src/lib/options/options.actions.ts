import type { Options, OptionsAction } from './options.models';

export const actionTypes = {
  loadOptions: 'options/load',
  changeOptions: 'options/change',
};

export const loadOptions = (options: Partial<Options>): OptionsAction => ({
  type: actionTypes.loadOptions,
  payload: options,
});

export const changeOptions = (options: Partial<Options>): OptionsAction => ({
  type: actionTypes.changeOptions,
  payload: options,
});
