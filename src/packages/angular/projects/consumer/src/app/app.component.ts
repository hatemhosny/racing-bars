import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<racing-bars dataUrl="assets/data/population.csv" dataType="csv"> </racing-bars>`,
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
  public ngOnInit() {
    //
  }
}
