import type { Action, Reducer, State, Subscriber, Store } from './models';
import { rootReducer } from './reducer';

export function createStore(
  reducer: Reducer<State, Action> = rootReducer,
  preloadedState?: State,
): Store {
  let state = {} as State;

  if (preloadedState) {
    state = preloadedState;
  }

  function dispatch(action: Action) {
    state = reducer(state, action);
    notifySubscribers();
    return action;
  }

  function getState() {
    return state;
  }

  const subscribers: Subscriber[] = [];

  function subscribe(fn: Subscriber) {
    subscribers.push(fn);
    return {
      unsubscribe: () => {
        subscribers.splice(subscribers.indexOf(fn), 1);
      },
    };
  }

  function notifySubscribers() {
    subscribers.forEach((fn: Subscriber) => {
      fn();
    });
  }

  function unsubscribeAll() {
    subscribers.length = 0;
  }

  return {
    getState,
    dispatch,
    subscribe,
    unsubscribeAll,
  };
}
