import { loadOptions, changeOptions } from '../options.actions';
import { Options } from '../options.models';

describe('options action creators', () => {
  const options = ({
    option1: 'value1',
    option2: ['value2'],
  } as unknown) as Options;

  test('loadOptions', () => {
    expect(loadOptions(options)).toEqual({
      type: 'options/load',
      payload: options,
    });
  });

  test('changeOptions', () => {
    expect(changeOptions(options)).toEqual({
      type: 'options/change',
      payload: options,
    });
  });
});
