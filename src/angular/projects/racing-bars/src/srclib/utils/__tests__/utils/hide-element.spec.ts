import { hideElement } from '../../utils';

describe('utils#hideElement', () => {
  const el = document.createElement('div');
  const child = document.createElement('div');
  el.appendChild(child);
  const grandChild = document.createElement('div');
  grandChild.className = 'myclass';
  child.appendChild(grandChild);

  beforeEach(() => {
    el.style.visibility = 'unset';
    child.style.visibility = 'unset';
    grandChild.style.visibility = 'unset';
    el.style.display = 'flex';
    child.style.display = 'flex';
    grandChild.style.display = 'flex';
  });

  test('hide element (display)', () => {
    hideElement(el, 'myclass');
    expect(grandChild.style.display).toBe('none');
    expect(grandChild.style.visibility).toBe('unset');
  });

  test('hide element (visibility)', () => {
    hideElement(el, 'myclass', true);
    expect(grandChild.style.display).toBe('flex');
    expect(grandChild.style.visibility).toBe('hidden');
  });

  test('hide hidden element (display)', () => {
    grandChild.style.display = 'none';
    hideElement(el, 'myclass');
    expect(grandChild.style.display).toBe('none');
    expect(grandChild.style.visibility).toBe('unset');
  });

  test('hide hidden element (visibility)', () => {
    grandChild.style.visibility = 'hidden';
    hideElement(el, 'myclass', true);
    expect(grandChild.style.display).toBe('flex');
    expect(grandChild.style.visibility).toBe('hidden');
  });
});
