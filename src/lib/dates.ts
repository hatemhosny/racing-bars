import { Data } from './models';
import { zeroPad } from './utils';

export function getDates(data: Data[]) {
  const uniqueDates = new Set<string>();
  data.forEach(d => {
    uniqueDates.add(d.date);
  });
  return Array.from(uniqueDates).sort();
}

export function filterDates(data: Data[], startDate: string, endDate: string) {
  return data
    .filter(d => (startDate ? d.date >= startDate : true))
    .filter(d => (endDate ? d.date <= endDate : true));
}

export function getDateString(inputDate: string | Date) {
  const date = new Date(inputDate);
  if (isNaN(+date)) {
    throw new Error(`"${inputDate}" is not a valid date`);
  }

  const year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = zeroPad(month, 2);

  let day = date.getDate().toString();
  day = zeroPad(day, 2);

  return `${year}${month}${day}`;
}

export function formatDate(dateStr: string, format: string) {
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  const date = new Date(`${year}-${month}-${day}`);
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
    '12': 'Dec'
  };

  const weekDays: { [key: string]: string } = {
    '0': 'Sun',
    '1': 'Mon',
    '2': 'Tue',
    '3': 'Wed',
    '4': 'Thu',
    '5': 'Fri',
    '6': 'Sat'
  };

  return format
    .replace('MMM', monthNames[month])
    .replace('DDD', weekDays[weekDayIndex])
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day);
}
