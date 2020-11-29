import { generateId } from '../utils';
import { styles as _styles, themes as _themes } from './generated-styles';

// modifed from https://github.com/egoist/style-inject
export function styleInject(
  selector: string,
  theme: string,
  insertAt = 'top',
  styles = _styles,
  themes = _themes,
): string {
  let css = styles + (themes as any)[theme];

  if (!css || !selector || typeof document === 'undefined') {
    return '';
  }

  // replace with selector
  css = css.split('__selector__').join(selector);

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
