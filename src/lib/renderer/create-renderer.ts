import type { Data } from '../data';
import type { Store } from '../store';
import type { Renderer } from './renderer.models';
import { renderInitialView } from './render-initial-view';
import { renderFrame } from './render-frame';
import { resize } from './resize';
import type { RenderOptions } from './render-options';

export function createRenderer(data: Data[], store: Store, root: HTMLElement): Renderer {
  const renderOptions = { root } as RenderOptions;

  return {
    renderInitialView: () => renderInitialView(data, store, renderOptions),
    renderFrame: () => renderFrame(data, store, renderOptions),
    resize: () => resize(data, store, renderOptions),
  };
}
