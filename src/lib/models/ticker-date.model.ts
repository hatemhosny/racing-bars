export interface TickerDate {
  inc: (value?: number) => void;
  dec: (value?: number) => void;
  setFirst: () => void;
  setLast: () => void;
  update: () => void;
  setDate: (date: string) => void;
  getDate: () => string;
  isFirst: () => boolean;
  isLast: () => boolean;
}
