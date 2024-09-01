import type { Data, WideData } from '../data';
import { validateOptions } from '../race';

describe('Tests for validateOptions', () => {
  // Boolean options
  test('Tests for validating boolean options', () => {
    const booleanOptions = [
      'makeCumulative',
      'loop',
      'showIcons',
      'showGroups',
      'mouseControls',
      'keyboardControls',
      'autorun',
      'injectStyles',
      'highlightBars',
      'selectBars',
      'fixedScale',
    ];

    booleanOptions.forEach((option) => {
      // Test valid values
      expect(() => validateOptions({ [option]: true })).not.toThrow();
      expect(() => validateOptions({ [option]: false })).not.toThrow();

      // Test invalid values
      const opt = { [option]: 'not boolean' };
      const msg = `Invalid ${option}: not boolean. Must be a boolean.`;
      isInvalidOpt(opt, msg);
    });
  });

  // Number options
  test('Tests for validating number options', () => {
    const numberOptions = [
      'labelsWidth',
      'tickDuration',
      'topN',
      'minHeight',
      'minWidth',
      'marginTop',
      'marginRight',
      'marginBottom',
      'marginLeft',
    ];

    numberOptions.forEach((option) => {
      // Test valid values
      expect(() => validateOptions({ [option]: 100 })).not.toThrow();

      // Test invalid values
      const opt = { [option]: 'not number' };
      const msg = `Invalid ${option}: not number. Must be a number.`;
      isInvalidOpt(opt, msg);
    });
  });

  // String options
  test('Tests for validating string options', () => {
    const stringOptions = ['theme', 'startDate', 'endDate'];

    stringOptions.forEach((option) => {
      // Test valid values
      expect(() => validateOptions({ [option]: 'string' })).not.toThrow();

      // Test invalid values
      const opt = { [option]: 123 };
      const msg = `Invalid ${option}: 123. Must be a string.`;
      isInvalidOpt(opt, msg);
    });
  });

  // String or number options
  test('Tests for validating string or number options', () => {
    const stringOrNumberOptions = ['colorSeed', 'inputHeight', 'inputWidth', 'height', 'width'];

    stringOrNumberOptions.forEach((option) => {
      // Test valid values
      expect(() => validateOptions({ [option]: 'valid-string' })).not.toThrow();
      expect(() => validateOptions({ [option]: 123 })).not.toThrow();

      // Test invalid values
      const opt = { [option]: true };
      const msg = `Invalid ${option}: true. Must be a number or a string.`;
      isInvalidOpt(opt, msg);
    });
  });

  // One of options
  test('Tests for validating dataShape option', () => {
    // Test valid values
    expect(() => validateOptions({ dataShape: 'long' })).not.toThrow();
    expect(() => validateOptions({ dataShape: 'wide' })).not.toThrow();

    // Test invalid values
    const opt = { dataShape: 'invalid' };
    const msg = 'Invalid dataShape: invalid. Must be one of [long, wide].';
    isInvalidOpt(opt, msg);
  });

  test('Tests for validating dataType option', () => {
    // Test valid values
    (['json', 'csv', 'tsv', 'xml'] as const).forEach((type) => {
      expect(() => validateOptions({ dataType: type })).not.toThrow();
    });

    // Test invalid values
    const opt = { dataType: 'invalid' };
    const msg = 'Invalid dataType: invalid. Must be one of [json, csv, tsv, xml].';
    isInvalidOpt(opt, msg);
  });

  test('Tests for validating labelsPosition option', () => {
    // Test valid values
    expect(() => validateOptions({ labelsPosition: 'inside' })).not.toThrow();
    expect(() => validateOptions({ labelsPosition: 'outside' })).not.toThrow();

    // Test invalid values
    const opt = { labelsPosition: 'invalid' };
    const msg = 'Invalid labelsPosition: invalid. Must be one of [inside, outside].';
    isInvalidOpt(opt, msg);
  });

  test('Tests for validating controlButtons option', () => {
    // Test valid values
    (['all', 'play', 'none'] as const).forEach((option) => {
      expect(() => validateOptions({ controlButtons: option })).not.toThrow();
    });

    // Test invalid values
    const opt = { controlButtons: 'invalid' };
    const msg = 'Invalid controlButtons: invalid. Must be one of [all, play, none].';
    isInvalidOpt(opt, msg);
  });

  test('Tests for validating overlays option', () => {
    // Test valid values
    (['all', 'play', 'repeat', 'none'] as const).forEach((option) => {
      expect(() => validateOptions({ overlays: option })).not.toThrow();
    });

    // Test invalid values
    const opt = { overlays: 'invalid' };
    const msg = 'Invalid overlays: invalid. Must be one of [all, play, repeat, none].';
    isInvalidOpt(opt, msg);
  });

  test('Tests for validating fillDateGapsInterval option', () => {
    // Test valid values
    ([null, 'year', 'month', 'day'] as const).forEach((option) => {
      expect(() => validateOptions({ fillDateGapsInterval: option })).not.toThrow();
    });

    // Test invalid values
    const opt = { fillDateGapsInterval: 'invalid' };
    const msg = 'Invalid fillDateGapsInterval: invalid. Must be one of [, year, month, day].';
    isInvalidOpt(opt, msg);
  });

  test('Tests for validating fillDateGapsValue option', () => {
    // Test valid values
    expect(() => validateOptions({ fillDateGapsValue: 'last' })).not.toThrow();
    expect(() => validateOptions({ fillDateGapsValue: 'interpolate' })).not.toThrow();

    // Test invalid values
    const opt = { fillDateGapsValue: 'invalid' };
    const msg = 'Invalid fillDateGapsValue: invalid. Must be one of [last, interpolate].';
    isInvalidOpt(opt, msg);
  });

  // Array options
  test('Tests for validating fixedOrder option', () => {
    // Test valid values
    expect(() => validateOptions({ fixedOrder: ['a', 'b', 'c'] })).not.toThrow();

    // Test invalid values
    const opt1 = { fixedOrder: 'not array' };
    const msg1 = "Invalid fixedOrder: not array. Must be an array of 'string'.";
    isInvalidOpt(opt1, msg1);

    const opt2 = { fixedOrder: [1, 2, 3] };
    const msg2 = "Invalid fixedOrder. All array items must be 'string'. '1' is not.";
    isInvalidOpt(opt2, msg2);
  });

  // Function or string options
  test('Tests for validating function or string options', () => {
    const funcOrStringOptions = ['title', 'subTitle', 'dateCounter', 'caption'];

    funcOrStringOptions.forEach((option) => {
      // Test valid values
      expect(() => validateOptions({ [option]: 'valid-string' })).not.toThrow();

      // Test invalid values
      const opt = { [option]: 123 };
      const msg = `Invalid ${option}: 123. Must be a string or a function.`;
      isInvalidOpt(opt, msg);
    });
  });

  // dataTransform option
  test('Tests for validating dataTransform option', () => {
    // Test valid values
    expect(() => validateOptions({ dataTransform: null })).not.toThrow();
    expect(() =>
      validateOptions({
        dataTransform: (data: Data[] | WideData[]) => data,
      }),
    ).not.toThrow();

    // Test invalid values
    const opt = { dataTransform: 'not function' };
    const msg = 'Invalid dataTransform: not function. Must be a null or a function.';
    isInvalidOpt(opt, msg);
  });

  // colorMap option
  test('Tests for validating colorMap option', () => {
    // Test valid values
    expect(() => validateOptions({ colorMap: ['red', 'blue', 'green'] })).not.toThrow();
    expect(() => validateOptions({ colorMap: { a: 'red', b: 'blue' } })).not.toThrow();

    // Test invalid values
    const opt1 = { colorMap: null };
    const msg1 = 'Invalid colorMap. It cannot be null.';
    isInvalidOpt(opt1, msg1);

    const opt2 = { colorMap: 'not object orarray' };
    const msg2 = 'Invalid colorMap: not object orarray. Must be an object or an array.';
    isInvalidOpt(opt2, msg2);

    const opt3 = { colorMap: [1, 2, 3] };
    const msg3 = "Invalid colorMap. All array items must be 'string'. '1' is not.";
    isInvalidOpt(opt3, msg3);

    const opt4 = { colorMap: { a: 123 } };
    const msg4 = "Invalid colorMap: { a: 123 }. All values must be strings. '123' is not.";
    isInvalidOpt(opt4, msg4);
  });
});

function isInvalidOpt(options: any, errorMessage: string) {
  expect(() => validateOptions(options)).toThrow(errorMessage);
}
