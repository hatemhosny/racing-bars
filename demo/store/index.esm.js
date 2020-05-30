var actionTypes = {
  optionsLoaded: 'options/loaded',
  changeOptions: 'options/change',
  optionsChanged: 'options/changed'
};
var optionsLoaded = function optionsLoaded(options) {
  return {
    type: actionTypes.optionsLoaded,
    payload: options
  };
};
var changeOptions = function changeOptions(options) {
  return {
    type: actionTypes.changeOptions,
    payload: options
  };
};
var optionsChanged = function optionsChanged(options) {
  return {
    type: actionTypes.optionsChanged,
    payload: options
  };
};

var options = {
  __proto__: null,
  actionTypes: actionTypes,
  optionsLoaded: optionsLoaded,
  changeOptions: changeOptions,
  optionsChanged: optionsChanged
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function zeroPad(n, w) {
  while (n.toString().length < w) {
    n = '0' + n;
  }

  return n;
}
function getDateString(inputDate) {
  var date = new Date(inputDate);

  if (isNaN(+date)) {
    throw new Error("\"" + inputDate + "\" is not a valid date");
  }

  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = zeroPad(month, 2);
  var day = date.getDate().toString();
  day = zeroPad(day, 2);
  return "" + year + month + day;
}

var initialState = {
  selector: '#race',
  dataShape: 'long',
  fillDateGaps: false,
  fillDateGapsValue: 'last',
  startDate: '',
  endDate: '',
  colorSeed: '',
  disableGroupColors: false,
  tickDuration: 500,
  topN: 10,
  disableClickEvents: true,
  disableKeyboardEvents: false,
  autorun: true,
  loop: false,
  injectStyles: true,
  title: '18 years of Top Global Brands',
  subTitle: 'Brand value, $m',
  caption: 'Source: Interbrand',
  dateCounterFormat: 'YYYY',
  labelsOnBars: true,
  labelsWidth: 100,
  showControls: 'all',
  showOverlays: 'all',
  inputHeight: '',
  inputWidth: '',
  minHeight: 300,
  minWidth: 500
};
function optionsReducer(state, action) {
  if (state === void 0) {
    state = initialState;
  }

  switch (action.type) {
    case actionTypes.optionsLoaded:
      var startDate = action.payload.startDate ? getDateString(action.payload.startDate) : '';
      var endDate = action.payload.endDate ? getDateString(action.payload.endDate) : '';
      var inputHeight = action.payload.height;
      var inputWidth = action.payload.width;
      return _extends(_extends(_extends({}, state), action.payload), {}, {
        startDate: startDate,
        endDate: endDate,
        inputHeight: inputHeight,
        inputWidth: inputWidth
      });

    case actionTypes.changeOptions:
      return _extends(_extends({}, state), action.payload);

    default:
      return state;
  }
}

function rootReducer(state, action) {
  return {
    ticker: {},
    dates: {},
    controls: {},
    data: {},
    options: optionsReducer(state.options, action)
  };
}

function createStore(reducer, initialState) {
  if (reducer === void 0) {
    reducer = rootReducer;
  }

  var state;

  if (initialState) {
    state = initialState;
  }

  function dispatch(action) {
    state = reducer(state, action);
    notifySubscribers();
  }

  function getState() {
    return state;
  }

  var subscribers = [];

  function subscribe(fn) {
    subscribers.push(fn);
    var index = subscribers.length - 1;
    return {
      unsubscribe: function unsubscribe() {
        subscribers.splice(index, 1);
      }
    };
  }

  function notifySubscribers() {
    subscribers.forEach(function (fn) {
      fn();
    });
  }

  return {
    getState: getState,
    dispatch: dispatch,
    subscribe: subscribe
  };
}

var actions = {
  options: options
};

var store = createStore(rootReducer);
store.dispatch(actions.options.optionsLoaded({
  startDate: '1980-07-01',
  endDate: '2010-12-31'
}));
console.log(store.getState());
//# sourceMappingURL=index.esm.js.map
