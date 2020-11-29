import { getIconID } from '../../utils';
import { Data } from '../../..';

describe('utils#getIconID', () => {
  const dataObj = ({ name: 'a' } as unknown) as Data;
  test('starts with "icon-"', () => {
    expect(getIconID(dataObj).startsWith('icon-')).toBeTruthy();
  });
});
