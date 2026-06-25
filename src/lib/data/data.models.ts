import type { HSLColor } from 'd3';
import type { Action } from '../store';

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

/**
 * A single data row in long (tidy) format.
 *
 * Each row represents one bar at a specific date. This is the primary data format used by
 * the racing bar chart.
 *
 * @example
 * ```ts
 * const data: Data[] = [
 *   { date: '2017-01-01', name: 'Egypt', value: 96.44 },
 *   { date: '2017-01-01', name: 'Singapore', value: 5.61 },
 * ];
 * ```
 *
 * @see https://racing-bars.hatemhosny.dev/documentation/data
 */
export interface Data {
  /** A string representation of a valid date (preferably `'YYYY-MM-DD'` format). */
  date: string;
  /** A string holding the name/bar label of each item (e.g. country name). */
  name: string;
  /** The numeric value of the item at this date. */
  value: number;
  /** Internal use — the previous value before the current tick. */
  lastValue?: number;
  /** A group name for categorising items. Has a one-to-many relationship with `name` (e.g. continent → countries). */
  group?: string;
  /** A CSS color string or D3 HSL color to override the bar color. */
  color?: HSLColor | string;
  /** URL of an icon to display on the bar (e.g. country flag). Has a one-to-one relationship with `name`. */
  icon?: string;
  /** Internal use — the rank position at this date. */
  rank?: number;
}

/**
 * A single data row in wide format.
 *
 * In wide format, the `date` field is the row key and all other keys are bar name / value pairs.
 * Note: wide data does not allow the use of optional fields (`group`, `icon`).
 *
 * @example
 * ```ts
 * const data: WideData[] = [
 *   { date: '2017-01-01', Canada: 36.54, Egypt: 96.44, Greece: 10.75 },
 *   { date: '2018-01-01', Canada: 37.06, Egypt: 98.42, Greece: 10.73 },
 * ];
 * ```
 *
 * @see https://racing-bars.hatemhosny.dev/documentation/data
 */
export interface WideData {
  [key: string]: any;
  /** A string representation of a valid date (preferably `'YYYY-MM-DD'` format). */
  date: string;
}

export interface DateSlice {
  [key: string]: Data[];
}
