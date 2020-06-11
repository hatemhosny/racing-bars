import { actionTypes } from './data.actions';
import { DataState, DataAction, DataCollections } from './data.models';

const initialState: DataState = {
  names: [],
  groups: [],
  dates: [],
  formattedDates: [],
  groupFilter: [],
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
        groupFilter: addFilter(state.groupFilter, action.payload as string),
      };

    case actionTypes.removeFilter:
      return {
        ...state,
        groupFilter: removeFilter(state.groupFilter, action.payload as string),
      };

    case actionTypes.toggleFilter:
      return {
        ...state,
        groupFilter: toggleFilter(state.groupFilter, action.payload as string),
      };

    default:
      return state;
  }
}

function addFilter(filters: string[], group: string) {
  const arr = [...filters];
  if (!arr.includes(group)) {
    arr.push(group);
  }
  return arr;
}

function removeFilter(filters: string[], group: string) {
  return filters.filter((item) => item !== group);
}

function toggleFilter(filters: string[], group: string) {
  return filters.includes(group) ? removeFilter(filters, group) : addFilter(filters, group);
}
