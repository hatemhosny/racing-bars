import { Button, ResizeOptions, RendererAction } from './renderer.models';

export const actionTypes = {
  buttonPress: 'renderer/buttonPress',
  click: 'renderer/click',
  keyPress: 'renderer/keyPress',
  resize: 'renderer/resize',
};

export const buttonPress = (button: Button): RendererAction => ({
  type: actionTypes.buttonPress,
  payload: button,
});

export const click = (): RendererAction => ({ type: actionTypes.click });

export const keyPress = (keyCode: string): RendererAction => ({
  type: actionTypes.keyPress,
  payload: keyCode,
});

export const resize = (options: ResizeOptions): RendererAction => ({
  type: actionTypes.resize,
  payload: options,
});
