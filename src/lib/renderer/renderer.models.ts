export interface Renderer {
  renderInitialView: () => void;
  renderFrame: () => void;
  resize: () => void;
}
