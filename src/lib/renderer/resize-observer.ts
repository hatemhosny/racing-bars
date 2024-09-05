export function createResizeObserver(resizeFn: () => void) {
  if (window.ResizeObserver && window.requestAnimationFrame) {
    return new ResizeObserver((entries) => {
      window.requestAnimationFrame((): void | undefined => {
        if (!entries?.length) return;
        resizeFn();
      });
    });
  }
  return {
    observe: () => {
      window.addEventListener('resize', resizeFn);
    },
    unobserve: () => {
      window.removeEventListener('resize', resizeFn);
    },
  };
}
