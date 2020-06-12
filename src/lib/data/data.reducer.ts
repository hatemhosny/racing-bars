import { actionTypes } from './data.actions';
import { DataState, DataAction, DataCollections } from './data.models';

const initialState: DataState = {
  names: [],
  groups: [],
  dates: [],
  formattedDates: [],
  groupFilter: [],
  selected: [],
};

export function dataReducer(state = initialState, action: DataAction): DataState {
  switch (action.type) {
    case actionTypes.dataLoaded: {
      const collections = action.payload as DataCollections;
      return {
        ...state,
        names: [...collections.names],
        groups: [...collections.groups],
        dates: [...collections.dates],
        formattedDates: [...collections.formattedDates],
      };
    }

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

    default:
      return state;
  }
}

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
