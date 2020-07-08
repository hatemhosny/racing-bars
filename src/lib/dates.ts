import * as d3 from './d3';
import { Data } from './data';
import { zeroPad } from './utils';

export const getDates = (data: Data[]) => Array.from(new Set(data.map((d) => d.date))).sort();

export function getDateString(inputDate: string | Date) {
  const date = new Date(inputDate);
  if (isNaN(+date)) {
    throw new Error(`"${inputDate}" is not a valid date`);
  }

  const year = date.getFullYear().toString();
  const month = zeroPad((1 + date.getMonth()).toString(), 2);
  const day = zeroPad(date.getDate().toString(), 2);

  return `${year}-${month}-${day}`;
}

export function formatDate(dateStr: string, format = 'YYYY-MM-DD') {
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(5, 7);
  const day = dateStr.slice(8, 10);
  const date = new Date(dateStr);
  const weekDayIndex = String(date.getDay());
  const monthNames: { [key: string]: string } = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
  };

  const weekDays: { [key: string]: string } = {
    '0': 'Sun',
    '1': 'Mon',
    '2': 'Tue',
    '3': 'Wed',
    '4': 'Thu',
    '5': 'Fri',
    '6': 'Sat',
  };

  return format
    .replace('MMM', monthNames[month])
    .replace('DDD', weekDays[weekDayIndex])
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day);
}

export function getDateRange(date1: Date, date2: Date, interval: 'year' | 'month' | 'day') {
  const range = [date1, ...d3.timeDay.range(date1, date2)];

  const daysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const sameDay = date1.getDate() === date2.getDate();
  const sameMonth = date1.getMonth() === date2.getMonth();

  const numberOfMonths = d3.timeMonth.count(date1, date2);
  const numberOfYears = d3.timeYear.count(date1, date2);

  let outputRange: Date[] = [];

  if (interval === 'year') {
    if (sameMonth && sameDay) {
      outputRange = range.filter((date) => {
        if (date.getMonth() === date1.getMonth()) {
          if (date.getDate() === date1.getDate()) return true;
          if (date1.getDate() > daysInMonth(date)) {
            return date.getDate() === daysInMonth(date);
          }
        }
        return false;
      });
    } else {
      outputRange = range.filter(
        (date) => range.indexOf(date) % Math.round(range.length / numberOfYears) === 0,
      );
    }
  } else if (interval === 'month') {
    if (sameDay) {
      outputRange = range.filter((date) => {
        if (date.getDate() === date1.getDate()) return true;
        if (date1.getDate() > daysInMonth(date)) {
          return date.getDate() === daysInMonth(date);
        }
        return false;
      });
    } else {
      outputRange = range.filter(
        (date) => range.indexOf(date) % Math.round(range.length / numberOfMonths) === 0,
      );
    }
  } else if (interval === 'day') {
    outputRange = range;
  }

  if (outputRange.length === 0) {
    outputRange = [date1, date2];
  }
  if (getDateString(date1) !== getDateString(outputRange[0])) {
    outputRange = [date1, ...outputRange];
  }
  if (getDateString(date2) !== getDateString(outputRange[outputRange.length - 1])) {
    outputRange = [...outputRange, date2];
  }

  return outputRange;
}
