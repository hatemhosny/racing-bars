import { Reducer } from '../store';
import { actionTypes } from './data.actions';
import { DataState, DataAction, DataCollections, DateSlice } from './data.models';

const initialState: DataState = {
  names: [],
  groups: [],
  groupFilter: [],
  selected: [],
  dateSlices: {},
};

export const dataReducer: Reducer<DataState, DataAction> = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.dataLoaded:
      return {
        ...state,
        names: [...(action.payload as DataCollections).names],
        groups: [...(action.payload as DataCollections).groups],
      };

    case actionTypes.addFilter:
      return {
        ...state,
        groupFilter: addToArray(state.groupFilter, action.payload as string),
      };

    case actionTypes.removeFilter:
      return {
        ...state,
        groupFilter: removeFromArray(state.groupFilter, action.payload as string),
      };

    case actionTypes.toggleFilter:
      return {
        ...state,
        groupFilter: toggleItem(state.groupFilter, action.payload as string),
      };

    case actionTypes.resetFilters:
      return {
        ...state,
        groupFilter: [],
      };

    case actionTypes.allExceptFilter:
      return {
        ...state,
        groupFilter: removeFromArray(state.groups, action.payload as string),
      };

    case actionTypes.addSelection:
      return {
        ...state,
        selected: addToArray(state.selected, action.payload as string),
      };

    case actionTypes.removeSelection:
      return {
        ...state,
        selected: removeFromArray(state.selected, action.payload as string),
      };

    case actionTypes.toggleSelection:
      return {
        ...state,
        selected: toggleItem(state.selected, action.payload as string),
      };

    case actionTypes.resetSelections:
      return {
        ...state,
        selected: [],
      };

    case actionTypes.addDateSlice:
      return {
        ...state,
        dateSlices: {
          ...state.dateSlices,
          ...(action.payload as DateSlice),
        },
      };

    case actionTypes.clearDateSlices:
      return {
        ...state,
        dateSlices: {},
      };

    default:
      return state;
  }
};

function addToArray(array: string[], item: string) {
  const arr = [...array];
  if (!arr.includes(item)) {
    arr.push(item);
  }
  return arr;
}

function removeFromArray(array: string[], item: string) {
  return array.filter((x) => x !== item);
}

function toggleItem(array: string[], item: string) {
  return array.includes(item) ? removeFromArray(array, item) : addToArray(array, item);
}
