import { Action } from '../store';

export interface OptionsAction extends Action {
  payload: Options;
}

export interface Options {
  dataShape: 'long' | 'wide';
  fillDateGaps: false | 'years' | 'months' | 'days';
  fillDateGapsValue: 'last' | 'zero';
  selector: string;
  title: string;
  subTitle: string;
  dateCounterFormat: string;
  startDate: string;
  endDate: string;
  loop: boolean;
  caption: string;
  labelsOnBars: boolean;
  labelsWidth: number;
  colorSeed: string;
  disableGroupColors: boolean;
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
}
