import { getDateString } from '../../dates';

describe('dates#getDateString', () => {
  test('returns a string representation of given date', () => {
    expect(getDateString('1980-01-01')).toBe('1980-01-01');
    expect(getDateString(new Date('1980-01-01'))).toBe('1980-01-01');
    expect(getDateString(new Date(1980, 0, 1))).toBe('1980-01-01');
    expect(getDateString(new Date('1980-12-31'))).toBe('1980-12-31');
    expect(getDateString(new Date(1980, 11, 31))).toBe('1980-12-31');
    expect(() => getDateString('hello')).toThrow();
  });
});
