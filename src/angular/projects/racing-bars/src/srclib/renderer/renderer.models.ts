export interface Renderer {
  renderInitalView: () => void;
  renderFrame: () => void;
  resize: () => void;
}
