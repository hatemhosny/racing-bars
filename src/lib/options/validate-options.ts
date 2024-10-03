import type { Options } from './index';
import { Palette } from './palette';

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
] as const satisfies Array<keyof Options>;
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
] as const satisfies Array<keyof Options>;
const strOpts = ['theme', 'startDate', 'endDate'] as const satisfies Array<keyof Options>;
const strOrNumberOpts = [
  'colorSeed',
  'inputHeight',
  'inputWidth',
  'height',
  'width',
] as const satisfies Array<keyof Options>;
const strOrFuncOpts = ['title', 'subTitle', 'dateCounter', 'caption'] as const satisfies Array<
  keyof Options
>;

const validDataShapes: Array<Options['dataShape']> = ['long', 'wide', 'auto'];
const validDataTypes: Array<Options['dataType']> = ['json', 'csv', 'tsv', 'xml', 'auto'];
const validLabelsPositions: Array<Options['labelsPosition']> = ['inside', 'outside', 'none'];
const validControlButtons: Array<Options['controlButtons']> = ['all', 'play', 'none'];
const validOverlays: Array<Options['overlays']> = ['all', 'play', 'repeat', 'none'];
const validFillDateGapsIntervals: Array<Options['fillDateGapsInterval']> = [
  null,
  'year',
  'month',
  'day',
];
const validFillDateGapsValues: Array<Options['fillDateGapsValue']> = ['last', 'interpolate'];

const paletteSet: Set<Palette> = new Set([
  'deep', 'deep6', 'muted', 'muted6',
  'pastel', 'pastel6', 'bright', 'bright6',
  'dark', 'dark6', 'colorblind', 'colorblind6'
]);

export function validateOptions(options: Partial<Options>): Partial<Options> {
  const newOptions: Partial<Options> = {};

  // Validate boolean options
  boolOpts.forEach((opt) => {
    if (is(options[opt], 'boolean')) {
      newOptions[opt] = options[opt];
    } else if (is(options[opt], 'string')) {
      const booleanOption = options[opt] as unknown;
      if (booleanOption === 'true' || booleanOption === 'false') {
        newOptions[opt] = booleanOption === 'true';
      }
    }
  });

  // Validate number options
  numberOpts.forEach((opt) => {
    if (!is(options[opt], 'number')) return;
    newOptions[opt] = Number(options[opt]);
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

  if (options.valueDecimals === 'preserve') {
    newOptions.valueDecimals = 'preserve';
  }
  if (is(options.valueDecimals, 'number')) {
    newOptions.valueDecimals = Number(options.valueDecimals);
  }

  // Validate array of options
  if (is(options.fixedOrder, 'array', 'string')) {
    newOptions.fixedOrder = options.fixedOrder;
  }

  // Other validations
  if (validateDataTransform(options.dataTransform)) {
    newOptions.dataTransform = options.dataTransform;
  }

  if (validateColorMap(options.colorMap)) {
    newOptions.colorMap = options.colorMap;
  }

  return newOptions;
}

function validateDataTransform(value: Options['dataTransform'] | undefined): boolean {
  if (typeof value === 'undefined') return false;

  if (value === null || typeof value === 'function') {
    return true;
  }

  return false;
}

function validateColorMap(value: string[] | { [key: string]: string } | Palette | undefined): boolean {
  if (typeof value === 'undefined' || value === null) return false;

  // Check if value is one of the defined Palettes
  if (typeof value === 'string' && paletteSet.has(value as Palette)) {
    return true;
  }

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
