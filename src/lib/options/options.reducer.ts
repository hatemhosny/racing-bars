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
  disableKeyboardEvents: false,
  autorun: true,
  loop: false,
  // loopDelay: 0,
  injectStyles: true,
  title: '',
  subTitle: '',
  caption: '',
  dateCounter: 'MM/YYYY',
  labelsOnBars: true,
  labelsWidth: 100,
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
  highlightBars: false,
  selectBars: false,
};

export function optionsReducer(state = initialState, action: OptionsAction): Options {
  switch (action.type) {
    case actionTypes.optionsLoaded:
      const startDate = action.payload.startDate ? getDateString(action.payload.startDate) : '';
      const endDate = action.payload.endDate ? getDateString(action.payload.endDate) : '';
      const inputHeight = action.payload.height;
      const inputWidth = action.payload.width;
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
