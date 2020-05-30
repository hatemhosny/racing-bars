import { Button, ResizeOptions, RendererAction } from './renderer.models';

export const actionTypes = {
  rendererButtonPress: 'renderer/buttonPress',
  rendererClick: 'renderer/click',
  rendererKeyPress: 'renderer/keyPress',
  rendererResize: 'renderer/rendererResize',
};

export const rendererButtonPress = (button: Button): RendererAction => ({
  type: actionTypes.rendererButtonPress,
  payload: button,
});

export const rendererClick = (): RendererAction => ({ type: actionTypes.rendererClick });

export const rendererKeyPress = (keyCode: string): RendererAction => ({
  type: actionTypes.rendererKeyPress,
  payload: keyCode,
});

export const rendererResize = (options: ResizeOptions): RendererAction => ({
  type: actionTypes.rendererResize,
  payload: options,
});
