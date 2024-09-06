import type { Action } from '../store';
import type { Data, WideData } from '../data';

export interface OptionsAction extends Action {
  payload: Partial<Options>;
}

export interface Options {
  dataShape: 'long' | 'wide' | 'auto';
  dataType: 'json' | 'csv' | 'tsv' | 'xml' | 'auto';
  dataTransform: null | ((data: Data[] | WideData[]) => Data[] | WideData[]);
  fillDateGapsInterval: null | 'year' | 'month' | 'day';
  fillDateGapsValue: 'last' | 'interpolate';
  labelsPosition: 'inside' | 'outside' | 'none';
  controlButtons: 'all' | 'play' | 'none';
  overlays: 'all' | 'play' | 'repeat' | 'none';

  makeCumulative: boolean;
  loop: boolean;
  showIcons: boolean;
  showGroups: boolean;
  mouseControls: boolean;
  keyboardControls: boolean;
  autorun: boolean;
  injectStyles: boolean;
  fixedScale: boolean;
  highlightBars: boolean;
  selectBars: boolean;

  labelsWidth: number;
  tickDuration: number;
  topN: number;
  minHeight: number;
  minWidth: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;

  startDate: string;
  endDate: string;
  theme: string;

  colorSeed: number | string;
  inputHeight: number | string;
  inputWidth: number | string;
  height: number | string;
  width: number | string;

  title: string | ((currentDate: string, dateSlice: Data[], allDates: string[]) => string);
  subTitle: string | ((currentDate: string, dateSlice: Data[], allDates: string[]) => string);
  dateCounter: string | ((currentDate: string, dateSlice: Data[], allDates: string[]) => string);
  caption: string | ((currentDate: string, dateSlice: Data[], allDates: string[]) => string);

  colorMap: { [key: string]: string } | string[];
  fixedOrder: string[];
}

export type TransformFn = (data: Data[] | WideData[]) => Data[] | WideData[];

export type ParamFunction = (currentDate: string, dateSlice: Data[], allDates: string[]) => string;
