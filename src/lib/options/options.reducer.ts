import { getDateString } from '../dates';
import { Options, OptionsAction } from './options.models';
import { actionTypes } from './options.actions';

const initialState: Options = {
  selector: '#race',
  dataShape: 'long',
  dataTransform: null,
  fillDateGaps: false,
  fillDateGapsValue: 'interpolate',
  startDate: '',
  endDate: '',
  colorSeed: '',
  showGroups: true,
  tickDuration: 500,
  topN: 10,
  disableClickEvents: true,
  disableKeyboardEvents: true,
  autorun: true,
  loop: false,
  injectStyles: true,
  title: '',
  subTitle: '',
  caption: '',
  dateCounter: 'MM/YYYY',
  labelsOnBars: true,
  labelsWidth: 150,
  showIcons: false,
  showControls: 'all',
  showOverlays: 'none',
  inputHeight: '',
  inputWidth: '',
  minHeight: 300,
  minWidth: 500,
  height: '',
  width: '',
  theme: 'light',
  colorMap: {},
  fixedScale: false,
  fixedOrder: [],
  highlightBars: true,
  selectBars: true,
};

export function optionsReducer(state = initialState, action: OptionsAction): Options {
  switch (action.type) {
    case actionTypes.optionsLoaded:
      const startDate = action.payload.startDate ? getDateString(action.payload.startDate) : '';
      const endDate = action.payload.endDate ? getDateString(action.payload.endDate) : '';

      const inputHeight = action.payload.height || state.inputHeight;
      const inputWidth = action.payload.width || state.inputWidth;

      const fixedOrder = Array.isArray(action.payload.fixedOrder)
        ? action.payload.fixedOrder
        : state.fixedOrder;

      let topN = state.topN;
      if (Number(action.payload.topN)) {
        topN = Number(action.payload.topN);
      }
      if (fixedOrder.length > 0 && topN > fixedOrder.length) {
        topN = fixedOrder.length;
      }

      const tickDuration = Number(action.payload.tickDuration) || state.tickDuration;
      const labelsWidth = Number(action.payload.labelsWidth) || state.labelsWidth;
      return {
        ...state,
        ...action.payload,
        startDate,
        endDate,
        inputHeight,
        inputWidth,
        fixedOrder,
        topN,
        tickDuration,
        labelsWidth,
      };

    case actionTypes.changeOptions:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
