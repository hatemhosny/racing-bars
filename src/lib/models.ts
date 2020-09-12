import { Options } from './options';

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

export interface TickDetails {
  date: string;
  isFirstDate: boolean;
  isLastDate: boolean;
  isRunning: boolean;
  allDates: string[];
}

export type ApiCallback = (tickDetails: TickDetails) => void;

export interface DOMCustomEvent {
  bubbles: boolean;
  detail: TickDetails;
}

export type EventType = 'dateChange' | 'firstDate' | 'lastDate' | 'play' | 'pause';

export interface Event {
  element: HTMLElement | Document;
  userDefined: boolean;
  eventType: EventType | 'click' | 'keyup';
  handler: EventListener;
}
