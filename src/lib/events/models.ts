/**
 * Details about the current chart tick state, passed to event callbacks.
 *
 * @see https://racing-bars.hatemhosny.dev/documentation/events
 */
export interface TickDetails {
  /** The current date as a `'YYYY-MM-DD'` string. */
  date: string;
  /** `true` if the current date is the first date in the dataset. */
  isFirstDate: boolean;
  /** `true` if the current date is the last date in the dataset. */
  isLastDate: boolean;
  /** `true` if the chart is currently animating. */
  isRunning: boolean;
  /** Array of all unique dates in the dataset, sorted ascending. */
  allDates: string[];
}

/**
 * The detail object attached to DOM custom events dispatched by the chart.
 *
 * @see https://racing-bars.hatemhosny.dev/documentation/events
 */
export interface DOMCustomEvent {
  /** Always `true`. */
  bubbles: boolean;
  /** The tick details payload. */
  detail: TickDetails;
}

/**
 * Chart lifecycle event types.
 *
 * - `'dateChange'` — fires when the displayed date changes
 * - `'firstDate'` — fires when the chart reaches the first date
 * - `'lastDate'` — fires when the chart reaches the last date
 * - `'play'` — fires when the chart starts running
 * - `'pause'` — fires when the chart is paused
 *
 * @see https://racing-bars.hatemhosny.dev/documentation/events
 */
export type EventType = 'dateChange' | 'firstDate' | 'lastDate' | 'play' | 'pause';

export interface Event {
  element: HTMLElement | Document;
  userDefined: boolean;
  eventType: EventType | 'click' | 'keyup';
  handler: EventListener;
}
