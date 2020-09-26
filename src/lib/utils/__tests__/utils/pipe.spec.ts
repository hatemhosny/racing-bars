import { pipe } from '../../utils';

describe('utils#pipe', () => {
  const addOne = (x: number) => x + 1;
  const multiplyfive = (x: number) => x * 5;
  const minusTwo = (x: number) => x - 2;
  test('pipe', () => {
    const calc = pipe(addOne, multiplyfive, minusTwo);
    expect(calc(5)).toBe(28);
  });
});
