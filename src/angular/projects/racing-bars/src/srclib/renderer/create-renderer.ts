import { Data } from '../data';
import { Store } from '../store';
import { Renderer } from './renderer.models';
import { renderInitalView } from './render-initial-view';
import { renderFrame } from './render-frame';
import { resize } from './resize';
import { RenderOptions } from './render-options';

export function createRenderer(data: Data[], store: Store): Renderer {
  const renderOptions = {} as RenderOptions;

  return {
    renderInitalView: () => renderInitalView(data, store, renderOptions),
    renderFrame: () => renderFrame(data, store, renderOptions),
    resize: () => resize(data, store, renderOptions),
  };
}
