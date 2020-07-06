// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import { race, Race } from '..';
import { generateId, getDataPromiseAndOptions, Props } from '../shared';

class RacingBarsComponent extends React.PureComponent {
  public elementId: string;
  public loadingContent: string;
  public racer: Race | undefined;

  public constructor(props: Props) {
    super(props);
    this.elementId = props.elementId || generateId();
    this.loadingContent = props.loadingContent ?? 'Loading...';
  }

  public render() {
    return React.createElement('div', { id: this.elementId }, this.loadingContent);
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
    const { dataPromise, options } = getDataPromiseAndOptions(this.props as Props, this.elementId);
    const data = await dataPromise;
    this.racer = race(data, options);
  }

  public cleanUp() {
    if (this.racer) {
      this.racer.destroy();
    }
  }
}

export default RacingBarsComponent;
