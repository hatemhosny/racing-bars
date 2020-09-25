import { createStore, State } from '..';

describe('store', () => {
  test('should create store', () => {
    const mockReducer = jest.fn();
    const store = createStore(mockReducer);
    expect(store).toHaveProperty('getState');
    expect(store).toHaveProperty('dispatch');
    expect(store).toHaveProperty('subscribe');
    expect(store).toHaveProperty('unsubscribeAll');
    expect(store.getState()).toEqual({});
  });

  test('should use preloaded state', () => {
    const mockReducer = jest.fn();
    const preState = ({
      preloaded: true,
      hello: 'world',
    } as unknown) as State;
    const store = createStore(mockReducer, preState);
    expect(store.getState()).toEqual(preState);
  });

  test('should call reducer with state and action', () => {
    const mockReducer = jest.fn();
    const preState = ({
      preloaded: true,
      hello: 'world',
    } as unknown) as State;
    const store = createStore(mockReducer, preState);
    const action = { type: 'mock', payload: { some: 'data' } };
    store.dispatch(action);
    expect(mockReducer).toHaveBeenCalledWith(preState, action);
  });

  test('should notify subscribers', () => {
    const mockReducer = jest.fn();
    const store = createStore(mockReducer);
    const mockSubscriber1 = jest.fn();
    const mockSubscriber2 = jest.fn();
    const mockSubscriber3 = jest.fn();
    store.subscribe(mockSubscriber1);
    store.subscribe(mockSubscriber2);
    store.subscribe(mockSubscriber3);
    const action = { type: 'mock', payload: { some: 'data' } };
    store.dispatch(action);
    expect(mockSubscriber1).toHaveBeenCalledTimes(1);
    expect(mockSubscriber2).toHaveBeenCalledTimes(1);
    expect(mockSubscriber3).toHaveBeenCalledTimes(1);
  });

  test('should allow unsubscription', () => {
    const mockReducer = jest.fn();
    const store = createStore(mockReducer);
    const mockSubscriber1 = jest.fn();
    const mockSubscriber2 = jest.fn();
    const mockSubscriber3 = jest.fn();
    const sub1 = store.subscribe(mockSubscriber1);
    const sub2 = store.subscribe(mockSubscriber2);
    const sub3 = store.subscribe(mockSubscriber3);
    const action = { type: 'mock', payload: { some: 'data' } };
    store.dispatch(action);
    sub1.unsubscribe();
    store.dispatch(action);
    sub2.unsubscribe();
    store.dispatch(action);
    sub3.unsubscribe();
    expect(mockSubscriber1).toHaveBeenCalledTimes(1);
    expect(mockSubscriber2).toHaveBeenCalledTimes(2);
    expect(mockSubscriber3).toHaveBeenCalledTimes(3);
  });

  test('should allow to unsubscribe all', () => {
    const mockReducer = jest.fn();
    const store = createStore(mockReducer);
    const mockSubscriber1 = jest.fn();
    const mockSubscriber2 = jest.fn();
    const mockSubscriber3 = jest.fn();
    store.subscribe(mockSubscriber1);
    store.subscribe(mockSubscriber2);
    store.subscribe(mockSubscriber3);
    const action = { type: 'mock', payload: { some: 'data' } };
    store.dispatch(action);
    store.unsubscribeAll();
    store.dispatch(action);
    store.dispatch(action);
    expect(mockSubscriber1).toHaveBeenCalledTimes(1);
    expect(mockSubscriber2).toHaveBeenCalledTimes(1);
    expect(mockSubscriber3).toHaveBeenCalledTimes(1);
  });
});
