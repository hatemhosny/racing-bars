import { DataAction, DataCollections } from './data.models';

export const actionTypes = {
  dataLoaded: 'data/loaded',
  addFilter: 'data/addFilter',
  removeFilter: 'data/removeFilter',
  toggleFilter: 'data/toggleFilter',
  resetFilters: 'data/resetFilters',
};

export const dataLoaded = (dataCollections: DataCollections): DataAction => ({
  type: actionTypes.dataLoaded,
  payload: dataCollections,
});

export const addFilter = (group: string): DataAction => ({
  type: actionTypes.addFilter,
  payload: group,
});

export const removeFilter = (group: string): DataAction => ({
  type: actionTypes.removeFilter,
  payload: group,
});

export const toggleFilter = (group: string): DataAction => ({
  type: actionTypes.toggleFilter,
  payload: group,
});

export const resetFilters = (): DataAction => ({
  type: actionTypes.resetFilters,
});
