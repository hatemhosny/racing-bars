import type { Store } from '../store';
import type { Renderer } from './renderer.models';

export function rendererSubscriber(store: Store, renderer: Renderer) {
  return function () {
    if (store.getState().triggerRender) {
      renderer.renderFrame();
    }
  };
}
