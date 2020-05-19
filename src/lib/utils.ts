import { Data } from './models';

export function getColor(d: Data, disableGroupColors: boolean, colorSeed: string) {
  const nameseed = d.group && !disableGroupColors ? d.group : d.name;
  const seed = nameseed + colorSeed;
  return d3.hsl(random(seed) * 360, 0.75, 0.75);
}

export function zeroPad(n: string, w: number) {
  while (n.toString().length < w) {
    n = '0' + n;
  }
  return n;
}

export function random(seedStr: string) {
  function toNumbers(s: string) {
    let nums = '';
    for (let i = 0; i < s.length; i++) {
      nums += zeroPad(String(s.charCodeAt(i)), 3);
    }
    return nums;
  }

  const seed = toNumbers(seedStr);
  const x = Math.sin(+seed) * 10000;
  return x - Math.floor(x);
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
