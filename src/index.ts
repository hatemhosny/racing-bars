export { Props } from './shared';
export {
  DOMCustomEvent,
  loadData,
  race,
  generateId,
  Race,
  Data,
  WideData,
  defaultOptions,
} from './lib';
import { Options as AllOptions } from './lib';
export interface Options extends Partial<AllOptions> {}
