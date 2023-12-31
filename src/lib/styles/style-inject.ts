import { generateId } from '../utils';
// @ts-ignore
import _styles from '../../../tmp/styles.css?raw';
// @ts-ignore
import lightTheme from '../../../tmp/light.theme.css?raw';
// @ts-ignore
import darkTheme from '../../../tmp/dark.theme.css?raw';

const _themes = {
  light: lightTheme,
  dark: darkTheme,
};

// modifed from https://github.com/egoist/style-inject
export function styleInject(
  container: HTMLElement,
  theme: string,
  insertAt = 'top',
  styles = _styles,
  themes = _themes,
): string {
  let css = styles + (themes as any)[theme];

  if (!css || !container || typeof document === 'undefined') {
    return '';
  }

  container.id = container.id || generateId();
  css = css.replace(/__selector__/g, '#' + container.id);

  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style') as HTMLStyleElement | any;
  style.id = generateId('styles');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  return style.id;
}
