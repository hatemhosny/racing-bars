import { zeroPad } from '../../utils';

describe('utils#zeroPad', () => {
  test('zeroPad', () => {
    expect(zeroPad('5', 3)).toBe('005');
    expect(zeroPad('5675', 3)).toBe('5675');
    expect(zeroPad('0', 0)).toBe('0');
  });
});
