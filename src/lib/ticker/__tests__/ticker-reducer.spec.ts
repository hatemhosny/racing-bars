import { tickerReducer, type TickerState } from '..';
import { actions } from '../../store';

describe('ticker reducer', () => {
  const noState = undefined as unknown as TickerState;
  const dates = ['1980-01-01', '1980-02-01', '1980-03-01'];
  const currentState = {
    isRunning: false,
    currentDate: '1980-01-01',
    isFirstDate: true,
    isLastDate: false,
    dates,
  };

  test('should initialize the ticker state', () => {
    const state = tickerReducer(noState, actions.ticker.initialize(dates));
    expect(state).toEqual({
      isRunning: false,
      currentDate: '1980-01-01',
      isFirstDate: true,
      isLastDate: false,
      dates,
    });
  });

  test('should change dates and maintain currentDate', () => {
    const newDates = [
      '1979-10-01',
      '1979-11-01',
      '1979-12-01',
      '1980-01-01',
      '1980-02-01',
      '1980-03-01',
    ];
    const state = tickerReducer(currentState, actions.ticker.changeDates(newDates));
    expect(state).toEqual({
      isRunning: false,
      currentDate: '1980-01-01',
      isFirstDate: false,
      isLastDate: false,
      dates: newDates,
    });
  });

  test('when changing dates, if currentDate > new dates, set to last date', () => {
    const oldDates = [
      '1979-10-01',
      '1979-11-01',
      '1979-12-01',
      '1980-01-01',
      '1980-02-01',
      '1980-03-01',
    ];
    const newDates = ['1979-10-01', '1979-11-01', '1979-12-01'];
    const oldState = {
      isRunning: true,
      currentDate: '1980-01-01',
      isFirstDate: false,
      isLastDate: false,
      dates: oldDates,
    };
    const state = tickerReducer(oldState, actions.ticker.changeDates(newDates));
    expect(state).toEqual({
      isRunning: true,
      currentDate: '1979-12-01',
      isFirstDate: false,
      isLastDate: true,
      dates: newDates,
    });
  });

  test('when changing dates, if currentDate < new dates, set to first date', () => {
    const oldDates = [
      '1979-10-01',
      '1979-11-01',
      '1979-12-01',
      '1980-01-01',
      '1980-02-01',
      '1980-03-01',
    ];
    const newDates = ['1981-01-01', '1981-02-01', '1981-03-01'];
    const oldState = {
      isRunning: true,
      currentDate: '1980-01-01',
      isFirstDate: false,
      isLastDate: false,
      dates: oldDates,
    };
    const state = tickerReducer(oldState, actions.ticker.changeDates(newDates));
    expect(state).toEqual({
      isRunning: true,
      currentDate: '1981-01-01',
      isFirstDate: true,
      isLastDate: false,
      dates: newDates,
    });
  });

  test('when changing dates, if currentDate is not in new dates but in its range, set to next date in array', () => {
    const oldDates = [
      '1979-10-01',
      '1979-11-01',
      '1979-12-01',
      '1980-01-01',
      '1980-02-01',
      '1980-03-01',
    ];
    const newDates = ['1979-01-01', '1980-01-01', '1981-01-01'];
    const oldState = {
      isRunning: true,
      currentDate: '1979-11-01',
      isFirstDate: false,
      isLastDate: false,
      dates: oldDates,
    };
    const state = tickerReducer(oldState, actions.ticker.changeDates(newDates));
    expect(state).toEqual({
      isRunning: true,
      currentDate: '1980-01-01',
      isFirstDate: false,
      isLastDate: false,
      dates: newDates,
    });
  });

  test('should update currentDate', () => {
    const newDate = '1980-02-01';
    const state = tickerReducer(currentState, actions.ticker.updateDate(newDate));
    expect(state).toEqual({
      isRunning: false,
      currentDate: '1980-02-01',
      isFirstDate: false,
      isLastDate: false,
      dates,
    });
  });

  test('should not update currentDate if not in dates array', () => {
    const newDate = '1990-02-01';
    const state = tickerReducer(currentState, actions.ticker.updateDate(newDate));
    expect(state).toEqual({
      isRunning: false,
      currentDate: '1980-01-01',
      isFirstDate: true,
      isLastDate: false,
      dates,
    });
  });

  test('should allow setting running status', () => {
    let state = tickerReducer(currentState, actions.ticker.setRunning(true));
    expect(state).toEqual({
      ...currentState,
      isRunning: true,
    });
    state = tickerReducer(state, actions.ticker.setRunning(false));
    expect(state).toEqual({
      ...state,
      isRunning: false,
    });
  });

  test('should allow setting current date to first date', () => {
    const oldState = {
      isRunning: true,
      currentDate: '1980-02-01',
      isFirstDate: false,
      isLastDate: false,
      dates,
    };
    const state = tickerReducer(oldState, actions.ticker.setFirst());
    expect(state).toEqual({
      isRunning: true,
      currentDate: '1980-01-01',
      isFirstDate: true,
      isLastDate: false,
      dates,
    });
  });

  test('should allow setting current date to last date', () => {
    const oldState = {
      isRunning: true,
      currentDate: '1980-02-01',
      isFirstDate: false,
      isLastDate: false,
      dates,
    };
    const state = tickerReducer(oldState, actions.ticker.setLast());
    expect(state).toEqual({
      isRunning: true,
      currentDate: '1980-03-01',
      isFirstDate: false,
      isLastDate: true,
      dates,
    });
  });

  test('should increment 1 if no value is given', () => {
    const state = tickerReducer(currentState, actions.ticker.inc());
    expect(state).toEqual({
      isRunning: false,
      currentDate: '1980-02-01',
      isFirstDate: false,
      isLastDate: false,
      dates,
    });
  });

  test('should increment by value', () => {
    const state = tickerReducer(currentState, actions.ticker.inc(2));
    expect(state).toEqual({
      isRunning: false,
      currentDate: '1980-03-01',
      isFirstDate: false,
      isLastDate: true,
      dates,
    });
  });

  test('should increment to last date if value exceeds it', () => {
    const state = tickerReducer(currentState, actions.ticker.inc(5));
    expect(state).toEqual({
      isRunning: false,
      currentDate: '1980-03-01',
      isFirstDate: false,
      isLastDate: true,
      dates,
    });
  });

  test('should decrement 1 if no value is given', () => {
    const oldState = {
      isRunning: true,
      currentDate: '1980-03-01',
      isFirstDate: false,
      isLastDate: true,
      dates,
    };
    const state = tickerReducer(oldState, actions.ticker.dec());
    expect(state).toEqual({
      isRunning: true,
      currentDate: '1980-02-01',
      isFirstDate: false,
      isLastDate: false,
      dates,
    });
  });

  test('should decrement by value', () => {
    const oldState = {
      isRunning: true,
      currentDate: '1980-03-01',
      isFirstDate: false,
      isLastDate: true,
      dates,
    };
    const state = tickerReducer(oldState, actions.ticker.dec(2));
    expect(state).toEqual({
      isRunning: true,
      currentDate: '1980-01-01',
      isFirstDate: true,
      isLastDate: false,
      dates,
    });
  });

  test('should decrement to first date if value exceeds it', () => {
    const oldState = {
      isRunning: true,
      currentDate: '1980-03-01',
      isFirstDate: false,
      isLastDate: true,
      dates,
    };
    const state = tickerReducer(oldState, actions.ticker.dec(5));
    expect(state).toEqual({
      isRunning: true,
      currentDate: '1980-01-01',
      isFirstDate: true,
      isLastDate: false,
      dates,
    });
  });

  test('should return the same state if action is not recognized', () => {
    const state = tickerReducer(currentState, {} as any);
    expect(state).toEqual(currentState);
  });
});
