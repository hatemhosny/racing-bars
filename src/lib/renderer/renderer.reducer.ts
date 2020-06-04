import { TickerAction } from '../ticker';
import { actions } from '../store';
import { RendererState, Button, RendererAction } from './renderer.models';
import { actionTypes } from './renderer.actions';

const initialState: RendererState = {
  controls: {
    controlsContainer: true,
    skipBack: true,
    play: true,
    pause: true,
    skipForward: true,
    overlayContainer: true,
    overlayPlay: true,
    overlayRepeat: true,
  },
  dimensions: {
    renderedHeight: 0,
    renderedWidth: 0,
    elementHeight: 0,
    elementWidth: 0,
    windowHeight: 0,
    windowWidth: 0,
  },
};

export function rendererReducer(
  state = initialState,
  action: RendererAction | TickerAction,
): RendererState {
  switch (action.type) {
    case actions.ticker.actionTypes.setFirst:
    case actions.ticker.actionTypes.setLast:
    case actions.ticker.actionTypes.inc:
    case actions.ticker.actionTypes.dec:
    case actions.ticker.actionTypes.updateDate: {
      return { ...state };
    }

    case actionTypes.buttonPress: {
      const button = action.payload as Button;

      switch (button) {
        case 'play':
      }

      const newButtonsState = { ...state.controls };
      newButtonsState[button] = !newButtonsState[button];

      return { ...state };
    }

    case actionTypes.click:

    case actionTypes.keyPress:

    default:
      return state;
  }
}
