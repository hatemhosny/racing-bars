import { generateId } from '../../utils';

describe('utils#generateId', () => {
  test('generateId', () => {
    expect(generateId()).not.toBe(generateId());
    expect(generateId('hello', 5)).not.toBe(generateId('hello', 5));
    expect(generateId('hello')).not.toBe(generateId('hello'));
    expect(generateId('hello', 5).length).toBe(10);
  });
});
