import type { Data } from '../data';
import { actions, type Store } from '../store';
import { safeName, toggleClass, getClicks } from '../utils';
import type { RenderOptions } from './render-options';

/**
 * Creates a halo effect around the specified text element.
 *
 * @param {any} text - The text element to apply the halo effect to.
 * @param {RenderOptions} renderOptions - The options for rendering.
 * @returns {void} - This function does not return a value; it modifies the DOM directly.
 */
export function halo(text: any, renderOptions: RenderOptions) {
  renderOptions.svg.selectAll('.halo').remove();

  text
    .select(function () {
      return this.parentNode.insertBefore(this.cloneNode(true), this);
    })
    .classed('halo', true);
}

/**
 * Handles click events on the legend, dispatching actions based on the number of clicks.
 *
 * @param {MouseEvent} ev - The mouse event triggered by the click.
 * @param {string} d - The data associated with the clicked legend item.
 * @param {Store} store - The store containing the current state and options.
 * @returns {void} - This function does not return a value; it modifies the store state.
 */
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

/**
 * Highlights the bars corresponding to the given data if highlighting is enabled.
 *
 * @param {Data['name']} name - The name of the data object representing the bar to highlight.
 * @param {Store} store - The store containing the current state and options.
 * @param {RenderOptions} renderOptions - The options for rendering.
 * @returns {void} - This function does not return a value; it modifies the DOM directly.
 */
export function highlightFn(name: Data['name'], store: Store, renderOptions: RenderOptions) {
  if (!store.getState().options.highlightBars) return;
  toggleClass(renderOptions.root, 'rect.' + safeName(name), 'highlight');
}

/**
 * Selects the bars corresponding to the given data if selection is enabled.
 *
 * @param {Data['name']} name - The name of the data object representing the bar to select.
 * @param {Store} store - The store containing the current state and options.
 * @param {RenderOptions} renderOptions - The options for rendering.
 * @returns {void} - This function does not return a value; it modifies the store state and DOM.
 */
export function selectFn(name: Data['name'], store: Store, renderOptions: RenderOptions) {
  if (!store.getState().options.selectBars) return;
  toggleClass(renderOptions.root, 'rect.' + safeName(name), 'selected');
  store.dispatch(actions.data.toggleSelection(name));
}
