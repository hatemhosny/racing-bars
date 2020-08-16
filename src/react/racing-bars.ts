// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import { race, generateId, Race } from '..';
import { processProps, Props } from '../shared';

class RacingBarsComponent extends React.Component {
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

  public shouldComponentUpdate(nextProps: Props) {
    if (this.racer) {
      // TODO: do not download data
      const { options } = processProps(nextProps, this.elementId);
      this.racer.changeOptions(options);
    }
    return false;
  }

  public componentWillUnmount() {
    this.cleanUp();
  }

  private async runRace() {
    this.cleanUp();
    const { dataPromise, options, callback } = processProps(this.props as Props, this.elementId);
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

export default RacingBarsComponent;
