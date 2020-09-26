import { getNextDate } from '../../dates';

describe('dates#getNextDate', () => {
  test('return the next date from array of date strings', () => {
    const dates = [
      '1980-01-01',
      '1980-02-01',
      '1980-03-01',
      '1980-04-01',
      '1980-05-01',
      '1980-06-01',
      '1980-07-01',
      '1980-08-01',
      '1980-09-01',
      '1980-10-01',
      '1980-11-01',
      '1980-12-01',
    ];
    expect(getNextDate(dates, '1980-01-01')).toBe('1980-02-01');
    expect(getNextDate(dates, '')).toBe('1980-01-01');
    expect(getNextDate(dates, '1990-01-01')).toBe('1980-01-01');
    expect(getNextDate(dates, '1980-12-01')).toBe('1980-01-01');
  });
});
