import { getDateString } from '../dates';
import { Options, OptionsAction } from './options.models';
import { actionTypes } from './options.actions';

const initialState: Options = {
  selector: '#race',
  dataShape: 'long',
  fillDateGaps: false,
  fillDateGapsValue: 'last',
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
  injectStyles: true,
  title: '18 years of Top Global Brands',
  subTitle: 'Brand value, $m',
  caption: 'Source: Interbrand',
  dateCounter: 'MM/YYYY',
  labelsOnBars: true,
  labelsWidth: 100,
  showControls: 'all',
  showOverlays: 'all',
  inputHeight: '',
  inputWidth: '',
  minHeight: 300,
  minWidth: 500,
  height: '',
  width: '',
};

export function optionsReducer(state = initialState, action: OptionsAction): Options {
  switch (action.type) {
    // initial processing of input options
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

    // change options from code e.g. change height and width on resize
    case actionTypes.changeOptions:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
