import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { getData, Props } from './shared';
import { generateId, race, Race } from './racing-bars-lib';

@Component({
  selector: 'racing-bars',
  template: `<div id="{{ id }}"></div>`,
})
export class RacingBarsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public data: Props['data'];
  @Input() public dataUrl: Props['dataUrl'];
  @Input() public dataType: Props['dataType'];
  @Input() public elementId: Props['elementId'];

  @Input() public dataShape: Props['dataShape'];
  @Input() public dataTransform: Props['dataTransform'];
  @Input() public fillDateGaps: Props['fillDateGaps'];
  @Input() public fillDateGapsValue: Props['fillDateGapsValue'];
  @Input() public title: Props['title'];
  @Input() public subTitle: Props['subTitle'];
  @Input() public dateCounter: Props['dateCounter'];
  @Input() public startDate: Props['startDate'];
  @Input() public endDate: Props['endDate'];
  @Input() public loop: Props['loop'];
  @Input() public caption: Props['caption'];
  @Input() public labelsOnBars: Props['labelsOnBars'];
  @Input() public labelsWidth: Props['labelsWidth'];
  @Input() public showIcons: Props['showIcons'];
  @Input() public colorSeed: Props['colorSeed'];
  @Input() public showGroups: Props['showGroups'];
  @Input() public tickDuration: Props['tickDuration'];
  @Input() public topN: Props['topN'];
  @Input() public inputHeight: Props['inputHeight'];
  @Input() public inputWidth: Props['inputWidth'];
  @Input() public minHeight: Props['minHeight'];
  @Input() public minWidth: Props['minWidth'];
  @Input() public height: Props['height'];
  @Input() public width: Props['width'];
  @Input() public disableClickEvents: Props['disableClickEvents'];
  @Input() public disableKeyboardEvents: Props['disableKeyboardEvents'];
  @Input() public showControls: Props['showControls'];
  @Input() public showOverlays: Props['showOverlays'];
  @Input() public autorun: Props['autorun'];
  @Input() public injectStyles: Props['injectStyles'];
  @Input() public theme: Props['theme'];
  @Input() public colorMap: Props['colorMap'];
  @Input() public fixedScale: Props['fixedScale'];
  @Input() public fixedOrder: Props['fixedOrder'];
  @Input() public highlightBars: Props['highlightBars'];
  @Input() public selectBars: Props['selectBars'];

  public id: string;
  public racer: Race | undefined;

  public constructor() {
    this.id = this.elementId || generateId();
  }

  public ngOnInit() {
    // eslint-disable-next-line no-console
    console.log(this.getProps());
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
    this.racer = race(data, options);
  }

  private cleanUp() {
    if (this.racer) {
      this.racer.stop();
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
      inputHeight: this.inputHeight,
      inputWidth: this.inputWidth,
      minHeight: this.minHeight,
      minWidth: this.minWidth,
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
