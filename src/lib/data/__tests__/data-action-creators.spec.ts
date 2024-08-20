import {
  dataLoaded,
  addFilter,
  removeFilter,
  toggleFilter,
  resetFilters,
  allExceptFilter,
  addSelection,
  removeSelection,
  toggleSelection,
  resetSelections,
  addDateSlice,
  clearDateSlices,
} from '../data.actions';
import type { Data, DataCollections } from '../data.models';

describe('options action creators', () => {
  const dataCollections = {
    collection1: ['value1'],
    collection2: ['value2'],
  } as unknown as DataCollections;
  const data: Data[] = [
    { name: 'a', value: 10, date: '1980-01-01' },
    { name: 'b', value: 5, date: '1980-01-01' },
    { name: 'c', value: 15, date: '1980-01-01' },
  ];

  test('dataLoaded', () => {
    expect(dataLoaded(dataCollections)).toEqual({
      type: 'data/loaded',
      payload: dataCollections,
    });
  });

  test('addFilter', () => {
    expect(addFilter('A')).toEqual({
      type: 'data/addFilter',
      payload: 'A',
    });
  });

  test('removeFilter', () => {
    expect(removeFilter('A')).toEqual({
      type: 'data/removeFilter',
      payload: 'A',
    });
  });

  test('toggleFilter', () => {
    expect(toggleFilter('A')).toEqual({
      type: 'data/toggleFilter',
      payload: 'A',
    });
  });

  test('resetFilters', () => {
    expect(resetFilters()).toEqual({
      type: 'data/resetFilters',
    });
  });

  test('allExceptFilter', () => {
    expect(allExceptFilter('A')).toEqual({
      type: 'data/allExceptFilter',
      payload: 'A',
    });
  });

  test('addSelection', () => {
    expect(addSelection('a')).toEqual({
      type: 'data/addSelection',
      payload: 'a',
    });
  });

  test('removeSelection', () => {
    expect(removeSelection('a')).toEqual({
      type: 'data/removeSelection',
      payload: 'a',
    });
  });

  test('toggleSelection', () => {
    expect(toggleSelection('a')).toEqual({
      type: 'data/toggleSelection',
      payload: 'a',
    });
  });

  test('resetSelections', () => {
    expect(resetSelections()).toEqual({
      type: 'data/resetSelections',
    });
  });

  test('addDateSlice: empty', () => {
    expect(addDateSlice('1980-01-01', [])).toEqual({
      type: 'data/addDateSlice',
      payload: { '1980-01-01': [] },
      triggerRender: false,
    });
  });

  test('addDateSlice: data', () => {
    expect(addDateSlice('1980-01-01', data)).toEqual({
      type: 'data/addDateSlice',
      payload: { '1980-01-01': data },
      triggerRender: false,
    });
  });

  test('clearDateSlices', () => {
    expect(clearDateSlices()).toEqual({
      type: 'data/clearDateSlices',
    });
  });
});
