import React from 'react';

import { loadData, race } from '../../dist/racing-bars.esm';

export default class RacingBars extends React.Component {
  constructor(props) {
    super(props);
    this.options = { ...props };
  }

  runRace() {
    loadData(this.options.data).then((data) => {
      race(data, this.options);
    });
  }

  componentDidMount() {
    this.runRace();
  }

  // componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return React.createElement('div', { id: 'race', className: 'race' });
  }
}
