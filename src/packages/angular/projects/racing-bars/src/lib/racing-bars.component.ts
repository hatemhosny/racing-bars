import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { racingBars } from '..';
import { Options, Data, WideData, Race } from '../srclib';
import { getData } from './shared';

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

  @Input() public dataShape: Options['dataShape'];
  @Input() public dataTransform: Options['dataTransform'];
  @Input() public fillDateGaps: Options['fillDateGaps'];
  @Input() public fillDateGapsValue: Options['fillDateGapsValue'];
  @Input() public title: Options['title'];
  @Input() public subTitle: Options['subTitle'];
  @Input() public dateCounter: Options['dateCounter'];
  @Input() public startDate: Options['startDate'];
  @Input() public endDate: Options['endDate'];
  @Input() public loop: Options['loop'];
  @Input() public caption: Options['caption'];
  @Input() public labelsOnBars: Options['labelsOnBars'];
  @Input() public labelsWidth: Options['labelsWidth'];
  @Input() public showIcons: Options['showIcons'];
  @Input() public colorSeed: Options['colorSeed'];
  @Input() public showGroups: Options['showGroups'];
  @Input() public tickDuration: Options['tickDuration'];
  @Input() public topN: Options['topN'];
  @Input() public height: Options['height'];
  @Input() public width: Options['width'];
  @Input() public disableClickEvents: Options['disableClickEvents'];
  @Input() public disableKeyboardEvents: Options['disableKeyboardEvents'];
  @Input() public showControls: Options['showControls'];
  @Input() public showOverlays: Options['showOverlays'];
  @Input() public autorun: Options['autorun'];
  @Input() public injectStyles: Options['injectStyles'];
  @Input() public theme: Options['theme'];
  @Input() public colorMap: Options['colorMap'];
  @Input() public fixedScale: Options['fixedScale'];
  @Input() public fixedOrder: Options['fixedOrder'];
  @Input() public highlightBars: Options['highlightBars'];
  @Input() public selectBars: Options['selectBars'];

  public id: string;
  public racer: Race;

  public ngOnInit() {
    this.id = this.elementId || racingBars.generateId();
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
    const { dataPromise, options } = getData(this.getProps(), this.id);
    const data = await dataPromise;
    this.racer = racingBars.race(data, options);
  }

  private cleanUp() {
    if (this.racer) {
      this.racer.destroy();
    }
  }

  private getProps() {
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
