import { getDateRange } from '../../dates';

describe('dates#getDateRange', () => {
  test('year intervals', () => {
    const startDate = new Date('1980-01-01');
    const endDate = new Date('2020-12-01');
    const dateRange = getDateRange(startDate, endDate, 'year');
    expect(dateRange[0]).toEqual(new Date('1980-01-01'));
    expect(dateRange[dateRange.length - 1]).toEqual(new Date('2020-12-01'));
    const noDuplicates = Array.from(new Set(dateRange));
    expect(dateRange.length).toBe(noDuplicates.length);
  });

  test.skip('month intervals', () => {
    const startDate = new Date('1980-01-01');
    const endDate = new Date('1981-12-01');
    const dateRange = getDateRange(startDate, endDate, 'month');
    // eslint-disable-next-line no-console
    console.log(dateRange);
    expect(dateRange[0]).toEqual(new Date('1980-01-01'));
    expect(dateRange[dateRange.length - 1]).toEqual(new Date('1981-12-01'));
    expect(dateRange.length).toBe(24);
  });

  test.skip('day intervals', () => {
    const startDate = new Date('1980-01-01');
    const endDate = new Date('1981-12-31');
    const dateRange = getDateRange(startDate, endDate, 'day');
    expect(dateRange[0]).toEqual(new Date('1980-01-01'));
    expect(dateRange[dateRange.length - 1]).toEqual(new Date('1981-12-31'));
    expect(dateRange.length).toBe(366 + 365);
  });
});
