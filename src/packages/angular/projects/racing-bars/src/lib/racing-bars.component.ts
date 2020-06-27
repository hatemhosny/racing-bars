import { Component, OnInit } from '@angular/core';
import { generateId, loadData, race, Data } from '../../../../../../dist';
import { getData } from '../../../../../get-data';

@Component({
  selector: 'racing-bars',
  template: `<div id="{{ elementId }}"></div>`,
  styles: [],
})
export class RacingBarsComponent implements OnInit {
  public elementId = generateId();
  public racer: any;

  public ngOnInit(): void {
    loadData('assets/data/population.csv', 'csv').then((data) => {
      race(data as Data[], { selector: '#' + this.elementId });
    });
  }

  async runRace() {
    this.cleanUp();
    const { dataPromise, options } = getData(this.props, this.elementId);
    const data = await dataPromise;
    this.racer = race(data, options);
  }

  cleanUp() {
    if (this.racer) {
      this.racer.stop();
    }
  }
}
