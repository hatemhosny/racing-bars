import { formatDate, getDateString } from './dates';
import { Data } from './models';
import { getColor } from './utils';

export function prepareData(data: Data[], dataShape: string, disableGroupColors: boolean, colorSeed: string) {
  if (dataShape === 'wide') {
    data = wideDataToLong(data);
  }
  return data.map(item => {
    const d = { ...item };
    d.value = isNaN(+d.value) ? 0 : +d.value;
    d.date = getDateString(d.date);
    d.color = getColor(d, disableGroupColors, colorSeed);
    return d;
  });
}

export function wideDataToLong(wide: any) {
  const long = [] as Data[];
  wide.forEach((item: any) => {
    for (const [key, value] of Object.entries(item)) {
      long.push({
        date: item.date,
        name: key,
        value: Number(value)
      });
    }
  });
  return long;
}

export function fillGaps(data: Data[], dates: string[], period: 'years' | 'months' | 'days') {
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
    }
  };
  if (!next[period]) {
    return data;
  }

  const dateRange: string[] = [];
  for (const date = minDate; date < maxDate; next[period](date)) {
    dateRange.push(getDateString(date));
  }

  dateRange.forEach((date, index) => {
    if (data.filter(d => d.date === date).length > 0) {
      return;
    }

    const missing = data
      .filter(d => d.date === dateRange[index - 1])
      .map(d =>
        // const value = {
        //   last: d.value,
        //   zero: 0,
        // }
        ({
          ...d,
          date
          // value: value[fillDateGapsValue],
        })
      );

    data.push(...missing);
  });

  return data;
}

export function getDateSlice(data: Data[], date: string, lastValues: any, topN: number) {
  const dateSlice = data
    .filter(d => d.date === date && !isNaN(d.value))
    .map(d => {
      if (!lastValues) {
        return d;
      }

      const lastValue = lastValues[d.name].value;
      lastValues[d.name].date = d.date;
      lastValues[d.name].value = d.value;
      return { ...d, lastValue };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, topN);
  dateSlice.forEach((d, i) => (d.rank = i));

  return dateSlice;
}
