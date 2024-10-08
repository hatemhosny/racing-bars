import type { Reducer } from '../store';
import { actionTypes } from './container.actions';
import type { ContainerAction, ContainerState } from './container.models';

const initialState: ContainerState = {
  element: document.body,
};

export const containerReducer: Reducer<ContainerState, ContainerAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case actionTypes.setContainer: {
      return {
        ...state,
        element: action.payload,
      };
    }

    default:
      return state;
  }
};
