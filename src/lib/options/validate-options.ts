import type { Options } from './index';

const boolOpts = [
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
] as const;
const numberOpts = [
  'labelsWidth',
  'tickDuration',
  'topN',
  'minHeight',
  'minWidth',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
] as const;
const strOpts = ['theme', 'startDate', 'endDate'] as const;
const strOrNumberOpts = ['colorSeed', 'inputHeight', 'inputWidth', 'height', 'width'] as const;
const strOrFuncOpts = ['title', 'subTitle', 'dateCounter', 'caption'] as const;

const validDataShapes = ['long', 'wide'];
const validDataTypes = ['json', 'csv', 'tsv', 'xml'];
const validLabelsPositions = ['inside', 'outside'];
const validControlButtons = ['all', 'play', 'none'];
const validOverlays = ['all', 'play', 'repeat', 'none'];
const validFillDateGapsIntervals = [null, 'year', 'month', 'day'];
const validFillDateGapsValues = ['last', 'interpolate'];

export function validateOptions(options: Partial<Options>): Partial<Options> {
  const newOptions: Partial<Options> = {};

  // Validate boolean options
  boolOpts.forEach((opt) => {
    if (!is(options[opt], 'boolean')) return;
    newOptions[opt] = options[opt];
  });

  // Validate number options
  numberOpts.forEach((opt) => {
    if (!is(options[opt], 'number')) return;
    newOptions[opt] = options[opt];
  });

  // Validate string options
  strOpts.forEach((opt) => {
    if (!is(options[opt], 'string')) return;
    newOptions[opt] = options[opt];
  });

  // Validate string or number options
  strOrNumberOpts.forEach((opt) => {
    if (!is(options[opt], 'string') && !is(options[opt], 'number')) return;
    newOptions[opt] = options[opt];
  });

  // Validate function or string options
  strOrFuncOpts.forEach((opt) => {
    if (!is(options[opt], 'string') && !is(options[opt], 'function')) return;
    newOptions[opt] = options[opt];
  });

  // Validate one of options
  if (includes(validDataShapes, options.dataShape)) {
    newOptions.dataShape = options.dataShape;
  }

  if (includes(validDataTypes, options.dataType)) {
    newOptions.dataType = options.dataType;
  }

  if (includes(validLabelsPositions, options.labelsPosition)) {
    newOptions.labelsPosition = options.labelsPosition;
  }

  if (includes(validControlButtons, options.controlButtons)) {
    newOptions.controlButtons = options.controlButtons;
  }

  if (includes(validOverlays, options.overlays)) {
    newOptions.overlays = options.overlays;
  }

  if (includes(validFillDateGapsIntervals, options.fillDateGapsInterval)) {
    newOptions.fillDateGapsInterval = options.fillDateGapsInterval;
  }

  if (includes(validFillDateGapsValues, options.fillDateGapsValue)) {
    newOptions.fillDateGapsValue = options.fillDateGapsValue;
  }

  // Validate array of options
  if (is(options.fixedOrder, 'array', 'string')) {
    newOptions.fixedOrder = options.fixedOrder;
  }

  // Other validations
  if (validateDataTransform(options.dataTransform)) {
    newOptions.dataTransform = options.dataTransform;
  }

  validateColorMap(options.colorMap);

  return newOptions;
}

function validateDataTransform(value: Options['dataTransform'] | undefined): boolean {
  if (typeof value === 'undefined') return false;

  if (value === null || typeof value === 'function') {
    return true;
  }

  return false;
}

function validateColorMap(value: string[] | { [key: string]: string } | undefined): boolean {
  if (typeof value === 'undefined') return false;
  if (value === null) return false;

  // Check if color map is array of string
  if (is(value, 'array', 'string')) return true;

  if (is(value, 'object')) {
    for (const [k, v] of Object.entries(value)) {
      if (!is(k, 'string')) return false;
      if (!is(v, 'string')) return false;
    }
  }

  return false;
}

type types = 'array' | 'boolean' | 'object' | 'number' | 'string' | 'undefined' | 'function';
export function is(value: any, type: types, arrayType?: types): boolean {
  if (typeof value === 'undefined') return false;

  if (type === 'number') {
    return typeof value === 'number' && !Number.isNaN(Number(value));
  }

  if (type === 'array') {
    if (!Array.isArray(value)) return false;
    if (!arrayType) return true;

    for (const val of value) if (!is(val, arrayType)) return false;

    return true;
  }

  if (type === 'object') {
    return value && typeof value === 'object';
  }

  return typeof value === type;
}

export function includes<T>(array: T[], value: T): boolean {
  if (typeof value === 'undefined') return false;
  return array.includes(value);
}
