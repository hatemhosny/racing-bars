import { Data } from '../data';
import { Store } from '../store';
import { getHeight, getWidth } from '../utils';
import { RenderOptions } from './render-options';
import { renderInitalView } from './render-initial-view';
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
    renderOptions.height = getHeight(root, minHeight, inputHeight);
    renderOptions.width = getWidth(root, minWidth, inputWidth);

    const currentPosition = root.style.position; // "fixed" if scrolling

    renderInitalView(data, store, renderOptions);
    renderFrame(data, store, renderOptions);
    renderFrame(data, store, renderOptions); // workaround to avoid showing lastValue
    updateControls(store, renderOptions);

    root.style.position = currentPosition;
  }
}
