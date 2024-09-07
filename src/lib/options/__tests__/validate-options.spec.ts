import { validateOptions } from '../index';

test('Tests to validate boolean options', () => {
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

test('Tests to validate number options', () => {
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

test('Tests to validate dataShape option', () => {
  // Valid options
  const options: any = { dataShape: 'long' };
  const validatedOpts = validateOptions(options);
  expect(validatedOpts.dataShape).toBe('long');

  // Invalid options
  options.dataShape = 'invalid';
  const invalidOpts = validateOptions(options);
  expect(invalidOpts.dataShape).toBeUndefined();
});

test('Tests to validate dataType option', () => {
  // Valid options
  const options: any = { dataType: 'json' };
  const validatedOpts = validateOptions(options);
  expect(validatedOpts.dataType).toBe('json');

  // Invalid options
  options.dataType = 'invalid';
  const invalidOpts = validateOptions(options);
  expect(invalidOpts.dataType).toBeUndefined();
});

test('Tests to validate labelsPosition option', () => {
  // Valid options
  const options: any = { labelsPosition: 'inside' };
  const validatedOpts = validateOptions(options);
  expect(validatedOpts.labelsPosition).toBe('inside');

  // Invalid options
  options.labelsPosition = 'invalid';
  const invalidOpts = validateOptions(options);
  expect(invalidOpts.labelsPosition).toBeUndefined();
});

test('Tests to validate controlButtons option', () => {
  // Valid options
  const options: any = { controlButtons: 'all' };
  const validatedOpts = validateOptions(options);
  expect(validatedOpts.controlButtons).toBe('all');

  // Invalid options
  options.controlButtons = 'invalid';
  const invalidOpts = validateOptions(options);
  expect(invalidOpts.controlButtons).toBeUndefined();
});

test('Tests to validate overlays option', () => {
  // Valid options
  const options: any = { overlays: 'play' };
  const validatedOpts = validateOptions(options);
  expect(validatedOpts.overlays).toBe('play');

  // Invalid options
  options.overlays = 'invalid';
  const invalidOpts = validateOptions(options);
  expect(invalidOpts.overlays).toBeUndefined();
});

test('Tests to validate fillDateGapsInterval option', () => {
  // Valid options
  const options: any = { fillDateGapsInterval: 'year' };
  const validatedOpts = validateOptions(options);
  expect(validatedOpts.fillDateGapsInterval).toBe('year');

  // Invalid options
  options.fillDateGapsInterval = 'invalid';
  const invalidOpts = validateOptions(options);
  expect(invalidOpts.fillDateGapsInterval).toBeUndefined();
});

test('Tests to validate fillDateGapsValue option', () => {
  // Valid options
  const options: any = { fillDateGapsValue: 'last' };
  const validatedOpts = validateOptions(options);
  expect(validatedOpts.fillDateGapsValue).toBe('last');

  // Invalid options
  options.fillDateGapsValue = 'invalid';
  const invalidOpts = validateOptions(options);
  expect(invalidOpts.fillDateGapsValue).toBeUndefined();
});

test('Tests to validate valueDecimals option', () => {
  // Valid options
  const options: any = { valueDecimals: 'preserve' };
  const validatedOpts = validateOptions(options);
  expect(validatedOpts.valueDecimals).toBe('preserve');

  // Valid options
  const options2: any = { valueDecimals: 2 };
  const validatedOpts2 = validateOptions(options2);
  expect(validatedOpts2.valueDecimals).toBe(2);

  // Invalid options
  options.valueDecimals = 'invalid';
  const invalidOpts = validateOptions(options);
  expect(invalidOpts.valueDecimals).toBeUndefined();
});

test('Tests to validate colorMap option', () => {
  // Valid options
  const options: any = { colorMap: ['blue', 'red'] };
  const validatedOpts = validateOptions(options);
  expect(validatedOpts.colorMap).toStrictEqual(['blue', 'red']);

  // Valid options
  const options2: any = {
    colorMap: {
      India: 'orange',
      'United States': 'blue',
    },
  };
  const validatedOpts2 = validateOptions(options2);
  expect(validatedOpts2.colorMap).toStrictEqual({
    India: 'orange',
    'United States': 'blue',
  });

  // Invalid options
  options.colorMap = 'invalid';
  const invalidOpts = validateOptions(options);
  expect(invalidOpts.colorMap).toBeUndefined();
});
