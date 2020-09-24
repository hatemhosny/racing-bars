import { showElement } from '../../utils';

describe('utils#showElement', () => {
  const el = document.createElement('div');
  const child = document.createElement('div');
  el.appendChild(child);
  const grandChild = document.createElement('div');
  grandChild.className = 'myclass';
  child.appendChild(grandChild);

  beforeEach(() => {
    el.style.visibility = 'hidden';
    child.style.visibility = 'hidden';
    grandChild.style.visibility = 'hidden';
    el.style.display = 'none';
    child.style.display = 'none';
    grandChild.style.display = 'none';
  });

  test('show hidden element (display)', () => {
    showElement(el, 'myclass');
    expect(grandChild.style.display).toBe('flex');
    expect(grandChild.style.visibility).toBe('hidden');
  });

  test('show hidden element (visibility)', () => {
    showElement(el, 'myclass', true);
    expect(grandChild.style.display).toBe('none');
    expect(grandChild.style.visibility).toBe('unset');
  });

  test('show shown element (display)', () => {
    grandChild.style.display = 'flex';
    showElement(el, 'myclass');
    expect(grandChild.style.display).toBe('flex');
    expect(grandChild.style.visibility).toBe('hidden');
  });

  test('show shown element (visibility)', () => {
    grandChild.style.visibility = 'unset';
    showElement(el, 'myclass', true);
    expect(grandChild.style.display).toBe('none');
    expect(grandChild.style.visibility).toBe('unset');
  });
});
