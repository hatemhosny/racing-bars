import { formatDate } from '../../dates';

describe('dates#formatDate', () => {
  test('returns a string-formatted representation of given date', () => {
    expect(formatDate('1980-02-01')).toBe('1980-02-01');
    expect(formatDate('1980-02-01', 'YYYY')).toBe('1980');
    expect(formatDate('1980-02-01', 'MM')).toBe('02');
    expect(formatDate('1980-02-01', 'MMM')).toBe('Feb');
    expect(formatDate('1980-02-01', 'DDD')).toBe('Fri');
    expect(formatDate('1980-02-01', 'DD')).toBe('01');
    expect(formatDate('1980-02-01', 'Date: DDD - MMM, DD YYYY')).toBe('Date: Fri - Feb, 01 1980');
  });
});
