import { HSLColor } from 'd3';
import { Action } from '../store';

export interface DataAction extends Action {
  payload?: DataCollections | string | DateSlice;
}

export interface DataState extends DataCollections {
  groupFilter: string[];
  selected: string[];
  dateSlices: DateSlice;
}

export interface DataCollections {
  names: string[];
  groups: string[];
  datesCache: string[];
}

export interface Data {
  date: string;
  name: string;
  value: number;
  lastValue?: number;
  group?: string;
  color?: HSLColor;
  icon?: string;
  rank?: number;
}

export interface WideData {
  [key: string]: any;
  date: string;
}

export interface DateSlice {
  [key: string]: Data[];
}
