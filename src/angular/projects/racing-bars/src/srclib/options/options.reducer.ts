import { getDateString } from '../dates';
import { Options, OptionsAction } from './options.models';
import { actionTypes } from './options.actions';

export const defaultOptions: Options = {
  selector: '#race',
  dataShape: 'long',
  dataTransform: null,
  fillDateGapsInterval: null,
  fillDateGapsValue: 'interpolate',
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
  minWidth: 500,
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

export function optionsReducer(state = defaultOptions, action: OptionsAction): Options {
  switch (action.type) {
    case actionTypes.optionsLoaded: {
      const excludedKeys = ['inputHeight', 'inputWidth', 'minHeight', 'minWidth'];
      const options: Partial<Options> = {};

      // remove null, undefined and excluded keys
      (Object.keys(action.payload) as Array<keyof Options>).forEach((key) => {
        if (!excludedKeys.includes(key)) {
          (options[key] as any) = action.payload[key] ?? state[key];
        }
      });

      const startDate = options.startDate ? getDateString(options.startDate) : '';
      const endDate = options.endDate ? getDateString(options.endDate) : '';

      const inputHeight = options.height || state.inputHeight;
      const inputWidth = options.width || state.inputWidth;

      const fixedOrder = Array.isArray(options.fixedOrder)
        ? [...options.fixedOrder]
        : state.fixedOrder;

      const colorMap = Array.isArray(options.colorMap)
        ? ([...options.colorMap] as string[])
        : typeof options.colorMap === 'object'
        ? { ...options.colorMap }
        : state.colorMap;

      let topN = state.topN;
      if (Number(options.topN)) {
        topN = Number(options.topN);
      }
      if (fixedOrder.length > 0 && topN > fixedOrder.length) {
        topN = fixedOrder.length;
      }

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
    case actionTypes.changeOptions:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
