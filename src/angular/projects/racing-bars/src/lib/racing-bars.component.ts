import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { race, Data, WideData, Race } from '../srclib';
import { generateId, getDataPromiseAndOptions, Props } from './shared';

@Component({
  selector: 'racing-bars',
  template: `<div id="{{ elementId }}">{{ loadingContent }}</div>`,
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
  @Input() public loadingContent: string;

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

  public racer: Race;

  public ngOnInit() {
    this.elementId = this.elementId ?? generateId();
    this.loadingContent = this.loadingContent ?? 'Loading...';
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
    const { dataPromise, options } = getDataPromiseAndOptions(this.getProps(), this.elementId);
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
      loadingContent: this.loadingContent,
      dataShape: this.dataShape,
      dataTransform: this.dataTransform,
      fillDateGapsInterval: this.fillDateGapsInterval,
      fillDateGapsValue: this.fillDateGapsValue,
      title: this.title,
      subTitle: this.subTitle,
      dateCounter: this.dateCounter,
      startDate: this.startDate,
      endDate: this.endDate,
      loop: this.loop,
      caption: this.caption,
      labelsPosition: this.labelsPosition,
      labelsWidth: this.labelsWidth,
      showIcons: this.showIcons,
      colorSeed: this.colorSeed,
      showGroups: this.showGroups,
      tickDuration: this.tickDuration,
      topN: this.topN,
      height: this.height,
      width: this.width,
      marginTop: this.marginTop,
      marginRight: this.marginRight,
      marginBottom: this.marginBottom,
      marginLeft: this.marginLeft,
      mouseControls: this.mouseControls,
      keyboardControls: this.keyboardControls,
      controlButtons: this.controlButtons,
      overlays: this.overlays,
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
