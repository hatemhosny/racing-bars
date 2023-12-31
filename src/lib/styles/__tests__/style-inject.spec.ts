import { styleInject } from '../style-inject';

describe('style inject', () => {
  const head = document.head;
  let testElement: HTMLTitleElement;

  beforeEach(() => {
    head.innerHTML = '';
    testElement = document.createElement('title');
    head.appendChild(testElement);
    document.body.innerHTML = '<div id="race"></div>';
  });

  test('should return empty string, if no css', () => {
    expect(
      styleInject(document.querySelector('#race')!, 'light', undefined, '', {
        light: '',
        dark: '',
      }),
    ).toBe('');
    expect(head.querySelector('style')).toBeNull();
  });

  test('should return empty string, if no selector', () => {
    expect(styleInject(null!, 'light')).toBe('');
    expect(head.querySelector('style')).toBeNull();
  });

  test('should insert style element to document head', () => {
    styleInject(document.querySelector('#race')!, 'light');
    expect(head.querySelector('style')).toBeDefined();
  });

  test('should return id of inerted style element', () => {
    const styleId = styleInject(document.querySelector('#race')!, 'light');
    expect(typeof styleId).toBe('string');
    console.log(styleId);
    expect(styleId.startsWith('styles')).toBe(true);
  });

  test('should insert style element at the top of document head', () => {
    const styleId = styleInject(document.querySelector('#race')!, 'light');
    const elements = head.childNodes;
    const insertedStyle = head.querySelector('#' + styleId);
    expect(elements[0]).toBe(insertedStyle);
    expect(elements[1]).toBe(testElement);
  });

  test('should insert style element in document head if no other elements', () => {
    head.innerHTML = '';
    const styleId = styleInject(document.querySelector('#race')!, 'light');
    const elements = head.childNodes;
    const insertedStyle = head.querySelector('#' + styleId);
    expect(elements[0]).toBe(insertedStyle);
  });

  test('can be configured to insert style element at the bottom of document head', () => {
    const styleId = styleInject(document.querySelector('#race')!, 'light', 'bottom');
    const elements = head.childNodes;
    const insertedStyle = head.querySelector('#' + styleId);
    expect(elements[0]).toBe(testElement);
    expect(elements[1]).toBe(insertedStyle);
  });

  test('the inserted styles should contain the generated css (light theme)', () => {
    const styles = '__selector__ div { margin: 10px; }';
    const themes = {
      light: '__selector__ div { color: white; }',
      dark: '__selector__ div { color: black; }',
    };
    const selector = '#race';
    const css = (styles + themes.light).split('__selector__').join(selector);
    const styleId = styleInject(document.querySelector(selector)!, 'light', 'top', styles, themes);
    const insertedStyle = head.querySelector('#' + styleId);
    expect(insertedStyle?.innerHTML.includes(css)).toBe(true);
    expect(insertedStyle?.innerHTML.includes(css)).toBe(true);
  });

  test('the inserted styles should contain the generated css (dark theme)', () => {
    const styles = '__selector__ div { margin: 10px; }';
    const themes = {
      light: '__selector__ div { color: white; }',
      dark: '__selector__ div { color: black; }',
    };
    const selector = '#race';
    const css = (styles + themes.dark).split('__selector__').join(selector);
    const styleId = styleInject(document.querySelector(selector)!, 'dark', 'top', styles, themes);
    const insertedStyle = head.querySelector('#' + styleId);
    expect(insertedStyle?.innerHTML.includes(css)).toBe(true);
    expect(insertedStyle?.innerHTML.includes(css)).toBe(true);
  });
});
