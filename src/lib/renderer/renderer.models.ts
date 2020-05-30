import { Action } from '../store';

export interface RendererAction extends Action {
  payload?: Button | string | ResizeOptions;
}

export interface RendererState {
  controls: {
    controlsContainer: boolean;
    skipBack: boolean;
    play: boolean;
    pause: boolean;
    skipForward: boolean;
    overlayContainer: boolean;
    overlayPlay: boolean;
    overlayRepeat: boolean;
  };
  dimensions: {
    renderedHeight: number;
    renderedWidth: number;
    elementHeight: number;
    elementWidth: number;
    windowHeight: number;
    windowWidth: number;
  };
}

export type Button =
  | 'skipBack'
  | 'play'
  | 'pause'
  | 'skipForward'
  | 'overlayPlay'
  | 'overlayRepeat';

export interface ResizeOptions {
  windowHeight: number;
  windowsWidth: number;
  elementHeight: number;
  elementWidth: number;
}
