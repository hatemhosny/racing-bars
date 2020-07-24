export interface Race {
  play: () => void;
  pause: () => void;
  skipBack: () => void;
  skipForward: () => void;
  inc: (value: number) => void;
  dec: (value: number) => void;
  getDate: () => string;
  setDate: (inputDate: string | Date) => void;
  getAllDates: () => string[];
  select: (name: string) => void;
  unselect: (name: string) => void;
  unselectAll: () => void;
  hideGroup: (group: string) => void;
  showGroup: (group: string) => void;
  showOnlyGroup: (group: string) => void;
  showAllGroups: () => void;
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
