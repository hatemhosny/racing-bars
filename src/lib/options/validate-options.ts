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
    if (is(options[opt], 'boolean')) {
      newOptions[opt] = options[opt];
    } else if (is(options[opt], 'string')) {
      // Ignore typescript until option types is updated.
      // @ts-expect-error
      if (options[opt] === 'true' || options[opt] === 'false') {
        // @ts-expect-error
        newOptions[opt] = options[opt] === 'true';
      }
    }
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

  // Check if color map is object and every value within that object is a string
  return is(value, 'object') && Object.values(value).every((v) => typeof v === 'string');
}

type types = 'array' | 'boolean' | 'object' | 'number' | 'string' | 'undefined' | 'function';
function is(value: any, type: types, arrayType?: types): boolean {
  if (typeof value === 'undefined') return false;

  if (type === 'number') {
    return typeof value === 'number' && !isNaN(Number(value));
  }

  if (type === 'boolean') {
    return typeof value === 'boolean' || value === 'true' || value === 'false';
  }

  if (type === 'array') {
    if (!Array.isArray(value)) return false;
    if (!arrayType) return true;

    return value.every((val) => is(val, arrayType));
  }

  if (type === 'object') {
    return value !== null && typeof value === 'object';
  }

  return typeof value === type;
}

function includes(arr: any[], x: any) {
  return x != null && arr.includes(x);
}
