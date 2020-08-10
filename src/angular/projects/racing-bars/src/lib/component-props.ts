import { Input } from '@angular/core';
import { Data, WideData, Race } from '../srclib';

export class ComponentProps {
  @Input() public data: Data[] | WideData[];
  @Input() public dataUrl: string;
  @Input() public dataType: 'json' | 'csv' | 'tsv' | 'xml' | undefined;
  @Input() public elementId: string;
  @Input() public loadingContent: string;
  @Input() public callback: (racer: Race, data: Data[] | WideData[]) => void;
  @Input() public dataShape: 'long' | 'wide';
  @Input() public dataTransform: null | ((data: Data[] | WideData[]) => Data[] | WideData[]);
  @Input() public fillDateGapsInterval: null | 'year' | 'month' | 'day';
  @Input() public fillDateGapsValue: 'last' | 'interpolate';
  @Input() public title: string;
  @Input() public subTitle: string;
  @Input() public dateCounter:
    | string
    | ((currentDate: string, dateSlice: Data[], allDates: string[]) => string);
  @Input() public startDate: string;
  @Input() public endDate: string;
  @Input() public loop: boolean;
  @Input() public caption: string;
  @Input() public labelsPosition: 'inside' | 'outside';
  @Input() public labelsWidth: number;
  @Input() public showIcons: boolean;
  @Input() public colorSeed: string | number;
  @Input() public showGroups: boolean;
  @Input() public tickDuration: number;
  @Input() public topN: number;
  @Input() public height: string;
  @Input() public width: string;
  @Input() public marginTop: number;
  @Input() public marginRight: number;
  @Input() public marginBottom: number;
  @Input() public marginLeft: number;
  @Input() public mouseControls: boolean;
  @Input() public keyboardControls: boolean;
  @Input() public controlButtons: 'all' | 'play' | 'none';
  @Input() public overlays: 'all' | 'play' | 'repeat' | 'none';
  @Input() public autorun: boolean;
  @Input() public injectStyles: boolean;
  @Input() public theme: string;
  @Input() public colorMap: { [key: string]: string } | string[];
  @Input() public fixedScale: boolean;
  @Input() public fixedOrder: string[];
  @Input() public highlightBars: boolean;
  @Input() public selectBars: boolean;
}
