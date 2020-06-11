import * as d3 from './d3';

import { Data } from './data';
import { store } from './store';
import { formatDate } from './dates';
import { ParamFunction } from './options';

export function getColor(d: Data) {
  const { names, groups } = store.getState().data;
  const { showGroups, colorSeed, colorMap } = store.getState().options;

  if (d.color) {
    return d.color;
  }

  const useGroup = Boolean(d.group) && showGroups && groups.length > 0;
  let values = useGroup ? groups : names;
  if (colorSeed) {
    values = shuffle(values, toNumber(colorSeed));
  }
  const currentValue = (useGroup ? d.group : d.name) as string;
  let index = values.indexOf(currentValue);

  if (colorMap) {
    if (Array.isArray(colorMap)) {
      while (index > colorMap.length - 1) {
        index = index - colorMap.length;
      }
      return colorMap[index];
    } else {
      if (colorMap[currentValue]) {
        return colorMap[currentValue];
      }
    }
  }

  const negativeIfOdd = index % 2 === 0 ? 1 : -1;
  const lumVariation = (random(currentValue) / 10) * negativeIfOdd;
  const HueSpacing = 360 / (values.length + 1);
  const hue = (values.indexOf(currentValue) + 1) * HueSpacing;
  return d3.hsl(hue, 0.75, 0.75 + lumVariation);
}

export function getIconID(d: Data) {
  return 'icon-' + d.name.toLowerCase().split(' ').join('_');
}

export function zeroPad(n: string, w: number) {
  while (n.toString().length < w) {
    n = '0' + n;
  }
  return n;
}

function toNumber(s: string | number) {
  s = String(s);
  let nums = '';
  for (let i = 0; i < s.length; i++) {
    nums += zeroPad(String(s.charCodeAt(i)), 3);
  }
  return +nums;
}

export function random(InputSeed: string | number) {
  const seed = toNumber(InputSeed);
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function randomString(prefix: string, n: number) {
  const rnd = Array(3)
    .fill(null)
    .map(() => Math.random().toString(36).substr(2))
    .join('');
  return prefix + rnd.slice(-n);
}

export function shuffle(arr: any[], seed: number) {
  const array = [...arr];
  let m = array.length;
  let t;
  let i;

  while (m) {
    i = Math.floor(random(seed) * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
    ++seed;
  }

  return array;
}

export function generateId(prefix = 'racingbars', n = 8) {
  return randomString(prefix, n);
}

export function getHeight(element: HTMLElement, minHeight: number, height?: string) {
  let newHeight;
  if (!height) {
    newHeight = element.getBoundingClientRect().height;
  } else if (String(height).startsWith('window')) {
    const scale = +height.split('*')[1] || 1;
    newHeight = window.innerHeight * scale;
  } else {
    newHeight = +height;
  }
  return newHeight > minHeight ? newHeight : minHeight;
}

export function getWidth(element: HTMLElement, minWidth: number, width?: string) {
  let newWidth;
  if (!width) {
    newWidth = element.getBoundingClientRect().width;
  } else if (String(width).startsWith('window')) {
    const scale = +width.split('*')[1] || 1;
    newWidth = window.innerWidth * scale;
  } else {
    newWidth = +width;
  }
  return newWidth > minWidth ? newWidth : minWidth;
}

export function getElement(className: string) {
  const element = document.querySelector(store.getState().options.selector) as HTMLElement;
  return element.querySelector('.' + className) as HTMLElement;
}

export function showElement(className: string) {
  const selector = store.getState().options.selector;
  const element = document.querySelector(selector + ' .' + className) as HTMLElement;
  if (element) {
    element.style.display = 'flex';
  }
}

export function hideElement(className: string) {
  const selector = store.getState().options.selector;
  const element = document.querySelector(selector + ' .' + className) as HTMLElement;
  if (element) {
    element.style.display = 'none';
  }
}

export function removeElement(className: string) {
  const selector = store.getState().options.selector;
  const element = document.querySelector(selector + ' .' + className) as HTMLElement;
  if (element) {
    element.remove();
  }
}

export function addEventHandler(className: string, event: string, handler: () => void) {
  const element = getElement(className);
  if (element) {
    element.addEventListener(event, handler);
  }
}

export function getText(param: string | ParamFunction, dateSlice: Data[], isDate = false): string {
  if (typeof param === 'function') {
    return param(
      formatDate(store.getState().ticker.currentDate),
      dateSlice.map((d) => ({ ...d, date: formatDate(d.date) })),
      store.getState().ticker.dates.map((date) => formatDate(date)),
    );
  }
  if (isDate) {
    return formatDate(store.getState().ticker.currentDate, param);
  }
  return param;
}
