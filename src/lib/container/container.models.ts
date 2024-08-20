import type { Action } from '../store';

export interface ContainerAction extends Action {
  payload: HTMLElement;
}

export interface ContainerState {
  element: HTMLElement;
}
