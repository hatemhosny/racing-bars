import { createTicker } from '../ticker';
import { Ticker } from '../ticker.models';
import { Store, actions } from '../../store';

jest.mock('d3', () => ({
  interval: jest.fn().mockImplementation((fn: any, _: number) => {
    fn();
    fn();
  }),
}));

describe('ticker', () => {
  let ticker: Ticker;
  let store: Store;
  let mockDispatch = jest.fn();
  const mockStore = (opts: any = {}) =>
    (({
      getState: () => ({
        options: {
          tickDuration: opts.tickDuration ?? 50,
          loop: opts.loop ?? true,
        },
        ticker: {
          isLastDate: opts.isLastDate ?? false,
          isRunning: opts.isRunning ?? true,
        },
      }),
      dispatch: mockDispatch,
    } as unknown) as Store);

  beforeEach(() => {
    mockDispatch = jest.fn();
    store = mockStore();
    ticker = createTicker(store);
  });

  test('should have methods for control', () => {
    expect(ticker).toHaveProperty('start');
    expect(ticker).toHaveProperty('stop');
    expect(ticker).toHaveProperty('skipBack');
    expect(ticker).toHaveProperty('loop');
    expect(ticker).toHaveProperty('skipForward');
    expect(ticker).toHaveProperty('toggle');
    expect(ticker).toHaveProperty('goToDate');
  });

  // eslint-disable-next-line jest/no-test-callback
  test('start should set running to true and increment', (done) => {
    ticker.start();
    expect(mockDispatch).toHaveBeenCalledWith(actions.ticker.setRunning(true));
    expect(mockDispatch).toHaveBeenCalledWith(actions.ticker.inc());
    done();
  });

  // eslint-disable-next-line jest/no-test-callback
  test('starting on last date should rewind', (done) => {
    store = mockStore({ isLastDate: true });
    ticker = createTicker(store);
    ticker.start();
    expect(mockDispatch).toHaveBeenCalledWith(actions.ticker.setFirst());
    done();
  });

  // eslint-disable-next-line jest/no-test-callback
  test('reaching last date should loop if enabled', (done) => {
    store = mockStore({ isLastDate: true, loop: true });
    ticker = createTicker(store);
    ticker.start();
    expect(mockDispatch).toHaveBeenCalledWith(actions.ticker.setFirst());
    done();
  });

  // eslint-disable-next-line jest/no-test-callback
  test('reaching last date should stop if loop is disabled', (done) => {
    store = mockStore({ isLastDate: true, loop: false });
    ticker = createTicker(store);
    ticker.start();
    expect(mockDispatch).toHaveBeenCalledWith(actions.ticker.setRunning(false));
    done();
  });

  test('stop should set running to false', () => {
    ticker.stop();
    expect(mockDispatch).toHaveBeenCalledWith(actions.ticker.setRunning(false));
  });

  test('skipBack should stop and dispatch setFirst', () => {
    ticker.skipBack();
    expect(mockDispatch).toHaveBeenCalledWith(actions.ticker.setRunning(false));
    expect(mockDispatch).toHaveBeenCalledWith(actions.ticker.setFirst());
  });

  test('loop should dispatch setFirst', () => {
    ticker.loop();
    expect(mockDispatch).toHaveBeenCalledWith(actions.ticker.setFirst());
  });

  test('skipForward should stop and dispatch setLast', () => {
    ticker.skipForward();
    expect(mockDispatch).toHaveBeenCalledWith(actions.ticker.setRunning(false));
    expect(mockDispatch).toHaveBeenCalledWith(actions.ticker.setLast());
  });

  test('toggle should start if not running', () => {
    store = mockStore({ isRunning: false, isLastDate: false });
    ticker = createTicker(store);
    ticker.toggle();
    expect(mockDispatch).toHaveBeenCalledWith(actions.ticker.setRunning(true));
  });

  test('toggle should stop if running', () => {
    store = mockStore({ isRunning: true, isLastDate: false });
    ticker = createTicker(store);
    ticker.toggle();
    expect(mockDispatch).toHaveBeenCalledWith(actions.ticker.setRunning(false));
  });

  test('toggle should rewind if last date', () => {
    store = mockStore({ isRunning: false, isLastDate: true });
    ticker = createTicker(store);
    ticker.toggle();
    expect(mockDispatch).toHaveBeenCalledWith(actions.ticker.setFirst());
    expect(mockDispatch).toHaveBeenCalledWith(actions.ticker.setRunning(true));
  });

  test('goToDate should dispatch updateDate with the specified date', () => {
    ticker.goToDate('1980-01-01');
    expect(mockDispatch).toHaveBeenCalledWith(actions.ticker.updateDate('1980-01-01'));
  });
});
