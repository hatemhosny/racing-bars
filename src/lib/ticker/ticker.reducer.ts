import { TickerState, TickerAction } from './ticker.models';
import { actionTypes } from './ticker.actions';

const initialState: TickerState = {
  isRunning: false,
  currentDate: '',
  isFirstDate: true,
  isLastDate: false,
  dates: [],
};

export function tickerReducer(state = initialState, action: TickerAction): TickerState {
  switch (action.type) {
    case actionTypes.initialize: {
      const dates = action.payload as string[];
      return {
        ...state,
        isRunning: false,
        currentDate: dates[0],
        isFirstDate: true,
        isLastDate: false,
        dates,
      };
    }

    case actionTypes.updateDate: {
      const currentDate = action.payload as string;
      if (state.dates.indexOf(currentDate) === -1) {
        return { ...state };
      }
      return {
        ...state,
        currentDate,
        isFirstDate: currentDate === state.dates[0],
        isLastDate: currentDate === state.dates[state.dates.length - 1],
      };
    }

    case actionTypes.setRunning: {
      return {
        ...state,
        isRunning: action.payload as boolean,
      };
    }

    case actionTypes.setFirst: {
      return {
        ...state,
        currentDate: state.dates[0],
        isFirstDate: true,
        isLastDate: false,
      };
    }

    case actionTypes.setLast: {
      return {
        ...state,
        currentDate: state.dates[state.dates.length - 1],
        isFirstDate: false,
        isLastDate: true,
      };
    }

    case actionTypes.inc: {
      const currentIndex = state.dates.indexOf(state.currentDate);
      const lastIndex = state.dates.length - 1;
      const incValue = action.payload as number;
      const newDate =
        currentIndex + incValue > lastIndex
          ? state.dates[lastIndex]
          : state.dates[currentIndex + incValue];
      return {
        ...state,
        currentDate: newDate,
        isFirstDate: newDate === state.dates[0],
        isLastDate: newDate === state.dates[lastIndex],
      };
    }

    case actionTypes.dec: {
      const currentIndex = state.dates.indexOf(state.currentDate);
      const decValue = action.payload as number;
      const newDate =
        currentIndex - decValue < 0 ? state.dates[0] : state.dates[currentIndex - decValue];
      return {
        ...state,
        currentDate: newDate,
        isFirstDate: newDate === state.dates[0],
        isLastDate: newDate === state.dates[state.dates.length - 1],
      };
    }

    default:
      return state;
  }
}
