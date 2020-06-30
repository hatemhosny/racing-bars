import React from 'react';
import { generateId, race, Race } from '../..';
import { getData } from '../shared';

export class RacingBarsComponent extends React.PureComponent {
  public elementId: string;
  public racer: Race | undefined;
  public constructor(props: any) {
    super(props);
    this.elementId = props.elementId || generateId();
  }

  public render() {
    return React.createElement('div', { id: this.elementId });
  }

  public componentDidMount() {
    setTimeout(() => {
      this.runRace();
    });
  }

  public componentDidUpdate() {
    setTimeout(() => {
      this.runRace();
    });
  }

  public componentWillUnmount() {
    this.cleanUp();
  }

  public async runRace() {
    this.cleanUp();
    const { dataPromise, options } = getData(this.props as any, this.elementId);
    const data = await dataPromise;
    this.racer = race(data, options);
  }

  public cleanUp() {
    if (this.racer) {
      this.racer.destroy();
    }
  }
}
