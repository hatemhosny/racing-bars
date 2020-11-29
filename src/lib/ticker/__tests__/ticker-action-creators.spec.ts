import {
  initialize,
  changeDates,
  updateDate,
  setRunning,
  setFirst,
  setLast,
  inc,
  dec,
} from '../ticker.actions';

describe('ticker action creators', () => {
  const dates = ['1980-01-01', '1980-02-01', '1980-03-01'];

  test('initialize', () => {
    expect(initialize(dates)).toEqual({
      type: 'ticker/initialize',
      payload: dates,
    });
  });

  test('changeDates', () => {
    expect(changeDates(dates)).toEqual({
      type: 'ticker/changeDates',
      payload: dates,
    });
  });

  test('updateDate', () => {
    expect(updateDate('1980-02-01')).toEqual({
      type: 'ticker/updateDate',
      payload: '1980-02-01',
    });
  });

  test('setRunning', () => {
    expect(setRunning(true)).toEqual({
      type: 'ticker/setRunning',
      payload: true,
    });
  });

  test('setFirst', () => {
    expect(setFirst()).toEqual({
      type: 'ticker/setFirst',
    });
  });

  test('setLast', () => {
    expect(setLast()).toEqual({
      type: 'ticker/setLast',
    });
  });

  test('inc', () => {
    expect(inc(5)).toEqual({
      type: 'ticker/inc',
      payload: 5,
    });
  });

  test('dec', () => {
    expect(dec(3)).toEqual({
      type: 'ticker/dec',
      payload: 3,
    });
  });
});
