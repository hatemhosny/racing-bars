import type { Data } from '..';
import { getDateRange, getDateString } from '../utils';

export const generateTestData = (
  startDate = '1980-01-01',
  endDate = '2020-12-01',
  interval: 'year' | 'month' | 'day' = 'year',
) => {
  const dates = getDateRange(new Date(startDate), new Date(endDate), interval).map(getDateString);
  const names = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  const groups = ['A', 'B', 'C', 'D', 'E', 'F'];
  const data: Data[] = [];
  const values: any = {};
  let value = 3;
  dates.forEach((date) => {
    names.forEach((name) => {
      if (values[name]) {
        values[name] += (names.indexOf(name) + 7) * value;
      } else {
        values[name] = (names.indexOf(name) + 1) * 30;
      }
      value = value % 3 === 0 ? value + 3 : value - 2;
      data.push({
        name,
        value: values[name],
        date,
        group: groups[names.indexOf(name) % 5],
      });
    });
  });
  return data;
};
