import { generateTestData } from '../../../__test-utils';
import { getDates } from '../../dates';

describe('dates#getDates', () => {
  const data = generateTestData('1980-01-01', '2020-12-01', 'year');
  test('returns an array of unique dates as strings sorted in ascending order', () => {
    const dates = getDates(data);
    expect(dates[0]).toBe('1980-01-01');
    expect(dates[dates.length - 1]).toBe('2020-12-01');
    const noDuplicates = Array.from(new Set(dates));
    expect(dates.length).toBe(noDuplicates.length);
  });
});
