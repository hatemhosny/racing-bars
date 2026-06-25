import type { Options } from './options';
import type { TickDetails, EventType } from './events';

/**
 * The chart API object returned by {@link race}.
 *
 * Exposes methods to control the racing bar chart programmatically — play/pause,
 * navigate dates, select bars, filter groups, listen to events, and more.
 *
 * @see https://racing-bars.hatemhosny.dev/documentation/api
 *
 * @example
 * ```ts
 * const racer = await race('/data/population.csv', '#race', { dataType: 'csv' });
 * racer.pause();
 * console.log(racer.getDate());
 * racer.on('dateChange', ({ date }) => console.log('date change', date));
 * racer.destroy();
 * ```
 */
export interface Race {
  /** Starts running the chart animation. No-op if already running. */
  play: () => void;
  /** Pauses the chart at the current date. */
  pause: () => void;
  /** Toggles between play and pause states. */
  toggle: () => void;
  /** Stops the chart and resets the date to the first date in the dataset. */
  skipBack: () => void;
  /** Stops the chart and sets the date to the last date in the dataset. */
  skipForward: () => void;
  /**
   * Advances the chart forward by the specified number of dates.
   * @param value - Number of dates to advance (default: 1).
   */
  inc: (value: number) => void;
  /**
   * Moves the chart backward by the specified number of dates.
   * @param value - Number of dates to go back (default: 1).
   */
  dec: (value: number) => void;
  /**
   * Sets the chart to a specific date.
   * @param inputDate - A date string (e.g. `'1960-01-01'`) or a JavaScript `Date` object.
   */
  setDate: (inputDate: string | Date) => void;
  /** Returns the current date as a `'YYYY-MM-DD'` string. */
  getDate: () => string;
  /** Returns an array of all unique dates in the dataset, sorted ascending. */
  getAllDates: () => string[];
  /** Returns `true` if the chart is animating, `false` otherwise. */
  isRunning: () => boolean;
  /**
   * Selects a bar by name, adding the CSS class `selected` to it.
   * @param name - The name of the bar to select.
   */
  select: (name: string) => void;
  /**
   * Unselects a previously selected bar by name.
   * @param name - The name of the bar to unselect.
   */
  unselect: (name: string) => void;
  /** Unselects all bars. */
  unselectAll: () => void;
  /**
   * Hides all bars belonging to the specified group.
   * @param group - The group name to hide.
   */
  hideGroup: (group: string) => void;
  /**
   * Shows bars of the specified group if they were previously hidden.
   * @param group - The group name to show.
   */
  showGroup: (group: string) => void;
  /**
   * Hides all groups except the one specified.
   * @param group - The group name to keep visible.
   */
  showOnlyGroup: (group: string) => void;
  /** Shows all groups (resets any group filters). */
  showAllGroups: () => void;
  /**
   * Changes chart options during runtime.
   *
   * Note: `dataShape` and `dataType` cannot be changed and will throw an error.
   *
   * @param newOptions - A partial {@link Options} object with the options to update.
   * @throws {Error} If `dataShape` or `dataType` are included.
   */
  changeOptions: (newOptions: Partial<Options>) => Promise<void>;
  /**
   * Registers a callback that fires when a specific date becomes the current date.
   *
   * @param date - The date to watch (string or `Date` object).
   * @param fn - Callback function receiving a {@link TickDetails} object.
   * @returns An object with a `remove()` method to unsubscribe.
   */
  onDate: (date: string | Date, fn: ApiCallback) => void;
  /**
   * Registers a callback for chart lifecycle events.
   *
   * @param event - The event type: `'dateChange'`, `'firstDate'`, `'lastDate'`, `'play'`, or `'pause'`.
   * @param fn - Callback function receiving a {@link TickDetails} object.
   * @returns An object with a `remove()` method to unsubscribe.
   */
  on: (event: EventType, fn: ApiCallback) => void;
  /**
   * Destroys the chart instance and cleans up all resources.
   * After calling this, subsequent API calls will throw an error.
   */
  destroy: () => void;
}

export type ApiMethod = (...args: unknown[]) => Race | string | string[] | boolean | void;

/**
 * Callback function type for chart event listeners.
 *
 * @param tickDetails - Details about the current tick state.
 *
 * @see https://racing-bars.hatemhosny.dev/documentation/api
 */
export type ApiCallback = (tickDetails: TickDetails) => void;
