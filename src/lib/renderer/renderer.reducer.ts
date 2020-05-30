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
    case actions.ticker.actionTypes.tickerSetFirst:
    case actions.ticker.actionTypes.tickerSetLast:
    case actions.ticker.actionTypes.tickerInc:
    case actions.ticker.actionTypes.tickerDec:
    case actions.ticker.actionTypes.updateTickerDate: {
      return { ...state };
    }

    case actionTypes.rendererButtonPress: {
      const button = action.payload as Button;

      switch (button) {
        case 'play':
      }

      const newButtonsState = { ...state.controls };
      newButtonsState[button] = !newButtonsState[button];

      return { ...state };
    }

    case actionTypes.rendererClick:

    case actionTypes.rendererKeyPress:

    default:
      return state;
  }
}
