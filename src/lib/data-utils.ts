import { formatDate, getDateString, getDates, filterDates } from './dates';
import { Data } from './models';
import { getColor } from './utils';
import { store } from './store';
import { Options } from './options';

export function prepareData(data: Data[]) {
  const options = store.getState().options;

  data = filterDates(data, options.startDate, options.endDate);

  if (options.dataShape === 'wide') {
    data = wideDataToLong(data);
  }

  if (options.fillDateGaps) {
    data = fillGaps(data, options.fillDateGaps);
  }

  data = data.map((item) => {
    const d = { ...item };
    d.value = isNaN(+d.value) ? 0 : +d.value;
    d.date = getDateString(d.date);
    d.color = getColor(d, options.disableGroupColors, options.colorSeed);
    return d;
  });

  data = calculateLastValues(data);

  return data;
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
    }, [])
    .sort((a, b) => a.date.localeCompare(b.date));
}

function wideDataToLong(wide: any) {
  const long = [] as Data[];
  wide.forEach((item: any) => {
    for (const [key, value] of Object.entries(item)) {
      long.push({
        date: item.date,
        name: key,
        value: Number(value),
      });
    }
  });
  return long;
}

function fillGaps(data: Data[], period: Options['fillDateGaps']) {
  if (!period) {
    return data;
  }

  const dates = getDates(data);
  const minDate = new Date(formatDate(dates[0], 'YYYY-MM-DD'));
  const maxDate = new Date(formatDate(dates[dates.length - 1], 'YYYY-MM-DD'));

  const next = {
    years: (dt: Date) => {
      dt.setFullYear(dt.getFullYear() + 1);
    },
    months: (dt: Date) => {
      dt.setMonth(dt.getMonth() + 1);
    },
    days: (dt: Date) => {
      dt.setDate(dt.getDate() + 1);
    },
  };
  if (!next[period]) {
    return data;
  }

  const dateRange: string[] = [];
  for (const date = minDate; date < maxDate; next[period](date)) {
    dateRange.push(getDateString(date));
  }

  dateRange.forEach((date, index) => {
    if (data.filter((d) => d.date === date).length > 0) {
      return;
    }

    const missing = data
      .filter((d) => d.date === dateRange[index - 1])
      .map((d) =>
        // const value = {
        //   last: d.value,
        //   zero: 0,
        // }
        ({
          ...d,
          date,
          // value: value[fillDateGapsValue],
        }),
      );

    data.push(...missing);
  });

  return data;
}

export function getDateSlice(data: Data[], date: string) {
  return data
    .filter((d) => d.date === date && !isNaN(d.value))
    .sort((a, b) => b.value - a.value)
    .slice(0, store.getState().options.topN)
    .map((d, i) => ({ ...d, rank: i }));
}
