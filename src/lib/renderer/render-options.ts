import type { Data } from '../data';

export interface RenderOptions {
  titleText: any;
  subTitleText: any;
  captionText: any;
  dateCounterText: any;
  root: HTMLElement;
  svg: any;
  height: number;
  width: number;
  margin: { top: number; right: number; bottom: number; left: number };
  x: d3.ScaleLinear<number, number>;
  y: d3.ScaleLinear<number, number>;
  xAxis: d3.Axis<number | { valueOf(): number }>;
  headerHeight: number;
  titlePadding: number;
  titleHeight: number;
  barY: (d: Data) => number;
  barWidth: (d: Data) => number;
  barHeight: number;
  barHalfHeight: number;
  barPadding: number;
  labelX: number | ((d: Data) => number);
  labelPadding: number;
  defs: any;
  iconSize: number;
  iconSpace: number;
  maxValue: number;
  lastDate: string;
}
