import { Component, OnInit } from '@angular/core';
import { Race, Data, WideData } from 'dist/racing-bars/srclib';

// prettier-ignore
@Component({
  selector: 'app-root',
  template: `<racing-bars
    dataUrl="assets/data/population.csv"
    dataType="csv"
    [title]="title"
    [theme]="theme"
    [topN]="topN"
    myname="hatem"
  />`,
  styles: [
    `
      racing-bars {
        width: 100%;
        height: 95vh;
      }
    `,
  ],
})
export class AppComponent implements OnInit {

  public title = 'initial title';
  public theme = 'light';
  public topN = 10;

  public ngOnInit() {
    setTimeout(() => {
      this.title = 'hi there';
      this.theme = 'dark';
      this.topN = 5;
    }, 2000);
  }

  public callback(racer: Race, data: Data[] | WideData[]) {
    if (!racer) return;
    // eslint-disable-next-line no-console
    console.log(racer);
    // eslint-disable-next-line no-console
    console.log(data);
    racer.play();
    setTimeout(racer.pause, 3000);
  }
}
