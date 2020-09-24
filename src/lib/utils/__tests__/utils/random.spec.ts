import { random } from '../../utils';

describe('utils#random', () => {
  test('random', () => {
    expect(random(5)).toBe(random('5'));
    expect(random('hello')).toBe(random('hello'));
  });
});
