import { Options } from './options';
import { TickDetails, EventType } from './events';

export interface Race {
  play: () => Race;
  pause: () => Race;
  toggle: () => Race;
  skipBack: () => Race;
  skipForward: () => Race;
  inc: (value: number) => Race;
  dec: (value: number) => Race;
  setDate: (inputDate: string | Date) => Race;
  getDate: () => string;
  getAllDates: () => string[];
  isRunning: () => boolean;
  select: (name: string) => Race;
  unselect: (name: string) => Race;
  unselectAll: () => Race;
  hideGroup: (group: string) => Race;
  showGroup: (group: string) => Race;
  showOnlyGroup: (group: string) => Race;
  showAllGroups: () => Race;
  changeOptions: (newOptions: Partial<Options>) => Race;
  call: (fn: ApiCallback) => Race;
  delay: (duration: number) => Race;
  onDate: (date: string | Date, fn: ApiCallback) => Race;
  on: (event: EventType, fn: ApiCallback) => Race;
  destroy: () => Race;
}

export type ApiMethod = (...args: unknown[]) => Race | string | string[] | boolean | void;

export type ApiCallback = (tickDetails: TickDetails) => void;
