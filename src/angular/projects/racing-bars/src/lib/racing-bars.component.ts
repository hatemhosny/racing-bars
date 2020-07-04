import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { race, Data, WideData, Race } from '../srclib';
import { generateId, getDataPromiseAndOptions, Props } from './shared';

@Component({
  selector: 'racing-bars',
  template: `<div id="{{ id }}"></div>`,
  styles: [
    `
      :host {
        display: block;
      }
      div {
        height: 100%;
        width: 100%;
      }
    `,
  ],
})
export class RacingBarsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public data: Data[] | WideData[];
  @Input() public dataUrl: string;
  @Input() public dataType: 'json' | 'csv' | 'tsv' | 'xml' | undefined;
  @Input() public elementId: string;

  @Input() public dataShape: 'long' | 'wide';
  @Input() public dataTransform: null | ((data: Data[] | WideData[]) => Data[] | WideData[]);
  @Input() public fillDateGaps: false | 'years' | 'months' | 'days';
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
  @Input() public labelsOnBars: boolean;
  @Input() public labelsWidth: number;
  @Input() public showIcons: boolean;
  @Input() public colorSeed: string | number;
  @Input() public showGroups: boolean;
  @Input() public tickDuration: number;
  @Input() public topN: number;
  @Input() public height: string;
  @Input() public width: string;
  @Input() public disableClickEvents: boolean;
  @Input() public disableKeyboardEvents: boolean;
  @Input() public showControls: 'all' | 'play' | 'none';
  @Input() public showOverlays: 'all' | 'play' | 'repeat' | 'none';
  @Input() public autorun: boolean;
  @Input() public injectStyles: boolean;
  @Input() public theme: string;
  @Input() public colorMap: { [key: string]: string } | string[];
  @Input() public fixedScale: boolean;
  @Input() public fixedOrder: string[];
  @Input() public highlightBars: boolean;
  @Input() public selectBars: boolean;

  public id: string;
  public racer: Race;

  public ngOnInit() {
    this.id = this.elementId || generateId();
    this.runRace();
  }

  public ngOnChanges() {
    this.runRace();
  }

  public ngOnDestroy() {
    this.cleanUp();
  }

  private async runRace() {
    this.cleanUp();
    const { dataPromise, options } = getDataPromiseAndOptions(this.getProps(), this.id);
    const data = await dataPromise;
    this.racer = race(data, options);
  }

  private cleanUp() {
    if (this.racer) {
      this.racer.destroy();
    }
  }

  private getProps(): Props {
    return {
      data: this.data,
      dataUrl: this.dataUrl,
      dataType: this.dataType,
      elementId: this.elementId,
      dataShape: this.dataShape,
      dataTransform: this.dataTransform,
      fillDateGaps: this.fillDateGaps,
      fillDateGapsValue: this.fillDateGapsValue,
      title: this.title,
      subTitle: this.subTitle,
      dateCounter: this.dateCounter,
      startDate: this.startDate,
      endDate: this.endDate,
      loop: this.loop,
      caption: this.caption,
      labelsOnBars: this.labelsOnBars,
      labelsWidth: this.labelsWidth,
      showIcons: this.showIcons,
      colorSeed: this.colorSeed,
      showGroups: this.showGroups,
      tickDuration: this.tickDuration,
      topN: this.topN,
      height: this.height,
      width: this.width,
      disableClickEvents: this.disableClickEvents,
      disableKeyboardEvents: this.disableKeyboardEvents,
      showControls: this.showControls,
      showOverlays: this.showOverlays,
      autorun: this.autorun,
      injectStyles: this.injectStyles,
      theme: this.theme,
      colorMap: this.colorMap,
      fixedScale: this.fixedScale,
      fixedOrder: this.fixedOrder,
      highlightBars: this.highlightBars,
      selectBars: this.selectBars,
    };
  }
}
