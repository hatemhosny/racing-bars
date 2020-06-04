import { store } from './state';

export const getOptions = () => store.getState().options;
export const getRenderer = () => store.getState().renderer;
export const getTicker = () => store.getState().ticker;
