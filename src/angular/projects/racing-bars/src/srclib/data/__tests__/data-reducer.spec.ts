import { dataReducer } from '..';
import { actions } from '../../store';

describe('data reducer', () => {
  const initialState = {
    names: [],
    groups: [],
    datesCache: [],
    groupFilter: [],
    selected: [],
    dateSlices: {},
  };

  const loadedData = {
    names: ['a', 'b', 'c', 'd', 'e'],
    groups: ['A', 'B', 'C'],
    datesCache: ['1980-01-01', '1980-02-01', '1980-03-01'],
  };

  const currentState = {
    ...initialState,
    ...loadedData,
  };

  test('should initialize state on data load', () => {
    const state = dataReducer(initialState, actions.data.dataLoaded(loadedData));
    expect(state).toEqual(currentState);
  });

  test('should add group filters', () => {
    let state = dataReducer(currentState, actions.data.addFilter('B'));
    const newState = {
      ...currentState,
      groupFilter: ['B'],
    };
    expect(state).toEqual(newState);

    state = dataReducer(newState, actions.data.addFilter('C'));
    expect(state).toEqual({
      ...currentState,
      groupFilter: ['B', 'C'],
    });
  });

  test('should remove group filters', () => {
    const oldState = {
      ...currentState,
      groupFilter: ['B', 'C'],
    };
    let state = dataReducer(oldState, actions.data.removeFilter('C'));
    const newState = {
      ...currentState,
      groupFilter: ['B'],
    };
    expect(state).toEqual(newState);

    state = dataReducer(newState, actions.data.removeFilter('B'));
    expect(state).toEqual(currentState);
  });

  test('should toggle group filters', () => {
    const oldState = {
      ...currentState,
      groupFilter: ['B', 'C'],
    };
    let state = dataReducer(oldState, actions.data.toggleFilter('C'));
    const newState = {
      ...currentState,
      groupFilter: ['B'],
    };
    expect(state).toEqual(newState);

    state = dataReducer(newState, actions.data.toggleFilter('A'));
    expect(state).toEqual({
      ...currentState,
      groupFilter: ['B', 'A'],
    });
  });

  test('should reset group filters', () => {
    const oldState = {
      ...currentState,
      groupFilter: ['B', 'C'],
    };
    const state = dataReducer(oldState, actions.data.resetFilters());
    expect(state).toEqual(currentState);
  });

  test('should add allExceptFilter', () => {
    const oldState = {
      ...currentState,
      groupFilter: ['B', 'C'],
    };
    const state = dataReducer(oldState, actions.data.allExceptFilter('B'));
    expect(state).toEqual({
      ...currentState,
      groupFilter: ['A', 'C'],
    });
  });

  test('should add selection', () => {
    let state = dataReducer(currentState, actions.data.addSelection('b'));
    const newState = {
      ...currentState,
      selected: ['b'],
    };
    expect(state).toEqual(newState);

    state = dataReducer(newState, actions.data.addSelection('c'));
    expect(state).toEqual({
      ...currentState,
      selected: ['b', 'c'],
    });
  });

  test('should remove selection', () => {
    const oldState = {
      ...currentState,
      selected: ['b', 'c'],
    };
    let state = dataReducer(oldState, actions.data.removeSelection('c'));
    const newState = {
      ...currentState,
      selected: ['b'],
    };
    expect(state).toEqual(newState);

    state = dataReducer(newState, actions.data.removeSelection('b'));
    expect(state).toEqual(currentState);
  });

  test('should toggle selection', () => {
    const oldState = {
      ...currentState,
      selected: ['b', 'c'],
    };
    let state = dataReducer(oldState, actions.data.toggleSelection('c'));
    const newState = {
      ...currentState,
      selected: ['b'],
    };
    expect(state).toEqual(newState);

    state = dataReducer(newState, actions.data.toggleSelection('a'));
    expect(state).toEqual({
      ...currentState,
      selected: ['b', 'a'],
    });
  });

  test('should reset selections', () => {
    const oldState = {
      ...currentState,
      selected: ['b', 'c'],
    };
    const state = dataReducer(oldState, actions.data.resetSelections());
    expect(state).toEqual(currentState);
  });

  test('should add dateSlice', () => {
    const dateSlice = [
      {
        name: 'a',
        value: 10,
        date: '1980-01-01',
      },
      {
        name: 'b',
        value: 15,
        date: '1980-01-01',
      },
    ];
    const state = dataReducer(currentState, actions.data.addDateSlice('1980-01-01', dateSlice));
    expect(state).toEqual({
      ...currentState,
      dateSlices: {
        '1980-01-01': [...dateSlice],
      },
    });
  });

  test('should clear dateSlices', () => {
    const oldState = {
      ...currentState,
      dateSlices: {
        '1980-01-01': [
          {
            name: 'a',
            value: 10,
            date: '1980-01-01',
          },
          {
            name: 'b',
            value: 15,
            date: '1980-01-01',
          },
        ],
      },
    };
    const state = dataReducer(oldState, actions.data.clearDateSlices());
    expect(state).toEqual(currentState);
  });
});
