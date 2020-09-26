import { removeElement } from '../../utils';

describe('utils#removeElement', () => {
  let el: HTMLElement;
  let child: HTMLElement;
  let grandChild: HTMLElement;

  beforeEach(() => {
    el = document.createElement('div');
    child = document.createElement('div');
    el.appendChild(child);
    grandChild = document.createElement('div');
    grandChild.className = 'myclass';
    child.appendChild(grandChild);
  });

  test('remove element', () => {
    removeElement(el, 'myclass');
    expect(child.childElementCount).toBe(0);
  });

  test('remove root element', () => {
    removeElement(child, '');
    expect(el.childElementCount).toBe(0);
  });

  test('do nothing if no selected element', () => {
    removeElement(el, 'unknown-class');
    expect(child.childElementCount).toBe(1);
  });

  test('do nothing if no root element', () => {
    removeElement(document.querySelector('.none') as HTMLElement, 'unknown-class');
    expect(child.childElementCount).toBe(1);
  });
});
