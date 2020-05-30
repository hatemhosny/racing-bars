import { Action, Reducer, State, Subscriber } from './models';
import { rootReducer } from './reducer';

export function createStore(reducer: Reducer = rootReducer, initialState?: State) {
  let state: State;

  if (initialState) {
    state = initialState;
  }

  function dispatch(action: Action) {
    state = reducer(state, action);
    notifySubscribers();
  }

  function getState() {
    return state;
  }

  const subscribers: Subscriber[] = [];

  function subscribe(fn: Subscriber) {
    subscribers.push(fn);
    const index = subscribers.length - 1;

    return {
      unsubscribe: () => {
        subscribers.splice(index, 1);
      },
    };
  }

  function notifySubscribers() {
    subscribers.forEach((fn: Subscriber) => {
      fn();
    });
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}
