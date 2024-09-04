import { getDateString } from '../utils';
import type { Reducer } from '../store';
import type { Options, OptionsAction } from './options.models';
import { actionTypes } from './options.actions';

export const defaultOptions: Options = {
  dataShape: 'auto',
  dataType: 'auto',
  dataTransform: null,
  fillDateGapsInterval: null,
  fillDateGapsValue: 'interpolate',
  makeCumulative: false,
  startDate: '',
  endDate: '',
  colorSeed: '',
  showGroups: false,
  tickDuration: 500,
  topN: 10,
  mouseControls: false,
  keyboardControls: false,
  autorun: true,
  loop: false,
  injectStyles: true,
  title: '',
  subTitle: '',
  caption: '',
  dateCounter: 'MM/YYYY',
  labelsPosition: 'inside',
  labelsWidth: 150,
  showIcons: false,
  controlButtons: 'all',
  overlays: 'none',
  inputHeight: '',
  inputWidth: '',
  minHeight: 300,
  minWidth: 250,
  height: '',
  width: '',
  marginTop: 0,
  marginRight: 20,
  marginBottom: 5,
  marginLeft: 0,
  theme: 'light',
  colorMap: {},
  fixedScale: false,
  fixedOrder: [],
  highlightBars: false,
  selectBars: false,
};

export const optionsReducer: Reducer<Options, OptionsAction> = (state = defaultOptions, action) => {
  switch (action.type) {
    case actionTypes.loadOptions:
    case actionTypes.changeOptions: {
      const excludedKeys = ['inputHeight', 'inputWidth', 'minHeight', 'minWidth'];
      const options: Partial<Options> = {};

      // remove null, undefined and excluded keys
      (Object.keys(action.payload) as Array<keyof Options>).forEach((key) => {
        if (!excludedKeys.includes(key)) {
          (options[key] as any) = action.payload[key] ?? state[key];
        }
      });

      const startDate = options.startDate ? getDateString(options.startDate) : state.startDate;
      const endDate = options.endDate ? getDateString(options.endDate) : state.startDate;

      const inputHeight = options.height || state.inputHeight;
      const inputWidth = options.width || state.inputWidth;

      const fixedOrder = Array.isArray(options.fixedOrder)
        ? [...options.fixedOrder]
        : state.fixedOrder;

      const colorMap = Array.isArray(options.colorMap)
        ? [...options.colorMap].map(String)
        : typeof options.colorMap === 'object'
          ? { ...options.colorMap }
          : state.colorMap;

      const topN = fixedOrder.length || Number(options.topN) || state.topN;

      const tickDuration = Number(options.tickDuration) || state.tickDuration;
      const labelsWidth = Number(options.labelsWidth) || state.labelsWidth;
      const marginTop = Number(options.marginTop) || state.marginTop;
      const marginRight = Number(options.marginRight) || state.marginRight;
      const marginBottom = Number(options.marginBottom) || state.marginBottom;
      const marginLeft = Number(options.marginLeft) || state.marginLeft;

      return {
        ...state,
        ...options,
        startDate,
        endDate,
        inputHeight,
        inputWidth,
        fixedOrder,
        colorMap,
        topN,
        tickDuration,
        labelsWidth,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
      };
    }

    default:
      return state;
  }
};
