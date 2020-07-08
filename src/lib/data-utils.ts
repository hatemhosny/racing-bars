import * as d3 from './d3';

import { getDateString, getDates, getDateRange } from './dates';
import { Data, WideData } from './data';
import { actions, Store } from './store';
import { Options } from './options';

export function prepareData(rawData: Data[], store: Store) {
  const options = store.getState().options;

  let data = rawData;

  if (options.dataTransform && typeof options.dataTransform === 'function') {
    data = options.dataTransform(data) as Data[];
  }

  data = data
    .map((d) => ({ ...d, date: getDateString(d.date) }))
    .filter((d) => (options.startDate ? d.date >= options.startDate : true))
    .filter((d) => (options.endDate ? d.date <= options.endDate : true));

  if (options.dataShape === 'wide') {
    data = wideDataToLong(data);
  }

  if (options.fixedOrder.length > 0) {
    data = data
      .filter((d) => options.fixedOrder.includes(d.name))
      .map((d) => ({ ...d, rank: options.fixedOrder.indexOf(d.name) }));
  }

  data = data
    .map((d) => {
      const name = d.name ? d.name : '';
      const value = isNaN(+d.value) ? 0 : +d.value;
      return { ...d, name, value };
    })
    .sort((a, b) => a.date.localeCompare(b.date) || a.name.localeCompare(b.name));

  if (options.fillDateGapsInterval) {
    data = fillGaps(data, options.fillDateGapsInterval, options.fillDateGapsValue, options.topN);
  }

  data = calculateLastValues(data);

  storeDataCollections(data, store);

  return data;
}

function storeDataCollections(data: Data[], store: Store) {
  const names = Array.from(new Set(data.map((d) => d.name))).sort() as string[];
  const groups = Array.from(new Set(data.map((d) => d.group)))
    .filter(Boolean)
    .sort() as string[];
  const dates = getDates(data);

  store.dispatch(actions.data.dataLoaded({ names, groups }));
  store.dispatch(actions.ticker.initialize(dates));
}

function calculateLastValues(data: Data[]) {
  return data
    .sort((a, b) => a.name.localeCompare(b.name) || a.date.localeCompare(b.date))
    .reduce((acc: Data[], curr) => {
      if (acc.length === 0) {
        curr.lastValue = curr.value;
      } else {
        const last = acc[acc.length - 1];
        if (curr.name === last.name) {
          curr.lastValue = last.value;
        } else {
          curr.lastValue = curr.value;
        }
      }
      return [...acc, curr];
    }, []);
}

function wideDataToLong(wide: WideData[], nested = false) {
  const long = [] as Data[];
  wide.forEach((row) => {
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
}

function longDataToWide(long: Data[]) {
  const wide = [] as any[];
  long.forEach((item) => {
    const dateRow = wide.filter((r) => r.date === item.date);
    const row = dateRow.length > 0 ? dateRow[0] : {};
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
          range.forEach((_, j) => {
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

  return wideDataToLong(allData, true);
}

/** Interpolate only topN before and after the date range to improve performace */
function interpolateTopN(
  data1: Partial<WideData> = {},
  data2: Partial<WideData> = {},
  topN: number,
) {
  const topData1 = getTopN(data1, topN);
  const topData2 = getTopN(data2, topN);
  const topNames = Array.from(new Set([...topData1, ...topData2]));

  const filteredData1 = topNames.reduce((obj, curr) => {
    obj[curr] = data1[curr];
    return obj;
  }, {} as WideData);

  const filteredData2 = topNames.reduce((obj, curr) => {
    obj[curr] = data2[curr];
    return obj;
  }, {} as WideData);

  return d3.interpolate(filteredData1, filteredData2);

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

export function getDateSlice(data: Data[], date: string, groupFilter: string[]) {
  const slice = data
    .filter((d) => d.date === date && !isNaN(d.value))
    .filter((d) => (!!d.group ? !groupFilter.includes(d.group) : true))
    .sort((a, b) => b.value - a.value)
    .map((d, i) => ({ ...d, rank: d.rank ?? i }));

  const emptyData = [{ name: '', value: 0, lastValue: 0, date, rank: 1 }];

  return slice.length > 0 ? slice : emptyData;
}
