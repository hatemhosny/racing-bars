import { styles, themes } from '../generated-styles';

describe('generated styles', () => {
  test('`styles` is a string', () => {
    expect(typeof styles).toBe('string');
  });

  test('`styles` contains the string "__selector__"', () => {
    expect(styles.includes('__selector__')).toBe(true);
  });

  test('`themes` is an object with "light" and "dark" properties', () => {
    expect(typeof themes).toBe('object');
    expect(typeof themes.light).toBe('string');
    expect(typeof themes.dark).toBe('string');
  });

  test('light and dark themes contain the string "__selector__"', () => {
    expect(themes.light.includes('__selector__')).toBe(true);
    expect(themes.dark.includes('__selector__')).toBe(true);
  });
});
