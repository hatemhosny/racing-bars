import { HSLColor } from 'd3';

export interface Data {
  date: string;
  name: string;
  value: number;
  lastValue?: number;
  group?: string;
  color?: HSLColor;
  icon?: string;
  rank?: number;
}

export interface Renderer {
  renderInitalView: () => void;
  renderFrame: () => void;
  resize: () => void;
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
