import { includes, is, validateOptions } from '../index';

test('Tests for "is" function', () => {
  expect(is(undefined, 'string')).toBe(false);

  expect(is(5, 'number')).toBe(true);
  expect(is('5', 'number')).toBe(false);
  expect(is(NaN, 'number')).toBe(false);

  expect(is([], 'array')).toBe(true);
  expect(is({}, 'array')).toBe(false);
  expect(is([1, 2, 3], 'array', 'number')).toBe(true);
  expect(is([1, '2', 3], 'array', 'number')).toBe(false);

  expect(is(true, 'boolean')).toBe(true);
  expect(is(false, 'boolean')).toBe(true);
  expect(is('true', 'boolean')).toBe(false);

  expect(is({}, 'object')).toBe(true);
  expect(is([], 'object')).toBe(true);

  expect(is('hello', 'string')).toBe(true);
  expect(is(5, 'string')).toBe(false);

  expect(is(() => 1, 'function')).toBe(true);
  expect(is({}, 'function')).toBe(false);
});

test('Tests for "includes" function', () => {
  const array = [1, 2, 3, 4, 5];

  expect(includes(array, 3)).toBe(true);
  expect(includes(array, 6)).toBe(false);
});

test('should validate boolean options', () => {
  const options: any = {
    makeCumulative: true,
    loop: false,
    showIcons: true,
    showGroups: false,
    mouseControls: true,
    keyboardControls: false,
    autorun: true,
    injectStyles: 10,
    fixedScale: 10,
    highlightBars: 'string',
    selectBars: 'string',
  };
  const validatedOptions = validateOptions(options);

  // Valid options
  expect(validatedOptions.makeCumulative).toBe(true);
  expect(validatedOptions.loop).toBe(false);
  expect(validatedOptions.showIcons).toBe(true);
  expect(validatedOptions.showGroups).toBe(false);
  expect(validatedOptions.mouseControls).toBe(true);
  expect(validatedOptions.keyboardControls).toBe(false);
  expect(validatedOptions.autorun).toBe(true);

  // Invalid options
  expect(validatedOptions.injectStyles).toBe(undefined);
  expect(validatedOptions.fixedScale).toBe(undefined);
  expect(validatedOptions.highlightBars).toBe(undefined);
  expect(validatedOptions.selectBars).toBe(undefined);
});

test('should validate number options', () => {
  const options: any = {
    labelsWidth: 100,
    tickDuration: 500,
    topN: 5,
    minHeight: 'string',
    minWidth: true,
  };
  const validatedOptions = validateOptions(options);

  // Valid options
  expect(validatedOptions.labelsWidth).toBe(100);
  expect(validatedOptions.tickDuration).toBe(500);
  expect(validatedOptions.topN).toBe(5);

  // Invalid options
  expect(validatedOptions.minHeight).toBe(undefined);
  expect(validatedOptions.minWidth).toBe(undefined);
});

test('Tests to validate string options', () => {
  const options: any = {
    theme: 'dark',
    startDate: '2022-12-31',
    endDate: 90,
  };
  const validatedOpts = validateOptions(options);

  // Valid options
  expect(validatedOpts.theme).toBe('dark');
  expect(validatedOpts.startDate).toBe('2022-12-31');

  // Invalid options
  expect(validatedOpts.endDate).toBe(undefined);
});

test('Tests to validate string or number options', () => {
  const options: any = {
    colorSeed: 'seed123',
    inputHeight: 100,
    inputWidth: '200',
    height: true,
    width: () => 0,
  };
  const validatedOpts = validateOptions(options);

  // Valid options
  expect(validatedOpts.colorSeed).toBe('seed123');
  expect(validatedOpts.inputHeight).toBe(100);
  expect(validatedOpts.inputWidth).toBe('200');

  // Invalid options
  expect(validatedOpts.height).toBe(undefined);
  expect(validatedOpts.width).toBe(undefined);
});

test('Tests to validate function or string options', () => {
  const options: any = {
    title: 'Chart Title',
    subTitle: () => 'Sub Title',
    dateCounter: 90,
    caption: true,
  };
  const validatedOpts = validateOptions(options);

  // Valid options
  expect(validatedOpts.title).toBe('Chart Title');
  expect(typeof validatedOpts.subTitle).toBe('function');

  // Invalid options
  expect(validatedOpts.dateCounter).toBe(undefined);
  expect(validatedOpts.caption).toBe(undefined);
});
