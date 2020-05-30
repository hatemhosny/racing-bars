import { createStore } from './store';
import { rootReducer } from './reducer';

export const store = createStore(rootReducer);
export const state = store.getState();
