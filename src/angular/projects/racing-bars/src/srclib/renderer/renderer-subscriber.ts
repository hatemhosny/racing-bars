import { Store } from '../store';
import { Renderer } from './renderer.models';

export function rendererSubscriber(store: Store, renderer: Renderer) {
  return function () {
    if (store.getState().triggerRender) {
      renderer.renderFrame();
    }
  };
}
