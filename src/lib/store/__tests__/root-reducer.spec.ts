import { rootReducer, State } from '..';

describe('root reducer', () => {
  test('should return state with slices', () => {
    const state = ({
      data: {},
      options: {},
      ticker: {},
    } as unknown) as State;
    const action = { type: 'action', payload: { hello: 'world' } };
    const newState = rootReducer(state, action);
    expect(newState).toHaveProperty('data');
    expect(newState).toHaveProperty('options');
    expect(newState).toHaveProperty('ticker');
    expect(newState).toHaveProperty('triggerRender');
  });

  test('should return same output given same input', () => {
    const state = ({
      data: {},
      options: {},
      ticker: {},
    } as unknown) as State;
    const action = { type: 'action', payload: { hello: 'world' } };
    expect(rootReducer(state, action)).toEqual(rootReducer(state, action));
  });

  test('triggerRender can be set by action', () => {
    const state = ({
      data: {},
      options: {},
      ticker: {},
    } as unknown) as State;
    const action = { type: 'action', payload: { hello: 'world' }, triggerRender: false };
    const newState = rootReducer(state, action);
    expect(newState.triggerRender).toBe(false);
  });

  test('triggerRender should default to true', () => {
    const state = ({
      data: {},
      options: {},
      ticker: {},
    } as unknown) as State;
    const action = { type: 'action', payload: { hello: 'world' } };
    const newState = rootReducer(state, action);
    expect(newState.triggerRender).toBe(true);
  });
});
