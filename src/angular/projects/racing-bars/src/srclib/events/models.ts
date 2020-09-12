export interface TickDetails {
  date: string;
  isFirstDate: boolean;
  isLastDate: boolean;
  isRunning: boolean;
  allDates: string[];
}

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
