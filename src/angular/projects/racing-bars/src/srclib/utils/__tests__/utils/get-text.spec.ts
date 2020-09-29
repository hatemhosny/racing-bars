import { getText } from '../../utils';
import { Data } from '../../..';

describe('utils#getText', () => {
  const currentDate = '2020-02-01';
  const dateSlice = [] as Data[];
  const dates = ['2020-02-01', '2020-03-01', '2020-04-01'] as string[];

  test('getText: returns string', () => {
    expect(getText('hello', currentDate, dateSlice, dates)).toBe('hello');
  });

  test('getText: replaces date in string', () => {
    expect(getText('year: YYYY', currentDate, dateSlice, dates, true)).toBe('year: 2020');
  });

  test('getText: calls function with current data', () => {
    const fn = (currentDate: string, dateSlice: Data[], dates: string[]) =>
      JSON.stringify({ currentDate, dateSlice, dates });
    expect(getText(fn, currentDate, dateSlice, dates)).toBe(
      '{"currentDate":"2020-02-01","dateSlice":[],"dates":["2020-02-01","2020-03-01","2020-04-01"]}',
    );
  });
});
