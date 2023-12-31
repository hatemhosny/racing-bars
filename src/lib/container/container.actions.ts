import type { ContainerState, ContainerAction } from './container.models';

export const actionTypes = {
  setContainer: 'container/set',
};

export const setContainer = (containerState: ContainerState): ContainerAction => ({
  type: actionTypes.setContainer,
  payload: containerState.element,
});
