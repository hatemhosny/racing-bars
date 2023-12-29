import { Action } from '../store';

export interface ContainerAction extends Action {
  payload: HTMLElement | string;
}

export interface ContainerState {
  container: HTMLElement | string;
}
