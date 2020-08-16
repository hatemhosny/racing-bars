import {
  Component,
  OnChanges,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  SimpleChanges,
} from '@angular/core';
import { race, Race, Options, generateId } from '../srclib';
import { processProps, Props } from './shared';
import { ComponentProps } from './component-props';

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
export class RacingBarsComponent extends ComponentProps
  implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  public racer: Race;
  private props: Partial<Props>;

  public constructor(private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  public ngOnChanges(changes: SimpleChanges) {
    this.props = {};
    for (const propName of Object.keys(changes)) {
      this.props[propName] = changes[propName].currentValue;
    }
    if (this.racer) {
      this.racer.changeOptions(this.props as Options);
    }
  }

  public ngOnInit() {
    this.elementId = this.elementId || generateId();
    this.loadingContent = this.loadingContent ?? 'Loading...';
    this.runRace();
  }

  public ngAfterViewInit() {
    this.changeDetectorRef.detach();
  }

  public ngOnDestroy() {
    this.cleanUp();
  }

  private async runRace() {
    this.cleanUp();
    const { dataPromise, options, callback } = processProps(this.props, this.elementId);
    const data = await dataPromise;
    this.racer = race(data, options);
    callback(this.racer, data);
  }

  private cleanUp() {
    if (this.racer) {
      this.racer.destroy();
    }
  }
}
