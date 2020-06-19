import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import { racingBars } from '../../../../dist/react/racing-bars.esm.js';

export default function () {
  const title = '';
  useEffect(() => {
    const options = {
      dateCounter: (currentDate, dateSlice, allDates) =>
        `${allDates.indexOf(currentDate) + 1} of ${allDates.length}`,
    };

    racingBars.loadData('/data/population.csv', 'csv').then((data) => {
      racingBars.race(data, options);
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
