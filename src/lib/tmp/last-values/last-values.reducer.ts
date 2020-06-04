import { Data } from '../..';
import { LastValues, LastValuesAction } from './last-values.models';
import { actionTypes } from './last-values.actions';

const initialState: LastValues = {};

export function lastValuesReducer(state = initialState, action: LastValuesAction): LastValues {
  switch (action.type) {
    case actionTypes.initialize: {
      const data = action.payload as Data[];
      const newState: LastValues = { ...state };
      data.forEach((d) => {
        if (!newState[d.name] || d.date < newState[d.name].date) {
          newState[d.name] = {
            date: d.date,
            value: d.value,
          };
        }
      });
      return newState;
    }

    case actionTypes.update: {
      const d = action.payload as Data;
      const newState: LastValues = {};
      newState[d.name] = {
        date: d.date,
        value: d.value,
      };
      return {
        ...state,
        ...newState,
      };
    }

    default:
      return state;
  }
}
