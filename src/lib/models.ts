export interface Renderer {
  renderInitalView: () => void;
  renderFrame: () => void;
  resize: () => void;
}

export interface DOMCustomEvent {
  bubbles: boolean;
  detail: {
    date: string;
    isFirst: boolean;
    isLast: boolean;
    src: string;
  };
}
