import { createStore, actions } from '../../src/lib/store';
import { rootReducer } from '../../src/lib/store/reducer';

const store = createStore(rootReducer);
store.dispatch(actions.options.optionsLoaded({ startDate: '1980-07-01', endDate: '2010-12-31' }));

console.log(store.getState());
