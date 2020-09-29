import { safeName } from '../../utils';

describe('utils#safeName', () => {
  test('should not modify safe string', () => {
    expect(safeName('safeName')).toBe('safeName');
    expect(safeName('safeName56')).toBe('safeName56');
  });

  test('should replace non-alphanumeric with underscore', () => {
    expect(safeName('unsafe&Name$')).toBe('unsafe_Name_');
    expect(safeName('unsafe.Name,')).toBe('unsafe_Name_');
  });
});
