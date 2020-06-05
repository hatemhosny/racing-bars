import { store } from './state';

export const getOptions = () => store.getState().options;
export const getTicker = () => store.getState().ticker;
