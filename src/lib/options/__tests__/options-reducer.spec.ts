import { optionsReducer, defaultOptions } from '..';
import { actions } from '../../store';
import { Options } from '../options.models';

describe('options', () => {
  test('should use defaultOptions', () => {
    const state = optionsReducer(defaultOptions, actions.options.loadOptions({}));
    expect(state).toBeDefined();
    expect(Object.keys(state)).toEqual(Object.keys(defaultOptions));
  });

  test('should exclude null, undefined and excluded options, yet keep false and empty strings', () => {
    const options: Partial<Options> = {
      showGroups: null as unknown as undefined,
      labelsPosition: undefined,
      autorun: false,
      loop: false,
      title: '',
      dateCounter: '',
      inputHeight: '10',
      inputWidth: '10',
      minHeight: 10,
      minWidth: 10,
    };
    const state = optionsReducer(defaultOptions, actions.options.loadOptions(options));

    expect(state.showGroups).toBe(defaultOptions.showGroups);
    expect(state.labelsPosition).toBe(defaultOptions.labelsPosition);
    expect(state.autorun).toBe(false);
    expect(state.loop).toBe(false);
    expect(state.title).toBe('');
    expect(state.dateCounter).toBe('');
    expect(state.inputHeight).toBe(defaultOptions.inputHeight);
    expect(state.inputWidth).toBe(defaultOptions.inputWidth);
    expect(state.minHeight).toBe(defaultOptions.minHeight);
    expect(state.minWidth).toBe(defaultOptions.minWidth);
  });

  test('should validate user input', () => {
    const options: Partial<Options> = {
      startDate: '1980-01-01',
      endDate: new Date('2020-01-01') as unknown as string,
      height: '10',
      width: '10',
      fixedOrder: ['a', 'b', 'c'],
      colorMap: { a: 'red', b: 'blue', c: 'yellow' },
      tickDuration: '600' as unknown as number,
      labelsWidth: 250,
    };
    const state = optionsReducer(defaultOptions, actions.options.loadOptions(options));

    expect(state.startDate).toBe('1980-01-01');
    expect(state.endDate).toBe('2020-01-01');
    expect(state.inputHeight).toBe('10');
    expect(state.inputWidth).toBe('10');
    expect(state.fixedOrder).toEqual(['a', 'b', 'c']);
    expect(state.colorMap).toEqual({ a: 'red', b: 'blue', c: 'yellow' });
    expect(typeof state.tickDuration).toBe('number');
    expect(typeof state.labelsWidth).toBe('number');
  });

  test('should use topN if no fixedOrder was supplied', () => {
    const options: Partial<Options> = {
      topN: 7,
    };
    const state = optionsReducer(defaultOptions, actions.options.loadOptions(options));

    expect(state.topN).toBe(7);
  });

  test('should set topN to fixedOrder.length if supplied', () => {
    const options: Partial<Options> = {
      fixedOrder: ['a', 'b', 'c'],
      topN: 7,
    };
    const state = optionsReducer(defaultOptions, actions.options.loadOptions(options));

    expect(state.topN).toBe(3);
  });
});
