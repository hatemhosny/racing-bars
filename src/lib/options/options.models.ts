import { Action } from '../store';
import { Data } from '../data';

export interface OptionsAction extends Action {
  payload: Options | RequiredOptions;
}

export interface RequiredOptions {
  [key: string]: any;
  selector: string;
}
export interface Options {
  selector: string;
  dataShape: 'long' | 'wide';
  fillDateGaps: false | 'years' | 'months' | 'days';
  fillDateGapsValue: 'last' | 'interpolate';
  title: string;
  subTitle: string;
  dateCounter: string | ParamFunction;
  startDate: string;
  endDate: string;
  loop: boolean;
  caption: string;
  labelsOnBars: boolean;
  labelsWidth: number;
  showIcons: boolean;
  colorSeed: string;
  showGroups: boolean;
  tickDuration: number;
  topN: number;
  inputHeight: string;
  inputWidth: string;
  minHeight: number;
  minWidth: number;
  height: string;
  width: string;
  disableClickEvents: boolean;
  disableKeyboardEvents: boolean;
  showControls: 'all' | 'play' | 'none';
  showOverlays: 'all' | 'play' | 'repeat' | 'none';
  autorun: boolean;
  injectStyles: boolean;
  theme: string;
  colorMap: { [key: string]: string };
  fixedScale: boolean;
  highlightBars: boolean;
  selectBars: boolean;
}

export type ParamFunction = (currentDate: string, dateSlice: Data[], allDates: string[]) => string;
