import { hsl, select } from '../d3';

import type { Data } from '../data';
import type { ParamFunction } from '../options';
import type { Store } from '../store';
import { formatDate } from './dates';

export function getColor(d: Data, store: Store) {
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
  return hsl(hue, 0.75, 0.75 + lumVariation);
}

export function getIconID(d: Data) {
  return 'icon-' + safeName(d.name);
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

export function shuffle(arr: string[], seed: number) {
  const array = [...arr];
  let m = array.length;
  let t: string;
  let i: number;

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
  const rnd = Array(3)
    .fill(null)
    .map(() => Math.random().toString(36).substr(2))
    .join('');
  return prefix + rnd.slice(-n);
}

export function getHeight(element: HTMLElement, minHeight: number, height?: string) {
  let newHeight: number;
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
  let newWidth: number;
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

export function getElement(root: HTMLElement | HTMLDocument, className: string) {
  if (!root) return undefined;
  return (className ? root.querySelector('.' + className) : root) as HTMLElement;
}

export function showElement(root: HTMLElement, className: string, useVisibility = false) {
  const element = getElement(root, className);
  if (element) {
    if (useVisibility) {
      element.style.visibility = 'unset';
    } else {
      element.style.display = 'flex';
    }
  }
}

export function hideElement(root: HTMLElement, className: string, useVisibility = false) {
  const element = getElement(root, className);
  if (element) {
    if (useVisibility) {
      element.style.visibility = 'hidden';
    } else {
      element.style.display = 'none';
    }
  }
}

export function removeElement(root: HTMLElement, className: string) {
  const element = getElement(root, className);
  if (element) {
    element.remove();
  }
}

export function getText(
  param: string | ParamFunction,
  currentDate: string,
  dateSlice: Data[],
  dates: string[],
  isDate = false,
): string {
  if (typeof param === 'function') {
    return param(currentDate, dateSlice, dates);
  }
  if (isDate) {
    return formatDate(currentDate, param);
  }
  return param;
}

export function safeName(name: string) {
  // replace non-alphanumeric with underscore
  return String(name).replace(/[\W]+/g, '_');
}

export function toggleClass(root: HTMLElement, selector: string, className: string) {
  select(root)
    .select(selector)
    .classed(className, function () {
      return !select(this).classed(className);
    });
}

function debounce(func: any, wait: number, immediate = false) {
  let timeout: any;
  return function (_clicks: MouseEvent, _Fn: (clicks: MouseEvent) => void) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

export const getClicks = debounce(function (event: MouseEvent, Fn: (event: MouseEvent) => void) {
  Fn(event);
}, 250);

// eslint-disable-next-line @typescript-eslint/ban-types
export const pipe = (...fns: Function[]) =>
  fns.reduce(
    (f, g) =>
      (...args: any) =>
        g(f(...args)),
  );

export function getBaseUrl() {
  const scriptUrl = process.env.SCRIPT_URL;
  if (scriptUrl) {
    return scriptUrl.split('/').slice(0, -1).join('/');
  }
  return '';
}

export const getWorkerDataURL = (url: string) =>
  `data:text/javascript;charset=UTF-8;base64,` + btoa(`importScripts("${url}");`);

export const toDataUrl = (content: string, type = 'text/javascript') =>
  `data:${type};charset=UTF-8;base64,` + btoa(content);

export const createWorkerFromContent = (content: string) => {
  try {
    return new Worker(toDataUrl(content));
  } catch (e) {
    return new Worker(URL.createObjectURL(new Blob([content], { type: 'application/javascript' })));
  }
};
