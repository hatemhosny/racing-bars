(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3'], factory) :
  (global = global || self, factory(global.racingBars = {}, global.d3));
}(this, (function (exports, d3$1) {
  var options = {
    __proto__: null,
    get actionTypes () { return actionTypes; },
    get optionsLoaded () { return optionsLoaded; },
    get changeOptions () { return changeOptions; },
    get optionsChanged () { return optionsChanged; },
    get optionsReducer () { return optionsReducer; }
  };



  var d3 = {
    __proto__: null,
    axisTop: d3$1.axisTop,
    csv: d3$1.csv,
    easeLinear: d3$1.easeLinear,
    format: d3$1.format,
    hsl: d3$1.hsl,
    interpolateRound: d3$1.interpolateRound,
    interval: d3$1.interval,
    json: d3$1.json,
    max: d3$1.max,
    scaleLinear: d3$1.scaleLinear,
    select: d3$1.select,
    selectAll: d3$1.selectAll,
    tsv: d3$1.tsv,
    xml: d3$1.xml
  };

  function loadData(URL, type) {
    if (type === void 0) {
      type = 'json';
    }

    switch (type) {
      case 'json':
        return d3$1.json(URL);

      case 'csv':
        return d3$1.csv(URL);

      case 'tsv':
        return d3$1.tsv(URL);

      case 'xml':
        return d3$1.xml(URL);

      default:
        throw new Error("Unsupported data type: " + type);
    }
  }

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

  var actionTypes$1 = {
    initialize: 'ticker/initialize',
    updateDate: 'ticker/updateDate',
    setRunning: 'ticker/setRunning',
    setFirst: 'ticker/setFirst',
    setLast: 'ticker/setLast',
    inc: 'ticker/inc',
    dec: 'ticker/dec'
  };
  var initialize = function initialize(dates) {
    return {
      type: actionTypes$1.initialize,
      payload: dates
    };
  };
  var updateDate = function updateDate(currentDate) {
    return {
      type: actionTypes$1.updateDate,
      payload: currentDate
    };
  };
  var setRunning = function setRunning(running) {
    return {
      type: actionTypes$1.setRunning,
      payload: running
    };
  };
  var setFirst = function setFirst() {
    return {
      type: actionTypes$1.setFirst
    };
  };
  var setLast = function setLast() {
    return {
      type: actionTypes$1.setLast
    };
  };
  var inc = function inc(value) {
    if (value === void 0) {
      value = 1;
    }

    return {
      type: actionTypes$1.inc,
      payload: value
    };
  };
  var dec = function dec(value) {
    if (value === void 0) {
      value = 1;
    }

    return {
      type: actionTypes$1.dec,
      payload: value
    };
  };

  var initialState = {
    isRunning: false,
    currentDate: '',
    isFirstDate: true,
    isLastDate: false,
    dates: []
  };
  function tickerReducer(state, action) {
    if (state === void 0) {
      state = initialState;
    }

    switch (action.type) {
      case actionTypes$1.initialize:
        {
          var dates = action.payload;
          return _extends(_extends({}, state), {}, {
            isRunning: false,
            currentDate: dates[0],
            isFirstDate: true,
            isLastDate: false,
            dates: dates
          });
        }

      case actionTypes$1.updateDate:
        {
          var currentDate = action.payload;

          if (state.dates.indexOf(currentDate) === -1) {
            return _extends({}, state);
          }

          return _extends(_extends({}, state), {}, {
            currentDate: currentDate,
            isFirstDate: currentDate === state.dates[0],
            isLastDate: currentDate === state.dates[state.dates.length - 1]
          });
        }

      case actionTypes$1.setRunning:
        {
          return _extends(_extends({}, state), {}, {
            isRunning: action.payload
          });
        }

      case actionTypes$1.setFirst:
        {
          return _extends(_extends({}, state), {}, {
            currentDate: state.dates[0],
            isFirstDate: true,
            isLastDate: false
          });
        }

      case actionTypes$1.setLast:
        {
          return _extends(_extends({}, state), {}, {
            currentDate: state.dates[state.dates.length - 1],
            isFirstDate: false,
            isLastDate: true
          });
        }

      case actionTypes$1.inc:
        {
          var currentIndex = state.dates.indexOf(state.currentDate);
          var lastIndex = state.dates.length - 1;
          var incValue = action.payload;
          var newDate = currentIndex + incValue > lastIndex ? state.dates[lastIndex] : state.dates[currentIndex + incValue];
          return _extends(_extends({}, state), {}, {
            currentDate: newDate,
            isFirstDate: newDate === state.dates[0],
            isLastDate: newDate === state.dates[lastIndex]
          });
        }

      case actionTypes$1.dec:
        {
          var _currentIndex = state.dates.indexOf(state.currentDate);

          var decValue = action.payload;

          var _newDate = _currentIndex - decValue < 0 ? state.dates[0] : state.dates[_currentIndex - decValue];

          return _extends(_extends({}, state), {}, {
            currentDate: _newDate,
            isFirstDate: _newDate === state.dates[0],
            isLastDate: _newDate === state.dates[state.dates.length - 1]
          });
        }

      default:
        return state;
    }
  }

  function createTicker(dates) {
    store.dispatch(actions.ticker.initialize(dates));
    var ticker;

    function start() {
      ticker = d3$1.interval(showRace, store.getState().options.tickDuration);
      store.dispatch(actions.ticker.setRunning(true));

      function showRace(_) {
        if (store.getState().ticker.isLastDate) {
          if (store.getState().options.loop) {
            loop();
          } else {
            stop();
          }
        } else {
          store.dispatch(actions.ticker.inc());
        }
      }
    }

    function stop() {
      if (ticker) {
        ticker.stop();
      }

      store.dispatch(actions.ticker.setRunning(false));
    }

    function skipBack() {
      stop();
      store.dispatch(actions.ticker.setFirst());
    }

    function loop() {
      store.dispatch(actions.ticker.setFirst());
    }

    function skipForward() {
      stop();
      store.dispatch(actions.ticker.setLast());
    }

    function toggle() {
      if (store.getState().ticker.isLastDate) {
        skipBack();
        start();
      } else if (store.getState().ticker.isRunning) {
        stop();
      } else {
        if (!store.getState().ticker.isFirstDate) {
          store.dispatch(actions.ticker.inc());
        }

        start();
      }
    }

    function goToDate(date) {
      store.dispatch(actions.ticker.updateDate(date));
    }

    return {
      start: start,
      stop: stop,
      skipBack: skipBack,
      loop: loop,
      skipForward: skipForward,
      toggle: toggle,
      goToDate: goToDate
    };
  }



  var ticker = {
    __proto__: null,
    actionTypes: actionTypes$1,
    initialize: initialize,
    updateDate: updateDate,
    setRunning: setRunning,
    setFirst: setFirst,
    setLast: setLast,
    inc: inc,
    dec: dec,
    tickerReducer: tickerReducer,
    createTicker: createTicker
  };

  var actions = {
    options: options,
    ticker: ticker
  };

  function rootReducer(state, action) {
    return {
      options: optionsReducer(state.options, action),
      ticker: tickerReducer(state.ticker, action)
    };
  }

  function createStore(reducer, preloadedState) {
    if (reducer === void 0) {
      reducer = rootReducer;
    }

    var state = {};

    if (preloadedState) {
      state = preloadedState;
    }

    function dispatch(action) {
      state = reducer(state, action);
      notifySubscribers();
      return action;
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

  var store = createStore(rootReducer);

  function getColor(d, names, groups, showGroups, colorSeed, colorMap) {
    if (d.color) {
      return d.color;
    }

    var useGroup = Boolean(d.group) && showGroups && groups.length > 0;
    var values = useGroup ? groups : names;

    if (colorSeed) {
      values = shuffle(values, toNumber(colorSeed));
    }

    var currentValue = useGroup ? d.group : d.name;
    var index = values.indexOf(currentValue);

    if (colorMap) {
      if (Array.isArray(colorMap)) {
        while (index > colorMap.length - 1) {
          index = index - colorMap.length;
        }

        return colorMap[index];
      } else {
        if (colorMap[currentValue]) {
          return colorMap[currentValue];
        }
      }
    }

    var negativeIfOdd = index % 2 === 0 ? 1 : -1;
    var lumVariation = random(currentValue) / 10 * negativeIfOdd;
    var HueSpacing = 360 / (values.length + 1);
    var hue = (values.indexOf(currentValue) + 1) * HueSpacing;
    return d3$1.hsl(hue, 0.75, 0.75 + lumVariation);
  }
  function getIconID(d) {
    return 'icon-' + d.name.toLowerCase().split(' ').join('_');
  }
  function zeroPad(n, w) {
    while (n.toString().length < w) {
      n = '0' + n;
    }

    return n;
  }

  function toNumber(s) {
    s = String(s);
    var nums = '';

    for (var i = 0; i < s.length; i++) {
      nums += zeroPad(String(s.charCodeAt(i)), 3);
    }

    return +nums;
  }

  function random(InputSeed) {
    var seed = toNumber(InputSeed);
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }
  function randomString(prefix, n) {
    var rnd = Array(3).fill(null).map(function () {
      return Math.random().toString(36).substr(2);
    }).join('');
    return prefix + rnd.slice(-n);
  }
  function shuffle(arr, seed) {
    var array = [].concat(arr);
    var m = array.length;
    var t;
    var i;

    while (m) {
      i = Math.floor(random(seed) * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
      ++seed;
    }

    return array;
  }
  function generateId(prefix, n) {
    if (prefix === void 0) {
      prefix = 'racingbars';
    }

    if (n === void 0) {
      n = 8;
    }

    return randomString(prefix, n);
  }
  function getHeight(element, minHeight, height) {
    var newHeight;

    if (!height) {
      newHeight = element.getBoundingClientRect().height;
    } else if (String(height).startsWith('window')) {
      var scale = +height.split('*')[1] || 1;
      newHeight = window.innerHeight * scale;
    } else {
      newHeight = +height;
    }

    return newHeight > minHeight ? newHeight : minHeight;
  }
  function getWidth(element, minWidth, width) {
    var newWidth;

    if (!width) {
      newWidth = element.getBoundingClientRect().width;
    } else if (String(width).startsWith('window')) {
      var scale = +width.split('*')[1] || 1;
      newWidth = window.innerWidth * scale;
    } else {
      newWidth = +width;
    }

    return newWidth > minWidth ? newWidth : minWidth;
  }
  function getElement(className) {
    var element = document.querySelector(store.getState().options.selector);
    return element.querySelector('.' + className);
  }
  function showElement(className) {
    var selector = store.getState().options.selector;
    var element = document.querySelector(selector + ' .' + className);

    if (element) {
      element.style.display = 'flex';
    }
  }
  function hideElement(className) {
    var selector = store.getState().options.selector;
    var element = document.querySelector(selector + ' .' + className);

    if (element) {
      element.style.display = 'none';
    }
  }
  function addEventHandler(className, event, handler) {
    var element = getElement(className);

    if (element) {
      element.addEventListener(event, handler);
    }
  }
  function getText(param, dateSlice, isDate) {
    if (isDate === void 0) {
      isDate = false;
    }

    if (typeof param === 'function') {
      return param(formatDate(store.getState().ticker.currentDate), dateSlice.map(function (d) {
        return _extends(_extends({}, d), {}, {
          date: formatDate(d.date)
        });
      }), store.getState().ticker.dates.map(function (date) {
        return formatDate(date);
      }));
    }

    if (isDate) {
      return formatDate(store.getState().ticker.currentDate, param);
    }

    return param;
  }

  var getDates = function getDates(data) {
    return Array.from(new Set(data.map(function (d) {
      return d.date;
    }))).sort();
  };
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
  function formatDate(dateStr, format) {
    if (format === void 0) {
      format = 'YYYY-MM-DD';
    }

    var year = dateStr.slice(0, 4);
    var month = dateStr.slice(4, 6);
    var day = dateStr.slice(6, 8);
    var date = new Date(year + "-" + month + "-" + day);
    var weekDayIndex = String(date.getDay());
    var monthNames = {
      '01': 'Jan',
      '02': 'Feb',
      '03': 'Mar',
      '04': 'Apr',
      '05': 'May',
      '06': 'Jun',
      '07': 'Jul',
      '08': 'Aug',
      '09': 'Sep',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dec'
    };
    var weekDays = {
      '0': 'Sun',
      '1': 'Mon',
      '2': 'Tue',
      '3': 'Wed',
      '4': 'Thu',
      '5': 'Fri',
      '6': 'Sat'
    };
    return format.replace('MMM', monthNames[month]).replace('DDD', weekDays[weekDayIndex]).replace('YYYY', year).replace('MM', month).replace('DD', day);
  }

  var initialState$1 = {
    selector: '#race',
    dataShape: 'long',
    fillDateGaps: false,
    fillDateGapsValue: 'last',
    startDate: '',
    endDate: '',
    colorSeed: '',
    showGroups: true,
    tickDuration: 500,
    topN: 10,
    disableClickEvents: true,
    disableKeyboardEvents: false,
    autorun: true,
    loop: false,
    injectStyles: true,
    title: '',
    subTitle: '',
    caption: '',
    dateCounter: 'MM/YYYY',
    labelsOnBars: true,
    labelsWidth: 100,
    showIcons: false,
    showControls: 'all',
    showOverlays: 'none',
    inputHeight: '',
    inputWidth: '',
    minHeight: 300,
    minWidth: 500,
    height: '',
    width: '',
    theme: 'light',
    colorMap: {},
    fixedScale: false
  };
  function optionsReducer(state, action) {
    if (state === void 0) {
      state = initialState$1;
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



  function prepareData(rawData) {
    var options = store.getState().options;
    var data = rawData.map(function (d) {
      return _extends(_extends({}, d), {}, {
        date: getDateString(d.date)
      });
    }).filter(function (d) {
      return options.startDate ? d.date >= options.startDate : true;
    }).filter(function (d) {
      return options.endDate ? d.date <= options.endDate : true;
    });

    if (options.dataShape === 'wide') {
      data = wideDataToLong(data);
    }

    if (options.fillDateGaps) {
      data = fillGaps(data, options.fillDateGaps);
    }

    data = data.map(function (d) {
      var name = d.name ? d.name : '';
      var value = isNaN(+d.value) ? 0 : +d.value;
      return _extends(_extends({}, d), {}, {
        name: name,
        value: value
      });
    });
    data = calculateLastValues(data);
    return data;
  }

  function calculateLastValues(data) {
    return data.sort(function (a, b) {
      return a.name.localeCompare(b.name) || a.date.localeCompare(b.date);
    }).reduce(function (acc, curr) {
      if (acc.length === 0) {
        curr.lastValue = curr.value;
      } else {
        var last = acc[acc.length - 1];

        if (curr.name === last.name) {
          curr.lastValue = last.value;
        } else {
          curr.lastValue = curr.value;
        }
      }

      return [].concat(acc, [curr]);
    }, []).sort(function (a, b) {
      return a.date.localeCompare(b.date);
    });
  }

  function wideDataToLong(wide) {
    var _long = [];
    wide.forEach(function (item) {
      for (var _i = 0, _Object$entries = Object.entries(item); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _Object$entries[_i],
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        _long.push({
          date: item.date,
          name: key,
          value: Number(value)
        });
      }
    });
    return _long;
  }

  function fillGaps(data, period) {
    if (!period) {
      return data;
    }

    var dates = getDates(data);
    var minDate = new Date(formatDate(dates[0]));
    var maxDate = new Date(formatDate(dates[dates.length - 1]));
    var next = {
      years: function years(dt) {
        dt.setFullYear(dt.getFullYear() + 1);
      },
      months: function months(dt) {
        dt.setMonth(dt.getMonth() + 1);
      },
      days: function days(dt) {
        dt.setDate(dt.getDate() + 1);
      }
    };

    if (!next[period]) {
      return data;
    }

    var dateRange = [];

    for (var date = minDate; date < maxDate; next[period](date)) {
      dateRange.push(getDateString(date));
    }

    dateRange.forEach(function (date, index) {
      if (data.filter(function (d) {
        return d.date === date;
      }).length > 0) {
        return;
      }

      var missing = data.filter(function (d) {
        return d.date === dateRange[index - 1];
      }).map(function (d) {
        return _extends(_extends({}, d), {}, {
          date: date
        });
      });
      data.push.apply(data, missing);
    });
    return data;
  }

  function getDateSlice(data, date) {
    return data.filter(function (d) {
      return d.date === date && !isNaN(d.value);
    }).sort(function (a, b) {
      return b.value - a.value;
    }).map(function (d, i) {
      return _extends(_extends({}, d), {}, {
        rank: i
      });
    });
  }

  var icons = {
    skipBack: "<svg viewBox=\"0 0 32 32\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" stroke=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M28.46,4a3,3,0,0,0-3,.07l-15.2,9.41A3,3,0,0,0,9,15V5A3,3,0,0,0,6,2H5A3,3,0,0,0,2,5V27a3,3,0,0,0,3,3H6a3,3,0,0,0,3-3V17a3,3,0,0,0,1.22,1.53L25.42,28a3,3,0,0,0,1.58.46,3,3,0,0,0,3-3V6.59A3,3,0,0,0,28.46,4Z\"/></g></svg>",
    play: "<svg viewBox=\"0 0 32 32\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" stroke=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M26.78,13.45,11.58,4A3,3,0,0,0,7,6.59V25.41a3,3,0,0,0,3,3A3,3,0,0,0,11.58,28l15.2-9.41a3,3,0,0,0,0-5.1Z\"/></g></svg>",
    pause: "<svg viewBox=\"0 0 32 32\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" stroke=\"currentColor\" xmlns:svg=\"http://www.w3.org/2000/svg\"><g transform=\"translate(-17)\"><path d=\"m 27,2 h -1 c -1.656854,0 -3,1.3431458 -3,3 v 12 c -0.04755,3.269656 0,6.666667 0,10 0,1.656854 1.343146,3 3,3 h 1 c 1.656854,0 3,-1.343146 3,-3 V 5 C 30,3.3431458 28.656854,2 27,2 Z\" /></g><g transform=\"translate(-4)\"><path d=\"m 27,2 h -1 c -1.656854,0 -3,1.3431458 -3,3 v 12 c -0.04755,3.269656 0,6.666667 0,10 0,1.656854 1.343146,3 3,3 h 1 c 1.656854,0 3,-1.343146 3,-3 V 5 C 30,3.3431458 28.656854,2 27,2 Z\" /></g></svg>",
    skipForward: "<svg viewBox=\"0 0 32 32\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" stroke=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M27,2H26a3,3,0,0,0-3,3V15a3,3,0,0,0-1.22-1.53L6.58,4A3,3,0,0,0,2,6.59V25.41a3,3,0,0,0,3,3A3,3,0,0,0,6.58,28l15.2-9.41A3,3,0,0,0,23,17V27a3,3,0,0,0,3,3h1a3,3,0,0,0,3-3V5A3,3,0,0,0,27,2Z\"/></g></svg>",
    overlayPlay: "<svg viewBox=\"0 0 32 32\" fill=\"currentColor\" stroke=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M26.78,13.45,11.58,4A3,3,0,0,0,7,6.59V25.41a3,3,0,0,0,3,3A3,3,0,0,0,11.58,28l15.2-9.41a3,3,0,0,0,0-5.1Z\"/></g></svg>",
    overlayRepeat: "<svg viewBox=\"0 0 32 32\" fill=\"currentColor\" stroke=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M18,4A12,12,0,0,0,6.05,15H3a1,1,0,0,0-.88.53,1,1,0,0,0,0,1l4,6a1,1,0,0,0,1.66,0l4-6a1,1,0,0,0,.05-1A1,1,0,0,0,11,15H8.05A10,10,0,1,1,18,26a1,1,0,0,0,0,2A12,12,0,0,0,18,4Z\"/></g></svg>"
  };

  var elements = {
    controls: 'controls',
    skipBack: 'skipBack',
    play: 'play',
    pause: 'pause',
    skipForward: 'skipForward',
    overlay: 'overlay',
    overlayPlay: 'overlayPlay',
    overlayRepeat: 'overlayRepeat'
  };

  function createRenderer(data) {
    var margin;
    var svg;
    var x;
    var y;
    var xAxis;
    var titlePadding = 5;
    var barPadding;
    var labelPadding;
    var barWidth;
    var barHeight;
    var barHalfHeight;
    var defs;
    var iconSize;
    var iconSpace;
    var titleText;
    var subTitleText;
    var captionText;
    var dateCounterText;
    var labelX;
    var barY;
    var height;
    var width;
    var maxValue;
    var names = Array.from(new Set(data.map(function (d) {
      return d.name;
    }))).sort();
    var groups = Array.from(new Set(data.map(function (d) {
      return d.group;
    }))).filter(Boolean).sort();
    var showGroups = store.getState().options.showGroups;

    function renderInitalView() {
      var _store$getState$optio = store.getState().options,
          selector = _store$getState$optio.selector,
          title = _store$getState$optio.title,
          subTitle = _store$getState$optio.subTitle,
          caption = _store$getState$optio.caption,
          dateCounter = _store$getState$optio.dateCounter,
          labelsOnBars = _store$getState$optio.labelsOnBars,
          showIcons = _store$getState$optio.showIcons,
          labelsWidth = _store$getState$optio.labelsWidth,
          inputHeight = _store$getState$optio.inputHeight,
          inputWidth = _store$getState$optio.inputWidth,
          minHeight = _store$getState$optio.minHeight,
          minWidth = _store$getState$optio.minWidth,
          topN = _store$getState$optio.topN,
          colorSeed = _store$getState$optio.colorSeed,
          colorMap = _store$getState$optio.colorMap,
          fixedScale = _store$getState$optio.fixedScale;
      var TotalDateSlice = getDateSlice(data, store.getState().ticker.currentDate);
      var dateSlice = TotalDateSlice.slice(0, store.getState().options.topN);
      var element = document.querySelector(selector);
      element.innerHTML = '';
      height = getHeight(element, minHeight, inputHeight);
      width = getWidth(element, minWidth, inputWidth);
      renderInitialFrame();
      renderControls();
      renderOverlays();
      updateControls();

      function renderInitialFrame() {
        var labelsArea = labelsOnBars ? 0 : labelsWidth;
        var groupsArea = showGroups ? 40 : 0;
        margin = {
          top: 80 + groupsArea,
          right: 0,
          bottom: 5,
          left: 0 + labelsArea
        };
        svg = d3$1.select(selector).append('svg').attr('width', width).attr('height', height);
        titleText = svg.append('text').attr('class', 'title').attr('x', titlePadding).attr('y', 24).html(getText(title, TotalDateSlice));
        subTitleText = svg.append('text').attr('class', 'subTitle').attr('x', titlePadding).attr('y', 55).html(getText(subTitle, TotalDateSlice));

        if (showGroups) {
          var legendsWrapper = svg.append('g');
          var legends = legendsWrapper.selectAll('.legend-wrapper').data(groups).enter().append('g').attr('class', 'legend-wrapper').style('cursor', 'pointer');
          legends.append('rect').attr('class', 'legend-color').attr('width', 10).attr('height', 10).attr('y', 75).style('fill', function (d) {
            return getColor({
              group: d
            }, names, groups, showGroups, colorSeed, colorMap);
          });
          legends.append('text').attr('class', 'legend-text').attr('x', 20).attr('y', 75 + 10).html(function (d) {
            return d;
          });
          var legendX = margin.left;
          var legendY = 0;
          legends.each(function () {
            var wrapper = d3$1.select(this);
            var text = wrapper.select('text');
            var bbox = text.node().getBBox();

            if (legendX + bbox.width > width) {
              legendX = margin.left;
              legendY += 30;
            }

            wrapper.attr('transform', 'translate(' + legendX + ', ' + legendY + ')');
            legendX += bbox.width + 40;
          });
          margin.top += legendY;
        }

        maxValue = fixedScale ? data.map(function (d) {
          return d.value;
        }).reduce(function (max, val) {
          return max > val ? max : val;
        }, 0) : d3$1.max(dateSlice, function (d) {
          return d.value;
        });
        x = d3$1.scaleLinear().domain([0, maxValue]).range([margin.left, width - margin.right - 65]);
        y = d3$1.scaleLinear().domain([topN, 0]).range([height - margin.bottom, margin.top]);
        barPadding = (height - (margin.bottom + margin.top)) / (topN * 5);
        labelPadding = 8;

        barWidth = function barWidth(d) {
          return Math.abs(x(d.value) - x(0) - 1);
        };

        barHeight = y(1) - y(0) - barPadding;
        barHalfHeight = (y(1) - y(0)) / 2 + 1;

        barY = function barY(d) {
          return y(d.rank) + 5;
        };

        iconSize = showIcons ? barHeight * 0.9 : 0;
        iconSpace = showIcons ? iconSize + labelPadding : 0;
        labelX = labelsOnBars ? function (d) {
          return x(d.value) - labelPadding - iconSpace;
        } : margin.left - labelPadding;
        xAxis = d3$1.axisTop(x).ticks(width > 500 ? 5 : 2).tickSize(-(height - (margin.top + margin.bottom))).tickFormat(function (n) {
          return d3$1.format(',')(n);
        });
        svg.append('g').attr('class', 'axis xAxis').attr('transform', "translate(0, " + margin.top + ")").call(xAxis).selectAll('.tick line').classed('origin', function (d) {
          return d === 0;
        });
        svg.selectAll('rect.bar').data(dateSlice, function (d) {
          return d.name;
        }).enter().append('rect').attr('class', 'bar').attr('x', x(0) + 1).attr('width', barWidth).attr('y', barY).attr('height', barHeight).style('fill', function (d) {
          return getColor(d, names, groups, showGroups, colorSeed, colorMap);
        });
        svg.selectAll('text.label').data(dateSlice, function (d) {
          return d.name;
        }).enter().append('text').attr('class', 'label').attr('x', labelX).attr('y', function (d) {
          return barY(d) + barHalfHeight;
        }).style('text-anchor', 'end').html(function (d) {
          return d.name;
        });
        svg.selectAll('text.valueLabel').data(dateSlice, function (d) {
          return d.name;
        }).enter().append('text').attr('class', 'valueLabel').attr('x', function (d) {
          return x(d.value) + 5;
        }).attr('y', function (d) {
          return barY(d) + barHalfHeight;
        }).text(function (d) {
          return d3$1.format(',.0f')(d.lastValue);
        });

        if (showIcons) {
          defs = svg.append('svg:defs');
          defs.selectAll('svg').data(dateSlice, function (d) {
            return d.name;
          }).enter().append('svg:pattern').attr('class', 'svgpattern').attr('id', getIconID).attr('width', iconSize).attr('height', iconSize).append('svg:image').attr('xlink:href', function (d) {
            return d.icon;
          }).attr('width', iconSize).attr('height', iconSize).attr('x', 0).attr('y', 0);
          svg.selectAll('circle').data(dateSlice, function (d) {
            return d.name;
          }).enter().append('circle').attr('cx', function (d) {
            return x(d.value) - iconSize / 2 - labelPadding;
          }).attr('cy', function (d) {
            return y(d.rank) + barHalfHeight;
          }).attr('r', iconSize / 2).style('fill', 'transparent').style('fill', function (d) {
            return "url(#" + getIconID(d) + ")";
          });
        }

        dateCounterText = svg.append('text').attr('class', 'dateCounterText').attr('x', width - margin.right - barPadding).attr('y', height - 40).style('text-anchor', 'end').html(getText(dateCounter, TotalDateSlice, true)).call(halo);
        captionText = svg.append('text').attr('class', 'caption').attr('x', width - margin.right - barPadding - 10).attr('y', height - margin.bottom - barPadding).style('text-anchor', 'end').html(getText(caption, TotalDateSlice));
      }

      function renderControls() {
        var controlIcons = [{
          skipBack: icons.skipBack
        }, {
          play: icons.play
        }, {
          pause: icons.pause
        }, {
          skipForward: icons.skipForward
        }];
        var elementWidth = element.getBoundingClientRect().width;
        d3$1.select(selector).append('div').classed('controls', true).style('width', width).style('right', elementWidth - width + margin.right + barPadding + 'px').selectAll('div').data(controlIcons).enter().append('div').html(function (d) {
          return Object.values(d)[0];
        }).attr('class', function (d) {
          return Object.keys(d)[0];
        });

        if (store.getState().options.showControls === 'play') {
          hideElement(elements.skipBack);
          hideElement(elements.skipForward);
        }

        if (store.getState().options.showControls === 'none') {
          hideElement(elements.controls);
        }
      }

      function renderOverlays() {
        var overlayIcons = [{
          overlayPlay: icons.overlayPlay
        }, {
          overlayRepeat: icons.overlayRepeat
        }];
        d3$1.select(selector).append('div').classed('overlay', true).style('minHeight', minHeight + 'px').style('minWidth', minWidth + 'px').selectAll('div').data(overlayIcons).enter().append('div').html(function (d) {
          return Object.values(d)[0];
        }).attr('class', function (d) {
          return Object.keys(d)[0];
        });
      }
    }

    function renderFrame() {
      if (!x) {
        return;
      }

      var _store$getState$optio2 = store.getState().options,
          tickDuration = _store$getState$optio2.tickDuration,
          topN = _store$getState$optio2.topN,
          title = _store$getState$optio2.title,
          subTitle = _store$getState$optio2.subTitle,
          caption = _store$getState$optio2.caption,
          dateCounter = _store$getState$optio2.dateCounter,
          showGroups = _store$getState$optio2.showGroups,
          colorSeed = _store$getState$optio2.colorSeed,
          colorMap = _store$getState$optio2.colorMap,
          fixedScale = _store$getState$optio2.fixedScale;
      var TotalDateSlice = getDateSlice(data, store.getState().ticker.currentDate);
      var dateSlice = TotalDateSlice.slice(0, store.getState().options.topN);

      if (!fixedScale) {
        x.domain([0, d3$1.max(dateSlice, function (d) {
          return d.value;
        })]);
        svg.select('.xAxis').transition().duration(tickDuration).ease(d3$1.easeLinear).call(xAxis);
      }

      var bars = svg.selectAll('.bar').data(dateSlice, function (d) {
        return d.name;
      });
      bars.enter().append('rect').attr('class', function (d) {
        return "bar " + d.name.replace(/\s/g, '_');
      }).attr('x', x(0) + 1).attr('width', barWidth).attr('y', function () {
        return y(topN + 1) + 5;
      }).attr('height', barHeight).style('fill', function (d) {
        return getColor(d, names, groups, showGroups, colorSeed, colorMap);
      }).transition().duration(tickDuration).ease(d3$1.easeLinear).attr('y', barY);
      bars.transition().duration(tickDuration).ease(d3$1.easeLinear).attr('width', function (d) {
        return Math.abs(x(d.value) - x(0) - 1);
      }).attr('y', barY);
      bars.exit().transition().duration(tickDuration).ease(d3$1.easeLinear).attr('width', function (d) {
        return Math.abs(x(d.value) - x(0) - 1);
      }).attr('y', function () {
        return y(topN + 1) + 5;
      }).remove();
      var labels = svg.selectAll('.label').data(dateSlice, function (d) {
        return d.name;
      });
      labels.enter().append('text').attr('class', 'label').attr('x', labelX).attr('y', function () {
        return y(topN + 1) + 5 + barHalfHeight;
      }).style('text-anchor', 'end').html(function (d) {
        return d.name;
      }).transition().duration(tickDuration).ease(d3$1.easeLinear).attr('y', function (d) {
        return barY(d) + barHalfHeight;
      });
      labels.transition().duration(tickDuration).ease(d3$1.easeLinear).attr('x', labelX).attr('y', function (d) {
        return barY(d) + barHalfHeight;
      });
      labels.exit().transition().duration(tickDuration).ease(d3$1.easeLinear).attr('x', labelX).attr('y', function () {
        return y(topN + 1) + 5;
      }).remove();
      var valueLabels = svg.selectAll('.valueLabel').data(dateSlice, function (d) {
        return d.name;
      });
      valueLabels.enter().append('text').attr('class', 'valueLabel').attr('x', function (d) {
        return x(d.value) + 5;
      }).attr('y', function () {
        return y(topN + 1) + 5;
      }).text(function (d) {
        return d3$1.format(',.0f')(d.lastValue);
      }).transition().duration(tickDuration).ease(d3$1.easeLinear).attr('y', function (d) {
        return barY(d) + barHalfHeight;
      });
      valueLabels.transition().duration(tickDuration).ease(d3$1.easeLinear).attr('x', function (d) {
        return x(d.value) + 5;
      }).attr('y', function (d) {
        return barY(d) + barHalfHeight;
      }).tween('text', function (d) {
        var i = d3$1.interpolateRound(d.lastValue, d.value);
        return function (t) {
          this.textContent = d3$1.format(',')(i(t));
        };
      });
      valueLabels.exit().transition().duration(tickDuration).ease(d3$1.easeLinear).attr('x', function (d) {
        return x(d.value) + 5;
      }).attr('y', function () {
        return y(topN + 1) + 5;
      }).remove();

      if (store.getState().options.showIcons) {
        var iconPatterns = defs.selectAll('.svgpattern').data(dateSlice, function (d) {
          return d.name;
        });
        iconPatterns.enter().append('svg:pattern').attr('class', 'svgpattern').attr('id', getIconID).attr('width', iconSize).attr('height', iconSize).append('svg:image').attr('xlink:href', function (d) {
          return d.icon;
        }).attr('width', iconSize).attr('height', iconSize).style('z-index', '99').attr('x', 0).attr('y', 0);
        iconPatterns.exit().remove();

        var _icons = svg.selectAll('circle').data(dateSlice, function (d) {
          return d.name;
        });

        _icons.enter().append('circle').attr('cx', function (d) {
          return x(d.value) - iconSize / 2 - labelPadding;
        }).attr('cy', function () {
          return y(topN + 1) + iconSize + barHalfHeight;
        }).attr('r', iconSize / 2).style('z-index', '99').style('fill', 'transparent').style('fill', function (d) {
          return "url(#" + getIconID(d) + ")";
        }).transition().duration(tickDuration).ease(d3$1.easeLinear).attr('cy', function (d) {
          return y(d.rank) + barHalfHeight;
        });

        _icons.transition().duration(tickDuration).ease(d3$1.easeLinear).attr('cx', function (d) {
          return x(d.value) - iconSize / 2 - labelPadding;
        }).attr('cy', function (d) {
          return y(d.rank) + barHalfHeight;
        });

        _icons.exit().transition().duration(tickDuration).ease(d3$1.easeLinear).attr('cx', function (d) {
          return x(d.value) - iconSize / 2 - labelPadding;
        }).attr('cy', function () {
          return y(topN + 1) + iconSize + barHalfHeight;
        }).remove();
      }

      titleText.html(getText(title, TotalDateSlice));
      subTitleText.html(getText(subTitle, TotalDateSlice));
      captionText.html(getText(caption, TotalDateSlice));
      dateCounterText.html(getText(dateCounter, TotalDateSlice, true)).call(halo);
      updateControls();
    }

    function resize() {
      if (!store.getState().options.inputHeight && !store.getState().options.inputWidth || String(store.getState().options.inputHeight).startsWith('window') || String(store.getState().options.inputWidth).startsWith('window')) {
        var element = document.querySelector(store.getState().options.selector);
        height = getHeight(element, store.getState().options.minHeight, store.getState().options.inputHeight);
        width = getWidth(element, store.getState().options.minWidth, store.getState().options.inputWidth);
        var currentPosition = element.style.position;
        renderInitalView();
        renderFrame();
        updateControls();
        element.style.position = currentPosition;
      }
    }

    function updateControls() {
      var showOverlays = store.getState().options.showOverlays;

      if (store.getState().ticker.isRunning) {
        showElement(elements.pause);
        hideElement(elements.play);
      } else {
        showElement(elements.play);
        hideElement(elements.pause);
      }

      if (store.getState().ticker.isFirstDate && (showOverlays === 'all' || showOverlays === 'play') && !store.getState().ticker.isRunning) {
        getElement(elements.controls).style.visibility = 'hidden';
        showElement(elements.overlay);
        showElement(elements.overlayPlay);
        hideElement(elements.overlayRepeat);
      } else if (store.getState().ticker.isLastDate && (showOverlays === 'all' || showOverlays === 'repeat') && !(store.getState().options.loop && store.getState().ticker.isRunning)) {
        getElement(elements.controls).style.visibility = 'hidden';
        showElement(elements.overlay);
        showElement(elements.overlayRepeat);
        hideElement(elements.overlayPlay);
      } else {
        getElement(elements.controls).style.visibility = 'unset';
        getElement(elements.overlay).style.display = 'none';
      }
    }

    function halo(text) {
      svg.selectAll('.halo').remove();
      text.select(function () {
        return this.parentNode.insertBefore(this.cloneNode(true), this);
      }).classed('halo', true);
    }

    return {
      renderInitalView: renderInitalView,
      renderFrame: renderFrame,
      resize: resize
    };
  }

  var styles = "\n__selector__ text {\n  font-size: 16px;\n  font-family: Open Sans, sans-serif;\n}\n\n__selector__ text.title {\n  font-size: 24px;\n  font-weight: 500;\n}\n\n__selector__ text.subTitle {\n  font-weight: 500;\n}\n\n__selector__ text.caption {\n  font-weight: 400;\n  font-size: 24px;\n}\n\n__selector__ text.label {\n  font-weight: 600;\n}\n\n__selector__ text.valueLabel {\n  font-weight: 300;\n}\n\n__selector__ text.dateCounterText {\n  font-size: 64px;\n  font-weight: 700;\n}\n\n__selector__ .xAxis .tick:nth-child(2) text {\n  text-anchor: start;\n}\n\n__selector__ .tick line {\n  shape-rendering: CrispEdges;\n}\n\n__selector__ path.domain {\n  display: none;\n}\n\n__selector__ {\n  position: relative;\n}\n\n__selector__ .controls {\n  /*  width and right are set dynamically in renderer.ts */\n  position: absolute;\n  top: 0;\n  display: flex;\n}\n\n__selector__ .controls div,\n__selector__ .overlay div {\n  cursor: pointer;\n  font-size: 24px;\n  font-weight: 700;\n  width: 38px;\n  height: 38px;\n  -moz-border-radius: 5px;\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n  margin: 5px;\n  text-align: center;\n}\n\n__selector__ .controls svg {\n  margin: 5px auto;\n  width: 28px;\n  height: 28px;\n}\n\n__selector__ .overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n__selector__ .overlay div {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 200px;\n  height: 200px;\n  -moz-border-radius: 100px;\n  -webkit-border-radius: 100px;\n  border-radius: 100px;\n}\n__selector__ .overlay svg {\n  height: 50%;\n  width: 50%;\n}\n";
  var themes = {
    "dark": "\n__selector__ {\n  background-color: #313639;\n}\n\n__selector__ text.title {\n  fill: #fafafa;\n}\n\n__selector__ text.subTitle {\n  fill: #cccccc;\n}\n\n__selector__ text.dateCounterText {\n  fill: #cccccc;\n  opacity: 1;\n}\n\n__selector__ text.caption {\n  fill: #cccccc;\n}\n\n__selector__ .halo {\n  fill: #313639;\n  stroke: #313639;\n  stroke-width: 10;\n  stroke-linejoin: round;\n  opacity: 1;\n}\n\n__selector__ text.label {\n  fill: #313639;\n}\n\n__selector__ text.valueLabel {\n  fill: #fafafa;\n}\n\n__selector__ .tick text {\n  fill: #cccccc;\n}\n\n__selector__ .tick line {\n  shape-rendering: CrispEdges;\n  stroke: #dddddd;\n}\n\n__selector__ .tick line.origin {\n  stroke: #aaaaaa;\n}\n\n__selector__ .controls div,\n__selector__ .overlay div {\n  color: #ffffff;\n  background: #777777;\n  border: 1px solid black;\n  opacity: 0.5;\n}\n\n__selector__ .controls div:hover,\n__selector__ .overlay div:hover {\n  background: #aaaaaa;\n  color: black;\n}\n\n__selector__ .overlay {\n  background-color: black;\n  opacity: 0.7;\n}\n",
    "light": "\n/* __selector__ {\n  background-color: #ffffff;\n}\n\n__selector__ text.title {\n  fill: #fafafa;\n} */\n\n__selector__ text.subTitle {\n  fill: #777777;\n}\n\n__selector__ text.dateCounterText {\n  fill: #bbbbbb;\n  opacity: 1;\n}\n\n__selector__ text.caption {\n  fill: #777777;\n}\n\n__selector__ .halo {\n  fill: #ffffff;\n  stroke: #ffffff;\n  stroke-width: 10;\n  stroke-linejoin: round;\n  opacity: 1;\n}\n\n__selector__ text.label {\n  fill: #000000;\n}\n\n__selector__ text.valueLabel {\n  fill: #000000;\n}\n\n__selector__ .tick text {\n  fill: #777777;\n}\n\n__selector__ .tick line {\n  shape-rendering: CrispEdges;\n  stroke: #dddddd;\n}\n\n__selector__ .tick line.origin {\n  stroke: #aaaaaa;\n}\n\n__selector__ .controls div,\n__selector__ .overlay div {\n  color: #ffffff;\n  background: #777777;\n  border: 1px solid black;\n  opacity: 0.5;\n}\n\n__selector__ .controls div:hover,\n__selector__ .overlay div:hover {\n  background: #aaaaaa;\n  color: black;\n}\n\n__selector__ .overlay {\n  background-color: black;\n  opacity: 0.7;\n}\n"
  };

  function styleInject(selector, insertAt) {
    if (insertAt === void 0) {
      insertAt = 'top';
    }

    var css = styles + themes[store.getState().options.theme];

    if (!css || typeof document === 'undefined') {
      return;
    }

    css = css.split('__selector__').join(selector);
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  function registerEvents(element, ticker) {
    registerControlButtonEvents();
    registerOverlayEvents();
    registerClickEvents();
    registerKeyboardEvents();

    function registerControlButtonEvents() {
      addEventHandler(elements.skipBack, 'click', ticker.skipBack);
      addEventHandler(elements.play, 'click', ticker.toggle);
      addEventHandler(elements.pause, 'click', ticker.toggle);
      addEventHandler(elements.skipForward, 'click', ticker.skipForward);
    }

    function registerOverlayEvents() {
      addEventHandler(elements.overlayPlay, 'click', function () {
        hideElement(elements.overlay);
        ticker.start();
      });
      addEventHandler(elements.overlayRepeat, 'click', function () {
        hideElement(elements.overlay);
        ticker.loop();
        ticker.start();
      });
    }

    function registerClickEvents() {
      if (!store.getState().options.disableClickEvents) {
        var svg = element.querySelector('svg');
        svg.addEventListener('click', ticker.toggle);
        element.addEventListener('dblclick', ticker.skipForward);
      }
    }

    function registerKeyboardEvents() {
      if (!store.getState().options.disableKeyboardEvents) {
        document.addEventListener('keypress', function (e) {
          var keyCodes = {
            spacebar: 32,
            a: 97,
            d: 100,
            s: 115
          };

          switch (e.keyCode) {
            case keyCodes.spacebar:
              ticker.toggle();
              break;

            case keyCodes.a:
              ticker.skipBack();
              break;

            case keyCodes.s:
              ticker.toggle();
              break;

            case keyCodes.d:
              ticker.skipForward();
              break;
          }
        });
      }
    }
  }

  function dispatchDOMEvent(element, currentDate) {
    element.dispatchEvent(new CustomEvent('racingBars/dateChanged', {
      bubbles: true,
      detail: {
        date: formatDate(currentDate),
        isFirst: store.getState().ticker.isFirstDate,
        isLast: store.getState().ticker.isLastDate
      }
    }));
  }

  function DOMEventSubscriber(element) {
    var lastDate = '';
    return function () {
      var currentDate = store.getState().ticker.currentDate;

      if (currentDate !== lastDate) {
        dispatchDOMEvent(element, currentDate);
        lastDate = currentDate;
      }
    };
  }

  function createScroller(element) {
    var dates = store.getState().ticker.dates;
    prepareDOM();
    var step = document.body.clientHeight / dates.length;
    subscribeToEvents();

    function prepareDOM() {
      element.style.position = 'fixed';
      element.style.top = '0';
      var scrollElement = document.createElement('div');
      scrollElement.style.height = window.innerHeight * 10 + 'px';
      document.body.appendChild(scrollElement);
    }

    function subscribeToEvents() {
      window.addEventListener('scroll', goToDate);
    }

    function goToDate() {
      var index = Math.ceil(window.pageYOffset / step);

      if (index < dates.length) {
        store.dispatch(actions.ticker.updateDate(dates[index]));
      } else {
        store.dispatch(actions.ticker.setLast());
      }
    }
  }

  function race(data, options) {
    store.dispatch(actions.options.optionsLoaded(options));
    var element = document.querySelector(store.getState().options.selector);

    if (!element) {
      throw new Error('Cannot find element with this selector: ' + store.getState().options.selector);
    }

    if (store.getState().options.injectStyles) {
      styleInject(store.getState().options.selector, 'top');
    }

    var preparedData = prepareData(data);
    var dates = getDates(preparedData);
    var ticker = createTicker(dates);
    var renderer = createRenderer(preparedData);
    renderer.renderInitalView();
    store.subscribe(renderer.renderFrame);
    store.subscribe(DOMEventSubscriber(element));
    ticker.start();

    if (!store.getState().options.autorun) {
      ticker.stop();
    }

    registerEvents(element, ticker);
    window.addEventListener('resize', resize);

    function resize() {
      renderer.resize();
      registerEvents(element, ticker);
    }

    return {
      start: function start() {
        if (!store.getState().ticker.isRunning) {
          ticker.start();
        }
      },
      stop: function stop() {
        ticker.stop();
      },
      rewind: function rewind() {
        ticker.skipBack();
      },
      fastforward: function fastforward() {
        ticker.skipForward();
      },
      loop: function loop() {
        ticker.loop();
      },
      inc: function inc(value) {
        if (value === void 0) {
          value = 1;
        }

        store.dispatch(actions.ticker.inc(value));
      },
      dec: function dec(value) {
        if (value === void 0) {
          value = 1;
        }

        store.dispatch(actions.ticker.dec(value));
      },
      getDate: function getDate() {
        return store.getState().ticker.currentDate;
      },
      setDate: function setDate(inputDate) {
        store.dispatch(actions.ticker.updateDate(getDateString(inputDate)));
      },
      getAllDates: function getAllDates() {
        return dates.map(function (date) {
          return formatDate(date);
        });
      },
      createScroller: function createScroller$1() {
        createScroller(element);
      }
    };
  }

  exports.d3 = d3;
  exports.generateId = generateId;
  exports.loadData = loadData;
  exports.race = race;

})));
//# sourceMappingURL=racing-bars.umd.js.map
