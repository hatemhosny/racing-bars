import { Action } from '../store';
import { Data, WideData } from '../data';

export interface OptionsAction extends Action {
  payload: Partial<Options>;
}

export interface Options {
  selector: string;
  dataShape: 'long' | 'wide';
  dataTransform: null | ((data: Data[] | WideData[]) => Data[] | WideData[]);
  fillDateGaps: false | 'years' | 'months' | 'days';
  fillDateGapsValue: 'last' | 'interpolate';
  title: string;
  subTitle: string;
  dateCounter: string | ParamFunction;
  startDate: string;
  endDate: string;
  loop: boolean;
  caption: string;
  labelsPosition: 'inside' | 'outside';
  labelsWidth: number;
  showIcons: boolean;
  colorSeed: string | number;
  showGroups: boolean;
  tickDuration: number;
  topN: number;
  inputHeight: string;
  inputWidth: string;
  minHeight: number;
  minWidth: number;
  height: string;
  width: string;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  disableClickEvents: boolean;
  disableKeyboardEvents: boolean;
  showControls: 'all' | 'play' | 'none';
  showOverlays: 'all' | 'play' | 'repeat' | 'none';
  autorun: boolean;
  injectStyles: boolean;
  theme: string;
  colorMap: { [key: string]: string } | string[];
  fixedScale: boolean;
  fixedOrder: string[];
  highlightBars: boolean;
  selectBars: boolean;
}

export type ParamFunction = (currentDate: string, dateSlice: Data[], allDates: string[]) => string;
