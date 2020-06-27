import { Component, OnInit } from '@angular/core';
import { generateId, loadData, race, Data } from '../../../../../../dist';

@Component({
  selector: 'lib-racing-bars',
  template: `<div id="{{ elementId }}"></div>`,
  styles: [],
})
export class RacingBarsComponent implements OnInit {
  public elementId = generateId();

  public ngOnInit(): void {
    loadData('assets/data/population.csv', 'csv').then((data) => {
      race(data as Data[], { selector: '#' + this.elementId });
    });
  }
}
