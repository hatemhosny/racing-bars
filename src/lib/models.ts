import type { Options } from './options';
import type { TickDetails, EventType } from './events';

export interface Race {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  skipBack: () => void;
  skipForward: () => void;
  inc: (value: number) => void;
  dec: (value: number) => void;
  setDate: (inputDate: string | Date) => void;
  getDate: () => string;
  getAllDates: () => string[];
  isRunning: () => boolean;
  select: (name: string) => void;
  unselect: (name: string) => void;
  unselectAll: () => void;
  hideGroup: (group: string) => void;
  showGroup: (group: string) => void;
  showOnlyGroup: (group: string) => void;
  showAllGroups: () => void;
  changeOptions: (newOptions: Partial<Options>) => Promise<void>;
  onDate: (date: string | Date, fn: ApiCallback) => void;
  on: (event: EventType, fn: ApiCallback) => void;
  destroy: () => void;
}

export type ApiMethod = (...args: unknown[]) => Race | string | string[] | boolean | void;

export type ApiCallback = (tickDetails: TickDetails) => void;
