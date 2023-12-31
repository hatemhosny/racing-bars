import { /* actions, */ Store } from './store';

export function createScroller(store: Store) {
  const root = store.getState().container.element;
  if (!root) return;

  const dates = store.getState().ticker.dates;
  prepareDOM();

  const step = document.body.clientHeight / dates.length;

  subscribeToEvents();

  function prepareDOM() {
    root.style.position = 'fixed';
    root.style.top = '0';

    const scrollElement = document.createElement('div');
    scrollElement.style.height = window.innerHeight * 10 + 'px';
    document.body.appendChild(scrollElement);
  }

  function subscribeToEvents() {
    window.addEventListener('scroll', goToDate);
    // element.addEventListener("dateChanged", scrollToPosition);
  }

  // function scrollToPosition(e: CustomEvent) {
  //   let currentDate = getDateString(e.detail.date);
  //   let index = dates.indexOf(currentDate);
  //   ignoreNextScrollEvent = true;
  //   window.scroll({
  //     top: index * step,
  //     behavior: "smooth",
  //   });
  // }

  function goToDate() {
    const index = Math.ceil(window.pageYOffset / step);
    if (index < dates.length) {
      // store.dispatch(actions.ticker.updateDate(dates[index], 'scroll'));
    } else {
      // store.dispatch(actions.ticker.setLast('scroll'));
    }
  }
}
