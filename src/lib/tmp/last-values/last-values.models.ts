import { Action } from '../../store';
import { Data } from '../../models';

export interface LastValuesAction extends Action {
  payload: Data[] | Data;
}

export interface Value {
  date: string;
  value: number;
}

export interface LastValues {
  [key: string]: Value;
}
