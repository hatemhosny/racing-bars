import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import { racingBars } from '../../../../dist/react/racing-bars.esm.js';

export default function () {
  const title = '';
  useEffect(() => {
    racingBars.loadData('/data/population.csv', 'csv').then((data) => {
      racingBars.race(data);
    });
  });

  return (
    <Layout title={title}>
      <div className="gallery">
        <div id="race"></div>
      </div>
    </Layout>
  );
}
