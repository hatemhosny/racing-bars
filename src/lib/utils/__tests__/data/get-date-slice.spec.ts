import { getDateSlice } from '../../data';
import { generateTestData } from '../../../__test-utils';
import { Store } from '../../../store';

describe('dates#getDateSlice', () => {
  const mockDispatch = jest.fn();
  const mockStore = (opts: any = {}) =>
    ({
      getState: () => ({
        options: {
          fixedOrder: [],
        },
        data: {
          dateSlices: opts.dateSlices || {},
          groupFilter: opts.groupFilter || [],
        },
      }),
      dispatch: mockDispatch,
    } as unknown as Store);

  test('getDateSlice', () => {
    const date = '1985-01-01';
    const data = generateTestData('1980-01-01', '1990-01-01');
    const store = mockStore();
    const dateSlice = getDateSlice(date, data, store);

    expect(dateSlice).toBeTruthy();
    expect(dateSlice.length).toBeGreaterThan(0);
    expect(Array.from(new Set(dateSlice.map((d) => d.date)))).toEqual([date]);
    expect(dateSlice.map((d) => d.rank)).toEqual(Array.from(Array(dateSlice.length).keys()));
    expect(mockDispatch).toBeCalled();
  });

  test('getDateSlice groupFilter', () => {
    const date = '1985-01-01';
    const data = generateTestData('1980-01-01', '1990-01-01');
    const store = mockStore({ groupFilter: ['B', 'D', 'E'] });
    const dateSlice = getDateSlice(date, data, store);

    expect(dateSlice).toBeTruthy();
    expect(dateSlice.length).toBeGreaterThan(0);
    expect(Array.from(new Set(dateSlice.map((d) => d.date)))).toEqual([date]);
    expect(Array.from(new Set(dateSlice.map((d) => d.group)))).toEqual(['A', 'C']);
    expect(dateSlice.map((d) => d.rank)).toEqual(Array.from(Array(dateSlice.length).keys()));
    expect(mockDispatch).toBeCalled();
  });
});
