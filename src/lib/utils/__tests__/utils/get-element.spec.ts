import { getElement } from '../../utils';

describe('utils#getElement', () => {
  const el = document.createElement('div');
  const child = document.createElement('div');
  el.appendChild(child);
  const grandChild = document.createElement('div');
  grandChild.className = 'myclass';
  child.appendChild(grandChild);

  test('get element by class', () => {
    expect(getElement(el, 'myclass')).toBe(grandChild);
  });

  test('no class returns root element', () => {
    expect(getElement(el, '')).toBe(el);
  });

  test('no root element returns falsy', () => {
    expect(getElement(document.querySelector('.none') as HTMLElement, 'myclass')).toBeFalsy();
  });

  test('unknown class returns falsy', () => {
    expect(getElement(el, 'unknown-class')).toBeFalsy();
  });
});
