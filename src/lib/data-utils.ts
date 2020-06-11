import { formatDate, getDateString, getDates } from './dates';
import { Data, WideData } from './data';
import { store, actions } from './store';
import { Options } from './options';

export function prepareData(rawData: Data[]) {
  const options = store.getState().options;

  let data = rawData
    .map((d) => ({ ...d, date: getDateString(d.date) }))
    .filter((d) => (options.startDate ? d.date >= options.startDate : true))
    .filter((d) => (options.endDate ? d.date <= options.endDate : true));

  if (options.dataShape === 'wide') {
    data = wideDataToLong(data);
  }

  if (options.fillDateGaps) {
    data = fillGaps(data, options.fillDateGaps);
  }

  data = data.map((d) => {
    const name = d.name ? d.name : '';
    const value = isNaN(+d.value) ? 0 : +d.value;
    return { ...d, name, value };
  });

  data = calculateLastValues(data);

  loadDataCollectionsToState(data);

  return data;
}

function loadDataCollectionsToState(data: Data[]) {
  const names = Array.from(new Set(data.map((d) => d.name))).sort() as string[];
  const groups = Array.from(new Set(data.map((d) => d.group)))
    .filter(Boolean)
    .sort() as string[];
  const dates = getDates(data);
  const formattedDates = dates.map((date: string) => formatDate(date));

  store.dispatch(actions.data.dataLoaded({ names, groups, dates, formattedDates }));
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

function wideDataToLong(wide: WideData[]) {
  const long = [] as Data[];
  wide.forEach((item: WideData) => {
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
  const minDate = new Date(formatDate(dates[0]));
  const maxDate = new Date(formatDate(dates[dates.length - 1]));

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
    .filter((d) => (!!d.group ? !store.getState().data.groupFilter.includes(d.group) : true))
    .sort((a, b) => b.value - a.value)
    .map((d, i) => ({ ...d, rank: i }));
}
