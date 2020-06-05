import { HSLColor } from 'd3';

export interface Data {
  date: string;
  name: string;
  value: number;
  lastValue?: number;
  group?: string;
  color?: HSLColor;
  rank?: number;
}

export interface Renderer {
  renderInitalView: () => void;
  renderFrame: () => void;
  resize: () => void;
}
