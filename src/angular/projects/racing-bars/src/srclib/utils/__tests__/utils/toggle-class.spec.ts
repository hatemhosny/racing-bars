import { toggleClass } from '../../utils';

describe('utils#toggleClass', () => {
  const el = document.createElement('div');
  const child = document.createElement('div');
  el.appendChild(child);
  const grandChild = document.createElement('p');
  child.appendChild(grandChild);

  beforeEach(() => {
    grandChild.className = 'myclass';
  });

  test('toggleClass', () => {
    toggleClass(el, 'p', 'myclass');
    expect(grandChild.classList.contains('myclass')).toBeFalsy();
    toggleClass(el, 'p', 'myclass');
    expect(grandChild.classList.contains('myclass')).toBeTruthy();
  });
});
