import type { Data } from '../data';
import type { Store } from '../store';
import { getHeight, getWidth } from '../utils';
import type { RenderOptions } from './render-options';
import { renderInitialView } from './render-initial-view';
import { renderFrame } from './render-frame';
import { updateControls } from './controls';

export function resize(data: Data[], store: Store, renderOptions: RenderOptions) {
  const { inputHeight, inputWidth, minHeight, minWidth } = store.getState().options;
  const { root } = renderOptions;

  if (!root) return;

  if (
    (!inputHeight && !inputWidth) ||
    String(inputHeight).startsWith('window') ||
    String(inputWidth).startsWith('window')
  ) {
    renderOptions.height = getHeight(root, minHeight, String(inputHeight));
    renderOptions.width = getWidth(root, minWidth, String(inputWidth));

    const currentPosition = root.style.position; // "fixed" if scrolling

    renderInitialView(data, store, renderOptions);
    renderFrame(data, store, renderOptions);
    renderFrame(data, store, renderOptions); // workaround to avoid showing lastValue
    updateControls(store, renderOptions);

    root.style.position = currentPosition;
  }
}
