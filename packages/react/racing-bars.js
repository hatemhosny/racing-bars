/* eslint-disable */
import React from 'react';
import { generateId, race } from '../../dist/racing-bars.esm';
import { getData } from '../get-data';

export class RacingBarsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.elementId = generateId();
  }

  render() {
    return React.createElement('div', { id: this.elementId });
  }

  componentDidMount() {
    setTimeout(() => {
      this.runRace();
    });
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.runRace();
    });
  }

  componentWillUnmount() {
    this.cleanUp();
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
