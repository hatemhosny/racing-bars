export interface Race {
  start: () => void;
  stop: () => void;
  rewind: () => void;
  fastforward: () => void;
  loop: () => void;
  inc: (value: number) => void;
  dec: (value: number) => void;
  getDate: () => string;
  setDate: (inputDate: string | Date) => void;
  getAllDates: () => string[];
  createScroller: () => void;
  selections: {
    select: (name: string) => void;
    unselect: (name: string) => void;
    unselectAll: () => void;
  };
  groups: {
    hide: (group: string) => void;
    show: (group: string) => void;
    showOnly: (group: string) => void;
    showAll: () => void;
  };
  destroy: () => void;
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
