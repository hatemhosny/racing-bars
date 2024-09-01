import { interpolate } from '../d3';

import type { Data, WideData } from '../data';
import type { Options } from '../options';
import { loadData } from '../load-data';
// eslint-disable-next-line import/no-internal-modules
import { getDateString, getDateRange } from '../utils/dates';

export function prepareData(
  data: Data[] | WideData[] | Promise<Data[]> | Promise<WideData[]> | string,
  options: Options,
  baseUrl: string,
): Promise<Data[]> {
  return fetchData(data, options.dataType, baseUrl)
    .then(filterByDate(options.startDate, options.endDate))
    .then(wideDataToLong(options.dataShape))
    .then(processFixedOrder(options.fixedOrder))
    .then(validateAndSort)
    .then(fillDateGaps(options.fillDateGapsInterval, options.fillDateGapsValue, options.topN))
    .then(calculateLastValues(options.makeCumulative));
}

function fetchData(
  data: Data[] | WideData[] | Promise<Data[]> | Promise<WideData[]> | string,
  dataType: Options['dataType'],
  baseUrl: string,
) {
  if (typeof data === 'string') {
    let dataUrl = data;
    if (isRelativeUrl(dataUrl)) {
      try {
        dataUrl = new URL(data, baseUrl).href;
      } catch {
        throw new Error(`Invalid URL: ${data}`);
      }
    }
    return loadData(dataUrl, dataType);
  }
  return Promise.resolve(data);
}

function isRelativeUrl(url: string) {
  return !url.startsWith('https://') && !url.startsWith('http://') && !url.startsWith('data:');
}

function filterByDate(startDate: string, endDate: string) {
  return function (data: Data[] | WideData[]): Data[] | WideData[] {
    return data
      .map((d) => ({ ...d, date: getDateString(d.date) }))
      .filter((d) => (startDate ? d.date >= startDate : true))
      .filter((d) => (endDate ? d.date <= endDate : true));
  };
}

function processFixedOrder(fixedOrder: string[]) {
  return function (data: Data[]) {
    return fixedOrder.length === 0
      ? data
      : data
          .filter((d) => fixedOrder.includes(d.name))
          .map((d) => ({ ...d, rank: fixedOrder.indexOf(d.name) }));
  };
}

function validateAndSort(data: Data[]): Data[] {
  return data
    .map((d) => {
      const name = d.name ? d.name : '';
      const value = isNaN(+d.value) ? 0 : +d.value;
      return { ...d, name, value };
    })
    .sort((a, b) => a.date.localeCompare(b.date) || a.name.localeCompare(b.name));
}

function fillDateGaps(
  fillDateGapsInterval: Options['fillDateGapsInterval'],
  fillDateGapsValue: Options['fillDateGapsValue'],
  topN: number,
) {
  return function (data: Data[]) {
    return fillDateGapsInterval
      ? fillGaps(data, fillDateGapsInterval, fillDateGapsValue, topN)
      : data;
  };
}

function calculateLastValues(makeCumulative = false) {
  return function (data: Data[]) {
    return data
      .sort((a, b) => a.name.localeCompare(b.name) || a.date.localeCompare(b.date))
      .reduce((acc: Data[], curr) => {
        if (acc.length === 0) {
          curr.lastValue = curr.value;
        } else {
          const last = acc[acc.length - 1];
          if (curr.name === last.name) {
            curr.lastValue = last.value;
            if (makeCumulative) {
              curr.value = last.value + curr.value;
            }
          } else {
            curr.lastValue = curr.value;
          }
        }
        return [...acc, curr];
      }, []);
  };
}

function wideDataToLong(dataShape: Options['dataShape'], nested = false) {
  return function (data: WideData[]) {
    if (dataShape === 'long') return data as Data[];

    const long = [] as Data[];
    data.forEach((row) => {
      for (const [key, value] of Object.entries(row)) {
        if (key === 'date') {
          continue;
        }

        let item: any = {
          date: row.date,
          name: key,
        };
        if (nested) {
          item = {
            ...item,
            ...value,
          };
        } else {
          item = {
            ...item,
            value,
          };
        }
        long.push(item);
      }
    });
    return long;
  };
}

function longDataToWide(long: Data[]) {
  const wide = [] as WideData[];
  long.forEach((item) => {
    const dateRow = wide.filter((r) => r.date === item.date);
    const row = dateRow.length > 0 ? dateRow[0] : ({} as WideData);
    const { date, ...details } = item;
    row[item.name] = details;
    if (dateRow.length === 0) {
      row.date = item.date;
      wide.push(row);
    }
  });
  return wide;
}

function fillGaps(
  data: Data[],
  interval: Options['fillDateGapsInterval'],
  fillValue: Options['fillDateGapsValue'],
  topN: number,
) {
  if (!interval) {
    return data;
  }

  const wideData = longDataToWide(data).map((d) => ({ ...d, date: new Date(d.date) }));

  const allData = wideData
    .reduce(
      (acc: any[], row, i) => {
        const lastDate = acc[acc.length - 1].date;
        const range = getDateRange(lastDate, row.date, interval).slice(1);

        const rangeStep = 1 / range.length;
        if (i < wideData.length) {
          const iData = interpolateTopN(wideData[i - 1], wideData[i], topN);
          const newData: any[] = [];
          range.forEach((_: any, j: number) => {
            const values = fillValue === 'last' ? iData(0) : iData((j + 1) * rangeStep);
            const newRow: any = { date: range[j] };
            for (const [key, value] of Object.entries(values)) {
              if (key !== 'date') {
                newRow[key] = { ...(value as any) };
              }
            }
            newData.push(getDateString(row.date) === getDateString(newRow.date) ? row : newRow);
          });
          return [...acc, ...newData];
        } else {
          return [...acc];
        }
      },
      [wideData[0]],
    )
    .map((d) => ({ ...d, date: getDateString(d.date) }));

  return wideDataToLong('wide', true)(allData);
}

/** Interpolate only topN before and after the date range to improve performance */
function interpolateTopN(data1: any = {}, data2: any = {}, topN: number) {
  const topData1 = getTopN(data1, topN);
  const topData2 = getTopN(data2, topN);
  const topNames = Array.from(new Set([...topData1, ...topData2]));

  const filteredData1 = topNames.reduce(
    (acc, curr) => ({ ...acc, [curr]: data1[curr] }),
    {} as WideData,
  );

  const filteredData2 = topNames.reduce(
    (acc, curr) => ({ ...acc, [curr]: data2[curr] }),
    {} as WideData,
  );

  return interpolate(filteredData1, filteredData2);

  function getTopN(data: { [key: string]: { name: string; value: number } } = {}, topN: number) {
    return Object.keys(data)
      .filter((key) => key !== 'date')
      .map((key) => data[key])
      .sort(function (a, b) {
        return b.value - a.value;
      })
      .slice(0, topN)
      .map((d) => d.name);
  }
}
