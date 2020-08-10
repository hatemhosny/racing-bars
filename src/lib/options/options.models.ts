import { Action } from '../store';
import { Data, WideData } from '../data';

export interface OptionsAction extends Action {
  payload: Partial<Options>;
}

export class Options {
  public selector!: string;
  public dataShape!: 'long' | 'wide';
  public dataTransform!: null | ((data: Data[] | WideData[]) => Data[] | WideData[]);
  public fillDateGapsInterval!: null | 'year' | 'month' | 'day';
  public fillDateGapsValue!: 'last' | 'interpolate';
  public title!: string;
  public subTitle!: string;
  public dateCounter!: string | ParamFunction;
  public startDate!: string;
  public endDate!: string;
  public loop!: boolean;
  public caption!: string;
  public labelsPosition!: 'inside' | 'outside';
  public labelsWidth!: number;
  public showIcons!: boolean;
  public colorSeed!: string | number;
  public showGroups!: boolean;
  public tickDuration!: number;
  public topN!: number;
  public inputHeight!: string;
  public inputWidth!: string;
  public minHeight!: number;
  public minWidth!: number;
  public height!: string;
  public width!: string;
  public marginTop!: number;
  public marginRight!: number;
  public marginBottom!: number;
  public marginLeft!: number;
  public mouseControls!: boolean;
  public keyboardControls!: boolean;
  public controlButtons!: 'all' | 'play' | 'none';
  public overlays!: 'all' | 'play' | 'repeat' | 'none';
  public autorun!: boolean;
  public injectStyles!: boolean;
  public theme!: string;
  public colorMap!: { [key: string]: string } | string[];
  public fixedScale!: boolean;
  public fixedOrder!: string[];
  public highlightBars!: boolean;
  public selectBars!: boolean;
}

export type ParamFunction = (currentDate: string, dateSlice: Data[], allDates: string[]) => string;
