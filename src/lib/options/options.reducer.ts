import { getDateString } from '../dates';
import { Options, OptionsAction } from './options.models';
import { actionTypes } from './options.actions';

const initialState: Options = {
  selector: '#race',
  dataShape: 'long',
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
  // loopDelay: 0,
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
      return {
        ...state,
        ...action.payload,
        startDate,
        endDate,
        inputHeight,
        inputWidth,
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
