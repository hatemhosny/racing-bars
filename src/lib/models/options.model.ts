export interface Options {
  dataShape?: 'long' | 'wide';
  fillDateGaps?: false | 'years' | 'months' | 'days';
  fillDateGapsValue?: 'last' | 'zero';
  selector?: string;
  title?: string;
  subTitle?: string;
  dateCounterFormat?: string;
  startDate?: string;
  endDate?: string;
  loop?: boolean;
  caption?: string;
  labelsOnBars?: boolean;
  labelsWidth?: number;
  colorSeed?: string;
  disableGroupColors?: boolean;
  tickDuration?: number;
  topN?: number;
  height?: string;
  width?: string;
  disableClickEvents?: boolean;
  disableKeyboardEvents?: boolean;
  showControls?: 'all' | 'play' | 'none';
  autorun?: boolean;
  injectStyles?: boolean;
}

export interface RenderOptions {
  selector: string;
  title: string;
  subTitle: string;
  caption: string;
  dateCounterFormat: string;
  labelsOnBars: boolean;
  labelsWidth: number;
  showControls: Options['showControls'];
  inputHeight?: string;
  inputWidth?: string;
  minHeight: number;
  minWidth: number;
  tickDuration: number;
  topN: number;
}

export interface TickerOptions {
  tickDuration: number;
  loop: boolean;
}
