import type { HSLColor } from 'd3';
import { getColor } from '../../utils';
import type { Data } from '../../..';
import type { Store } from '../../../store';
import { defaultOptions } from '../../../options';

describe('utils#getColor', () => {
  const storeDefaults: any = {
    names: [],
    groups: [],
    showGroups: defaultOptions.showGroups,
    colorSeed: defaultOptions.colorSeed,
    colorMap: defaultOptions.colorMap,
  };
  const mockStore = (opts: any = {}) =>
    ({
      getState() {
        return {
          data: {
            names: opts.names ?? storeDefaults.names,
            groups: opts.groups ?? storeDefaults.groups,
          },
          options: {
            showGroups: opts.showGroups ?? storeDefaults.showGroups,
            colorSeed: opts.colorSeed ?? storeDefaults.colorSeed,
            colorMap: opts.colorMap ?? storeDefaults.colorMap,
          },
        };
      },
    } as unknown as Store);

  const dataDefaults = {
    name: 'a',
    value: 10,
    date: '2020-02-01',
    group: '',
    color: '',
  };
  const makeDataObj = (data?: Partial<Data>) =>
    ({
      ...dataDefaults,
      ...data,
    } as Data);

  test('uses data.color', () => {
    const data = makeDataObj({ color: 'red' });
    const store = mockStore();
    const color = getColor(data, store);
    expect(color).toBe('red');
  });

  test('uses colorMap object', () => {
    const data = makeDataObj({ name: 'a' });
    const store = mockStore({ colorMap: { a: 'blue' } });
    const color = getColor(data, store);
    expect(color).toBe('blue');
  });

  test('uses colorMap array', () => {
    const data = makeDataObj({ name: 'a' });
    const store = mockStore({ names: ['a', 'b'], colorMap: ['yellow', 'blue'] });
    const color = getColor(data, store);
    expect(color).toBe('yellow');
  });

  test('uses colorMap object for group', () => {
    const data = makeDataObj({ name: 'a', group: 'A' });
    const store = mockStore({ groups: ['A', 'B'], showGroups: true, colorMap: { A: 'blue' } });
    const color = getColor(data, store);
    expect(color).toBe('blue');
  });

  test('uses colorMap array for group', () => {
    const data = makeDataObj({ name: 'a', group: 'A' });
    const store = mockStore({ groups: ['A', 'B'], showGroups: true, colorMap: ['yellow', 'blue'] });
    const color = getColor(data, store);
    expect(color).toBe('yellow');
  });

  test('else return consistent HSLColor', () => {
    const data = makeDataObj();
    const store = mockStore();
    const color = getColor(data, store);
    expect(color).toHaveProperty('h');
    expect(color).toHaveProperty('s');
    expect(color).toHaveProperty('l');
    expect(color).toHaveProperty('opacity');
    expect(color).toEqual(getColor(data, store));
    expect((color as HSLColor).h).toBeGreaterThanOrEqual(0);
    expect((color as HSLColor).h).toBeLessThanOrEqual(360);
    expect((color as HSLColor).s).toBe(0.75);
  });
});
