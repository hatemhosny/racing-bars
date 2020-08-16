import { DataAction, DataCollections, Data, DateSlice } from './data.models';

export const actionTypes = {
  dataLoaded: 'data/loaded',
  addFilter: 'data/addFilter',
  removeFilter: 'data/removeFilter',
  toggleFilter: 'data/toggleFilter',
  resetFilters: 'data/resetFilters',
  allExceptFilter: 'data/allExceptFilter',
  addSelection: 'data/addSelection',
  removeSelection: 'data/removeSelection',
  toggleSelection: 'data/toggleSelection',
  resetSelections: 'data/resetSelections',
  addDateSlice: 'data/addDateSlice',
  clearDateSlices: 'data/clearDateSlices',
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

export const allExceptFilter = (group: string): DataAction => ({
  type: actionTypes.allExceptFilter,
  payload: group,
});

export const addSelection = (selection: string): DataAction => ({
  type: actionTypes.addSelection,
  payload: selection,
});

export const removeSelection = (selection: string): DataAction => ({
  type: actionTypes.removeSelection,
  payload: selection,
});

export const toggleSelection = (selection: string): DataAction => ({
  type: actionTypes.toggleSelection,
  payload: selection,
});

export const resetSelections = (): DataAction => ({
  type: actionTypes.resetSelections,
});

export const addDateSlice = (date: string, dateSlice: Data[]): DataAction => {
  const payload: DateSlice = {};
  payload[date] = dateSlice;
  return {
    type: actionTypes.addDateSlice,
    payload,
    triggerRender: false,
  };
};

export const clearDateSlices = (): DataAction => ({
  type: actionTypes.clearDateSlices,
});
