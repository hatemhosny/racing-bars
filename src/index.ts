export type { Props } from './shared';
export type { DOMCustomEvent, Race, Data, WideData } from './lib';
export { loadData, race, generateId, defaultOptions } from './lib';
import type { Options as AllOptions } from './lib';
export type Options = Partial<AllOptions>;
