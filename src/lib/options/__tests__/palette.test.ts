import { palettes, type Palette } from '../palette';
import { validateOptions } from '../validate-options';
import { optionsReducer, defaultOptions } from '../options.reducer';
import { actionTypes } from '../options.actions';

const allPaletteNames = Object.keys(palettes) as Palette[];

describe('palettes', () => {
  it('exports 26 named palettes', () => {
    expect(allPaletteNames).toHaveLength(26);
  });

  it('each palette contains exactly 10 colors', () => {
    allPaletteNames.forEach((name) => {
      expect(palettes[name]).toHaveLength(10);
    });
  });

  it('each palette entry is a valid hex color string', () => {
    allPaletteNames.forEach((name) => {
      palettes[name].forEach((color) => {
        expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });
  });
});

describe('validateOptions - colorMap with palette names', () => {
  it('accepts a valid palette name string as colorMap', () => {
    const result = validateOptions({ colorMap: 'pastel' as any });
    expect(result.colorMap).toBe('pastel');
  });

  it('rejects an invalid palette name string', () => {
    const result = validateOptions({ colorMap: 'nonexistent' as any });
    expect(result.colorMap).toBeUndefined();
  });

  it('still accepts array colorMap', () => {
    const arr = ['red', 'blue'];
    const result = validateOptions({ colorMap: arr });
    expect(result.colorMap).toEqual(arr);
  });

  it('still accepts object colorMap', () => {
    const obj = { India: 'orange' };
    const result = validateOptions({ colorMap: obj });
    expect(result.colorMap).toEqual(obj);
  });
});

describe('optionsReducer - resolves palette names to color arrays', () => {
  it('resolves a valid palette name to its color array', () => {
    const action = {
      type: actionTypes.changeOptions,
      payload: { colorMap: 'bright' as any },
    };
    const state = optionsReducer(defaultOptions, action);
    expect(state.colorMap).toEqual(palettes.bright);
  });

  it('resolves another palette name to its color array', () => {
    const action = {
      type: actionTypes.changeOptions,
      payload: { colorMap: 'pastel' as any },
    };
    const state = optionsReducer(defaultOptions, action);
    expect(state.colorMap).toEqual(palettes.pastel);
  });

  it('keeps array colorMap as-is', () => {
    const arr = ['#ff0000', '#00ff00'];
    const action = {
      type: actionTypes.changeOptions,
      payload: { colorMap: arr },
    };
    const state = optionsReducer(defaultOptions, action);
    expect(state.colorMap).toEqual(arr);
  });

  it('keeps object colorMap as-is', () => {
    const obj = { India: 'orange' };
    const action = {
      type: actionTypes.changeOptions,
      payload: { colorMap: obj },
    };
    const state = optionsReducer(defaultOptions, action);
    expect(state.colorMap).toEqual(obj);
  });
});
