import type { Action } from '../store';
import type { Data, WideData } from '../data';
import type { Palette } from './palette';

export interface OptionsAction extends Action {
  payload: Partial<Options>;
}

/**
 * Full chart configuration options.
 *
 * Every option can be set when calling {@link race} and most can be changed at runtime
 * via {@link Race.changeOptions}. Use `Partial<Options>` when instantiating the chart —
 * unspecified options fall back to their defaults.
 *
 * @see https://racing-bars.hatemhosny.dev/documentation/options
 */
export interface Options {
  // ── Data ──────────────────────────────────────────────────────────
  /** Data shape: `'long'`, `'wide'`, or `'auto'` (auto-detect from first row keys). */
  dataShape: 'long' | 'wide' | 'auto';
  /** Data file format when loading from URL: `'json'`, `'csv'`, `'tsv'`, `'xml'`, or `'auto'`. */
  dataType: 'json' | 'csv' | 'tsv' | 'xml' | 'auto';
  /** Transform function applied to data before rendering. Return the transformed array. */
  dataTransform: null | ((data: Data[] | WideData[]) => Data[] | WideData[]);
  /** Number of decimal places to display, or `'preserve'` for raw values. */
  valueDecimals: 'preserve' | number;
  /** BCP 47 locale tag for number formatting (e.g. `'en-US'`, `'de-DE'`). */
  valueLocale: string;
  /** Interval for auto-filling missing dates: `'year'`, `'month'`, `'day'`, or `null` to disable. */
  fillDateGapsInterval: null | 'year' | 'month' | 'day';
  /** How to fill gaps: `'last'` (carry forward) or `'interpolate'` (linearly interpolate). */
  fillDateGapsValue: 'last' | 'interpolate';
  /** Filter to dates on or after this date string. */
  startDate: string;
  /** Filter to dates on or before this date string. */
  endDate: string;
  /** Array of bar names to show in a fixed rank order (supersedes `topN`). */
  fixedOrder: string[];
  /** Sum values cumulatively across dates for each bar. */
  makeCumulative: boolean;

  // ── Display ───────────────────────────────────────────────────────
  /** Chart title text or a function returning a string. */
  title: string | ((currentDate: string, dateSlice: Data[], allDates: string[]) => string);
  /** Chart sub-title text or a function returning a string. */
  subTitle: string | ((currentDate: string, dateSlice: Data[], allDates: string[]) => string);
  /** Caption displayed below the date counter (bottom-right). */
  caption: string | ((currentDate: string, dateSlice: Data[], allDates: string[]) => string);
  /** Date counter format string or function (default: `'MM/YYYY'`). */
  dateCounter: string | ((currentDate: string, dateSlice: Data[], allDates: string[]) => string);
  /** Label position relative to bars: `'inside'`, `'outside'`, or `'none'`. */
  labelsPosition: 'inside' | 'outside' | 'none';
  /** Width in pixels of the label area when `labelsPosition` is `'outside'`. */
  labelsWidth: number;
  /** Show icons on bars (uses the `icon` field in {@link Data}). */
  showIcons: boolean;
  /** Colour bars by group and show a group legend. */
  showGroups: boolean;
  /** Highlight bars on mouse hover. */
  highlightBars: boolean;
  /** Toggle bar selection on click. */
  selectBars: boolean;
  /** Keep the value axis scale fixed across all dates. */
  fixedScale: boolean;

  // ── Controls ──────────────────────────────────────────────────────
  /** Show control buttons: `'all'`, `'play'`, or `'none'`. */
  controlButtons: 'all' | 'play' | 'none';
  /** Show overlay UI: `'all'`, `'play'`, `'repeat'`, or `'none'`. */
  overlays: 'all' | 'play' | 'repeat' | 'none';
  /** Enable mouse-click controls (single=toggle, double=skip-forward, triple=skip-back). */
  mouseControls: boolean;
  /** Enable keyboard controls (A=skip-back, S/Space=toggle, D=skip-forward). */
  keyboardControls: boolean;
  /** Start the race automatically on load. */
  autorun: boolean;
  /** Restart the race after reaching the last date. */
  loop: boolean;

  // ── Styling ───────────────────────────────────────────────────────
  /** Chart theme: `'light'` or `'dark'`. */
  theme: string;
  /**
   * Bar colour configuration. Accepts:
   * - A named palette string (see available palettes)
   * - An array of CSS colour strings
   * - An object mapping bar/group names → CSS colour strings
   */
  colorMap: { [key: string]: string } | string[] | Palette;
  /** Seed value for shuffling colour assignments among bars. */
  colorSeed: number | string;
  /** Inject default CSS into the document head. */
  injectStyles: boolean;

  // ── Dimensions ────────────────────────────────────────────────────
  /** Chart height in pixels, or `'window*{n}'` for a fraction of window height. */
  height: number | string;
  /** Chart width in pixels, or `'window*{n}'` for a fraction of window width. */
  width: number | string;
  /** Internal / legacy input height alias (use `height`). */
  inputHeight: number | string;
  /** Internal / legacy input width alias (use `width`). */
  inputWidth: number | string;
  /** Minimum chart height in pixels (default: 300). */
  minHeight: number;
  /** Minimum chart width in pixels (default: 250). */
  minWidth: number;
  /** Top margin inside the SVG (default: 0). */
  marginTop: number;
  /** Right margin inside the SVG (default: 20). */
  marginRight: number;
  /** Bottom margin inside the SVG (default: 5). */
  marginBottom: number;
  /** Left margin inside the SVG (default: 0). */
  marginLeft: number;

  // ── Filtering ─────────────────────────────────────────────────────
  /** Maximum number of top-ranked bars to display per date. Overridden by `fixedOrder`. */
  topN: number;
  /** Duration (ms) each date is displayed before advancing (default: 500). */
  tickDuration: number;
}

/**
 * Data transformation function type.
 * Receives raw data and must return transformed data in the same shape.
 */
export type TransformFn = (data: Data[] | WideData[]) => Data[] | WideData[];

/**
 * Function type for dynamic text options (title, subTitle, caption, dateCounter).
 *
 * @param currentDate - The current date as a `'YYYY-MM-DD'` string.
 * @param dateSlice - All data items for the current date.
 * @param allDates - All unique dates in the dataset, sorted ascending.
 * @returns The text string to display.
 */
export type ParamFunction = (currentDate: string, dateSlice: Data[], allDates: string[]) => string;
