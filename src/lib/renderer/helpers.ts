import type { Data } from '../data';
import { actions, type Store } from '../store';
import { safeName, toggleClass, getClicks } from '../utils';
import type { RenderOptions } from './render-options';

export function halo(text: any, renderOptions: RenderOptions) {
  renderOptions.svg //
    .selectAll('.halo')
    .remove();

  text
    .select(function () {
      return this.parentNode.insertBefore(this.cloneNode(true), this);
    })
    .classed('halo', true);
}

export function legendClick(ev: MouseEvent, d: string, store: Store) {
  getClicks(ev, function (event: MouseEvent) {
    const clicks = event.detail;
    if (clicks === 3) {
      store.dispatch(actions.data.resetFilters());
    } else if (clicks === 2) {
      store.dispatch(actions.data.allExceptFilter(d));
    } else {
      store.dispatch(actions.data.toggleFilter(d));
    }
  });
}

export function highlightFn(d: Data, store: Store, renderOptions: RenderOptions) {
  if (store.getState().options.highlightBars) {
    toggleClass(renderOptions.root, 'rect.' + safeName(d.name), 'highlight');
  }
}

export function selectFn(d: Data, store: Store, renderOptions: RenderOptions) {
  if (store.getState().options.selectBars) {
    toggleClass(renderOptions.root, 'rect.' + safeName(d.name), 'selected');
    store.dispatch(actions.data.toggleSelection(d.name));
  }
}
