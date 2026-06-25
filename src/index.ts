/**
 * @module racing-bars
 *
 * Main entry point for the racing-bars library.
 *
 * Exports the core chart functions and types for creating and controlling
 * animated racing bar charts.
 *
 * @see https://racing-bars.hatemhosny.dev
 */
export type { Props } from './shared';
export type { DOMCustomEvent, Race, Data, WideData } from './lib';
export { loadData, race, generateId, defaultOptions } from './lib';
import type { Options as AllOptions } from './lib';

/** Chart configuration options. All fields are optional when creating a chart. */
export type Options = Partial<AllOptions>;
