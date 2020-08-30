import { Options } from './options';
import { Data } from './data';

export interface Race {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  skipBack: () => void;
  skipForward: () => void;
  inc: (value: number) => void;
  dec: (value: number) => void;
  getDate: () => string;
  setDate: (inputDate: string | Date) => void;
  getAllDates: () => string[];
  isRunning: () => boolean;
  select: (name: string) => void;
  unselect: (name: string) => void;
  unselectAll: () => void;
  hideGroup: (group: string) => void;
  showGroup: (group: string) => void;
  showOnlyGroup: (group: string) => void;
  showAllGroups: () => void;
  changeOptions: (newOptions: Partial<Options>) => void;
  destroy: () => void;
}

export type RaceMethod = (...args: unknown[]) => Race | void;

export interface RaceMethodArgs {
  currentDate: string;
  allDates: string[];
  isRunning: boolean;
  data: Data[];
}

export interface DOMCustomEvent {
  bubbles: boolean;
  detail: {
    date: string;
    isFirst: boolean;
    isLast: boolean;
    src: string;
  };
}
