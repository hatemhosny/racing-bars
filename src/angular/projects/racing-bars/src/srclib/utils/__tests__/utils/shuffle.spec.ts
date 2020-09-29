import { shuffle } from '../../utils';

describe('utils#shuffle', () => {
  test('shuffle', () => {
    const arr = ['1', '2', '3', '4', '5'];
    expect(shuffle([...arr], 5)).not.toEqual([...arr]);
    expect(shuffle([...arr], 5)).toEqual(shuffle([...arr], 5));
  });
});
