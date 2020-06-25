(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3'], factory) :
  (global = global || self, factory(global.racingBars = {}, global.d3));
}(this, (function (exports, d3$1) {


  var d3 = {
    __proto__: null,
    axisTop: d3$1.axisTop,
    csv: d3$1.csv,
    easeLinear: d3$1.easeLinear,
    event: d3$1.event,
    format: d3$1.format,
    hsl: d3$1.hsl,
    interpolate: d3$1.interpolate,
    interpolateRound: d3$1.interpolateRound,
    interval: d3$1.interval,
    json: d3$1.json,
    max: d3$1.max,
    scaleLinear: d3$1.scaleLinear,
    select: d3$1.select,
    selectAll: d3$1.selectAll,
    timeYear: d3$1.timeYear,
    timeMonth: d3$1.timeMonth,
    timeDay: d3$1.timeDay,
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

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function getColor(d, store) {
    var _store$getState$data = store.getState().data,
        names = _store$getState$data.names,
        groups = _store$getState$data.groups;
    var _store$getState$optio = store.getState().options,
        showGroups = _store$getState$optio.showGroups,
        colorSeed = _store$getState$optio.colorSeed,
        colorMap = _store$getState$optio.colorMap;

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
    return 'icon-' + safeName(d.name);
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
  function getElement(root, className) {
    return root.querySelector('.' + className);
  }
  function showElement(root, className, useVisibility) {
    if (useVisibility === void 0) {
      useVisibility = false;
    }

    var element = getElement(root, className);

    if (element) {
      if (useVisibility) {
        element.style.visibility = 'unset';
      } else {
        element.style.display = 'flex';
      }
    }
  }
  function hideElement(root, className, useVisibility) {
    if (useVisibility === void 0) {
      useVisibility = false;
    }

    var element = getElement(root, className);

    if (element) {
      if (useVisibility) {
        element.style.visibility = 'hidden';
      } else {
        element.style.display = 'none';
      }
    }
  }
  function addEventHandler(root, className, event, handler) {
    var element = getElement(root, className);

    if (element) {
      element.addEventListener(event, handler);
    }
  }
  function getText(param, currentDate, dateSlice, dates, isDate) {
    if (isDate === void 0) {
      isDate = false;
    }

    if (typeof param === 'function') {
      return param(currentDate, dateSlice, dates);
    }

    if (isDate) {
      return formatDate(currentDate, param);
    }

    return param;
  }
  function safeName(name) {
    return name.replace(/[\W]+/g, '_');
  }
  function toggleClass(root, selector, className) {
    d3$1.select(root).select(selector).classed(className, function () {
      return !d3$1.select(this).classed(className);
    });
  }

  function debounce(func, wait, immediate) {
    if (immediate === void 0) {
      immediate = false;
    }

    var timeout;
    return function (_clicks, _Fn) {
      var context = this;
      var args = arguments;

      var later = function later() {
        timeout = null;

        if (!immediate) {
          func.apply(context, args);
        }
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  var getClicks = debounce(function (event, Fn) {
    Fn(event);
  }, 250);

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

    var year = date.getFullYear().toString();
    var month = zeroPad((1 + date.getMonth()).toString(), 2);
    var day = zeroPad(date.getDate().toString(), 2);
    return year + "-" + month + "-" + day;
  }
  function formatDate(dateStr, format) {
    if (format === void 0) {
      format = 'YYYY-MM-DD';
    }

    var year = dateStr.slice(0, 4);
    var month = dateStr.slice(5, 7);
    var day = dateStr.slice(8, 10);
    var date = new Date(dateStr);
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

  var actionTypes = {
    dataLoaded: 'data/loaded',
    addFilter: 'data/addFilter',
    removeFilter: 'data/removeFilter',
    toggleFilter: 'data/toggleFilter',
    resetFilters: 'data/resetFilters',
    allExceptFilter: 'data/allExceptFilter',
    addSelection: 'data/addSelection',
    removeSelection: 'data/removeSelection',
    toggleSelection: 'data/toggleSelection',
    resetSelections: 'data/resetSelections'
  };
  var dataLoaded = function dataLoaded(dataCollections) {
    return {
      type: actionTypes.dataLoaded,
      payload: dataCollections
    };
  };
  var addFilter = function addFilter(group) {
    return {
      type: actionTypes.addFilter,
      payload: group
    };
  };
  var removeFilter = function removeFilter(group) {
    return {
      type: actionTypes.removeFilter,
      payload: group
    };
  };
  var toggleFilter = function toggleFilter(group) {
    return {
      type: actionTypes.toggleFilter,
      payload: group
    };
  };
  var resetFilters = function resetFilters() {
    return {
      type: actionTypes.resetFilters
    };
  };
  var allExceptFilter = function allExceptFilter(group) {
    return {
      type: actionTypes.allExceptFilter,
      payload: group
    };
  };
  var addSelection = function addSelection(selection) {
    return {
      type: actionTypes.addSelection,
      payload: selection
    };
  };
  var removeSelection = function removeSelection(selection) {
    return {
      type: actionTypes.removeSelection,
      payload: selection
    };
  };
  var toggleSelection = function toggleSelection(selection) {
    return {
      type: actionTypes.toggleSelection,
      payload: selection
    };
  };
  var resetSelections = function resetSelections() {
    return {
      type: actionTypes.resetSelections
    };
  };

  var initialState = {
    names: [],
    groups: [],
    groupFilter: [],
    selected: []
  };
  function dataReducer(state, action) {
    if (state === void 0) {
      state = initialState;
    }

    switch (action.type) {
      case actionTypes.dataLoaded:
        {
          var collections = action.payload;
          return _extends(_extends({}, state), {}, {
            names: [].concat(collections.names),
            groups: [].concat(collections.groups)
          });
        }

      case actionTypes.addFilter:
        return _extends(_extends({}, state), {}, {
          groupFilter: addToArray(state.groupFilter, action.payload)
        });

      case actionTypes.removeFilter:
        return _extends(_extends({}, state), {}, {
          groupFilter: removeFromArray(state.groupFilter, action.payload)
        });

      case actionTypes.toggleFilter:
        return _extends(_extends({}, state), {}, {
          groupFilter: toggleItem(state.groupFilter, action.payload)
        });

      case actionTypes.resetFilters:
        return _extends(_extends({}, state), {}, {
          groupFilter: []
        });

      case actionTypes.allExceptFilter:
        return _extends(_extends({}, state), {}, {
          groupFilter: removeFromArray(state.groups, action.payload)
        });

      case actionTypes.addSelection:
        return _extends(_extends({}, state), {}, {
          selected: addToArray(state.selected, action.payload)
        });

      case actionTypes.removeSelection:
        return _extends(_extends({}, state), {}, {
          selected: removeFromArray(state.selected, action.payload)
        });

      case actionTypes.toggleSelection:
        return _extends(_extends({}, state), {}, {
          selected: toggleItem(state.selected, action.payload)
        });

      case actionTypes.resetSelections:
        return _extends(_extends({}, state), {}, {
          selected: []
        });

      default:
        return state;
    }
  }

  function addToArray(array, item) {
    var arr = [].concat(array);

    if (!arr.includes(item)) {
      arr.push(item);
    }

    return arr;
  }

  function removeFromArray(array, item) {
    return array.filter(function (x) {
      return x !== item;
    });
  }

  function toggleItem(array, item) {
    return array.includes(item) ? removeFromArray(array, item) : addToArray(array, item);
  }



  var data = {
    __proto__: null,
    actionTypes: actionTypes,
    dataLoaded: dataLoaded,
    addFilter: addFilter,
    removeFilter: removeFilter,
    toggleFilter: toggleFilter,
    resetFilters: resetFilters,
    allExceptFilter: allExceptFilter,
    addSelection: addSelection,
    removeSelection: removeSelection,
    toggleSelection: toggleSelection,
    resetSelections: resetSelections,
    dataReducer: dataReducer
  };

  var actionTypes$1 = {
    optionsLoaded: 'options/loaded',
    changeOptions: 'options/change',
    optionsChanged: 'options/changed'
  };
  var optionsLoaded = function optionsLoaded(options) {
    return {
      type: actionTypes$1.optionsLoaded,
      payload: options
    };
  };
  var changeOptions = function changeOptions(options) {
    return {
      type: actionTypes$1.changeOptions,
      payload: options
    };
  };

  var initialState$1 = {
    selector: '#race',
    dataShape: 'long',
    dataTransform: null,
    fillDateGaps: false,
    fillDateGapsValue: 'interpolate',
    startDate: '',
    endDate: '',
    colorSeed: '',
    showGroups: true,
    tickDuration: 500,
    topN: 10,
    disableClickEvents: true,
    disableKeyboardEvents: true,
    autorun: true,
    loop: false,
    injectStyles: true,
    title: '',
    subTitle: '',
    caption: '',
    dateCounter: 'MM/YYYY',
    labelsOnBars: true,
    labelsWidth: 150,
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
    fixedScale: false,
    fixedOrder: [],
    highlightBars: true,
    selectBars: true
  };
  function optionsReducer(state, action) {
    if (state === void 0) {
      state = initialState$1;
    }

    switch (action.type) {
      case actionTypes$1.optionsLoaded:
        var startDate = action.payload.startDate ? getDateString(action.payload.startDate) : '';
        var endDate = action.payload.endDate ? getDateString(action.payload.endDate) : '';
        var inputHeight = action.payload.height || state.inputHeight;
        var inputWidth = action.payload.width || state.inputWidth;
        var fixedOrder = Array.isArray(action.payload.fixedOrder) ? action.payload.fixedOrder : state.fixedOrder;
        var topN = state.topN;

        if (Number(action.payload.topN)) {
          topN = Number(action.payload.topN);
        }

        if (fixedOrder.length > 0 && topN > fixedOrder.length) {
          topN = fixedOrder.length;
        }

        var tickDuration = Number(action.payload.tickDuration) || state.tickDuration;
        var labelsWidth = Number(action.payload.labelsWidth) || state.labelsWidth;
        return _extends(_extends(_extends({}, state), action.payload), {}, {
          startDate: startDate,
          endDate: endDate,
          inputHeight: inputHeight,
          inputWidth: inputWidth,
          fixedOrder: fixedOrder,
          topN: topN,
          tickDuration: tickDuration,
          labelsWidth: labelsWidth
        });

      case actionTypes$1.changeOptions:
        return _extends(_extends({}, state), action.payload);

      default:
        return state;
    }
  }



  var options = {
    __proto__: null,
    actionTypes: actionTypes$1,
    optionsLoaded: optionsLoaded,
    changeOptions: changeOptions,
    optionsReducer: optionsReducer
  };

  var actionTypes$2 = {
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
      type: actionTypes$2.initialize,
      payload: dates,
      event: 'initial'
    };
  };
  var updateDate = function updateDate(currentDate, event) {
    return {
      type: actionTypes$2.updateDate,
      payload: currentDate,
      event: event
    };
  };
  var setRunning = function setRunning(running, event) {
    return {
      type: actionTypes$2.setRunning,
      payload: running,
      event: event
    };
  };
  var setFirst = function setFirst(event) {
    return {
      type: actionTypes$2.setFirst,
      event: event
    };
  };
  var setLast = function setLast(event) {
    return {
      type: actionTypes$2.setLast,
      event: event
    };
  };
  var inc = function inc(event, value) {
    if (value === void 0) {
      value = 1;
    }

    return {
      type: actionTypes$2.inc,
      payload: value,
      event: event
    };
  };
  var dec = function dec(event, value) {
    if (value === void 0) {
      value = 1;
    }

    return {
      type: actionTypes$2.dec,
      payload: value,
      event: event
    };
  };

  var initialState$2 = {
    event: 'initial',
    isRunning: false,
    currentDate: '',
    isFirstDate: true,
    isLastDate: false,
    dates: []
  };
  function tickerReducer(state, action) {
    if (state === void 0) {
      state = initialState$2;
    }

    switch (action.type) {
      case actionTypes$2.initialize:
        {
          var dates = action.payload;
          return _extends(_extends({}, state), {}, {
            isRunning: false,
            currentDate: dates[0],
            isFirstDate: true,
            isLastDate: false,
            dates: dates,
            event: action.event
          });
        }

      case actionTypes$2.updateDate:
        {
          var currentDate = action.payload;

          if (state.dates.indexOf(currentDate) === -1) {
            return _extends({}, state);
          }

          return _extends(_extends({}, state), {}, {
            currentDate: currentDate,
            isFirstDate: currentDate === state.dates[0],
            isLastDate: currentDate === state.dates[state.dates.length - 1],
            event: action.event
          });
        }

      case actionTypes$2.setRunning:
        {
          return _extends(_extends({}, state), {}, {
            isRunning: action.payload,
            event: action.event
          });
        }

      case actionTypes$2.setFirst:
        {
          return _extends(_extends({}, state), {}, {
            currentDate: state.dates[0],
            isFirstDate: true,
            isLastDate: false,
            event: action.event
          });
        }

      case actionTypes$2.setLast:
        {
          return _extends(_extends({}, state), {}, {
            currentDate: state.dates[state.dates.length - 1],
            isFirstDate: false,
            isLastDate: true,
            event: action.event
          });
        }

      case actionTypes$2.inc:
        {
          var currentIndex = state.dates.indexOf(state.currentDate);
          var lastIndex = state.dates.length - 1;
          var incValue = action.payload;
          var newDate = currentIndex + incValue > lastIndex ? state.dates[lastIndex] : state.dates[currentIndex + incValue];
          return _extends(_extends({}, state), {}, {
            currentDate: newDate,
            isFirstDate: newDate === state.dates[0],
            isLastDate: newDate === state.dates[lastIndex],
            event: action.event
          });
        }

      case actionTypes$2.dec:
        {
          var _currentIndex = state.dates.indexOf(state.currentDate);

          var decValue = action.payload;

          var _newDate = _currentIndex - decValue < 0 ? state.dates[0] : state.dates[_currentIndex - decValue];

          return _extends(_extends({}, state), {}, {
            currentDate: _newDate,
            isFirstDate: _newDate === state.dates[0],
            isLastDate: _newDate === state.dates[state.dates.length - 1],
            event: action.event
          });
        }

      default:
        return state;
    }
  }

  function createTicker(store) {
    var ticker;

    function start(event) {
      ticker = d3$1.interval(showRace, store.getState().options.tickDuration);
      store.dispatch(actions.ticker.setRunning(true, event));

      function showRace(_) {
        if (store.getState().ticker.isLastDate) {
          if (store.getState().options.loop || store.getState().ticker.event === 'playButton' || store.getState().ticker.event === 'apiStart' || store.getState().ticker.event === 'keyboardToggle' || store.getState().ticker.event === 'mouseClick') {
            loop();
          } else {
            stop('end');
          }
        } else {
          store.dispatch(actions.ticker.inc('running'));
        }
      }
    }

    function stop(event) {
      if (ticker) {
        ticker.stop();
      }

      store.dispatch(actions.ticker.setRunning(false, event));
    }

    function skipBack(event) {
      stop(event);
      store.dispatch(actions.ticker.setFirst(event));
    }

    function loop() {
      store.dispatch(actions.ticker.setFirst('loop'));
    }

    function skipForward(event) {
      stop(event);
      store.dispatch(actions.ticker.setLast(event));
      store.dispatch(actions.ticker.setLast(event));
    }

    function toggle(event) {
      if (store.getState().ticker.isLastDate) {
        skipBack(event);
        start(event);
      } else if (store.getState().ticker.isRunning) {
        stop(event);
      } else {
        start(event);
      }
    }

    function goToDate(date, event) {
      store.dispatch(actions.ticker.updateDate(date, event));
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
    actionTypes: actionTypes$2,
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
    data: data,
    options: options,
    ticker: ticker
  };

  function rootReducer(state, action) {
    return {
      data: dataReducer(state.data, action),
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

  function prepareData(rawData, store) {
    var options = store.getState().options;
    var data = rawData;

    if (options.dataTransform && typeof options.dataTransform === 'function') {
      data = options.dataTransform(data);
    }

    data = data.map(function (d) {
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

    if (options.fixedOrder.length > 0) {
      data = data.filter(function (d) {
        return options.fixedOrder.includes(d.name);
      }).map(function (d) {
        return _extends(_extends({}, d), {}, {
          rank: options.fixedOrder.indexOf(d.name)
        });
      });
    }

    data = data.map(function (d) {
      var name = d.name ? d.name : '';
      var value = isNaN(+d.value) ? 0 : +d.value;
      return _extends(_extends({}, d), {}, {
        name: name,
        value: value
      });
    }).sort(function (a, b) {
      return a.date.localeCompare(b.date) || a.name.localeCompare(b.name);
    });

    if (options.fillDateGaps) {
      data = fillGaps(data, options.fillDateGaps, options.fillDateGapsValue);
    }

    data = calculateLastValues(data);
    storeDataCollections(data, store);
    return data;
  }

  function storeDataCollections(data, store) {
    var names = Array.from(new Set(data.map(function (d) {
      return d.name;
    }))).sort();
    var groups = Array.from(new Set(data.map(function (d) {
      return d.group;
    }))).filter(Boolean).sort();
    var dates = getDates(data);
    store.dispatch(actions.data.dataLoaded({
      names: names,
      groups: groups
    }));
    store.dispatch(actions.ticker.initialize(dates));
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
    }, []);
  }

  function wideDataToLong(wide, nested) {
    if (nested === void 0) {
      nested = false;
    }

    var _long = [];
    wide.forEach(function (row) {
      for (var _i = 0, _Object$entries = Object.entries(row); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _Object$entries[_i],
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        if (key === 'date') {
          continue;
        }

        var item = {
          date: row.date,
          name: key
        };

        if (nested) {
          item = _extends(_extends({}, item), value);
        } else {
          item = _extends(_extends({}, item), {}, {
            value: value
          });
        }

        _long.push(item);
      }
    });
    return _long;
  }

  function longDataToWide(_long2) {
    var wide = [];

    _long2.forEach(function (item) {
      var dateRow = wide.filter(function (r) {
        return r.date === item.date;
      });
      var row = dateRow.length > 0 ? dateRow[0] : {};

      var details = _objectWithoutPropertiesLoose(item, ["date"]);

      row[item.name] = details;

      if (dateRow.length === 0) {
        row.date = item.date;
        wide.push(row);
      }
    });

    return wide;
  }

  function fillGaps(data, period, fillValue) {
    var intervalRange = period === 'years' ? d3$1.timeYear.range : period === 'months' ? d3$1.timeMonth.range : period === 'days' ? d3$1.timeDay.range : null;

    if (!intervalRange) {
      return data;
    }

    var wideData = longDataToWide(data).map(function (d) {
      return _extends(_extends({}, d), {}, {
        date: new Date(d.date)
      });
    });
    var allData = wideData.reduce(function (acc, row, i) {
      var lastDate = acc[acc.length - 1].date;
      var range = intervalRange(lastDate, row.date);
      var rangeStep = 1 / range.length;

      if (i < wideData.length) {
        var iData = d3$1.interpolate(wideData[i - 1], wideData[i]);
        var newData = [];
        range.forEach(function (_, j) {
          var values = fillValue === 'last' ? iData(0) : iData((j + 1) * rangeStep);
          var newRow = {
            date: range[j]
          };

          for (var _i2 = 0, _Object$entries2 = Object.entries(values); _i2 < _Object$entries2.length; _i2++) {
            var _Object$entries2$_i = _Object$entries2[_i2],
                key = _Object$entries2$_i[0],
                value = _Object$entries2$_i[1];

            if (key !== 'date') {
              newRow[key] = _extends({}, value);
            }
          }

          newData.push(getDateString(row.date) === getDateString(newRow.date) ? row : newRow);
        });
        return [].concat(acc, newData);
      } else {
        return [].concat(acc);
      }
    }, [wideData[0]]).map(function (d) {
      return _extends(_extends({}, d), {}, {
        date: getDateString(d.date)
      });
    });
    return wideDataToLong(allData, true);
  }

  function getDateSlice(data, date, groupFilter) {
    var slice = data.filter(function (d) {
      return d.date === date && !isNaN(d.value);
    }).filter(function (d) {
      return !!d.group ? !groupFilter.includes(d.group) : true;
    }).sort(function (a, b) {
      return b.value - a.value;
    }).map(function (d, i) {
      var _d$rank;

      return _extends(_extends({}, d), {}, {
        rank: (_d$rank = d.rank) != null ? _d$rank : i
      });
    });
    var emptyData = [{
      name: '',
      value: 0,
      lastValue: 0,
      date: date,
      rank: 1
    }];
    return slice.length > 0 ? slice : emptyData;
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

  function createRenderer(data, store) {
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
    var groups = store.getState().data.groups;
    var dates = store.getState().ticker.dates;
    var lastDate = dates[0];
    var _store$getState$optio = store.getState().options,
        selector = _store$getState$optio.selector,
        showGroups = _store$getState$optio.showGroups,
        highlightBars = _store$getState$optio.highlightBars,
        selectBars = _store$getState$optio.selectBars;
    var root = document.querySelector(selector);

    function renderInitalView() {
      var _store$getState$optio2 = store.getState().options,
          title = _store$getState$optio2.title,
          subTitle = _store$getState$optio2.subTitle,
          caption = _store$getState$optio2.caption,
          dateCounter = _store$getState$optio2.dateCounter,
          labelsOnBars = _store$getState$optio2.labelsOnBars,
          showIcons = _store$getState$optio2.showIcons,
          labelsWidth = _store$getState$optio2.labelsWidth,
          inputHeight = _store$getState$optio2.inputHeight,
          inputWidth = _store$getState$optio2.inputWidth,
          minHeight = _store$getState$optio2.minHeight,
          minWidth = _store$getState$optio2.minWidth,
          fixedScale = _store$getState$optio2.fixedScale,
          fixedOrder = _store$getState$optio2.fixedOrder;
      var topN = fixedOrder.length > 0 ? fixedOrder.length : store.getState().options.topN;
      var currentDate = store.getState().ticker.currentDate;
      var CompleteDateSlice = getDateSlice(data, currentDate, store.getState().data.groupFilter);
      var dateSlice = CompleteDateSlice.slice(0, topN);

      if (dateSlice.length === 0) {
        return;
      }

      root.innerHTML = '';
      height = getHeight(root, minHeight, inputHeight);
      width = getWidth(root, minWidth, inputWidth);
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
        svg = d3$1.select(root).append('svg').attr('width', width).attr('height', height);
        titleText = svg.append('text').attr('class', 'title').attr('x', titlePadding).attr('y', 24).html(getText(title, currentDate, CompleteDateSlice, dates));
        subTitleText = svg.append('text').attr('class', 'subTitle').attr('x', titlePadding).attr('y', 55).html(getText(subTitle, currentDate, CompleteDateSlice, dates));

        if (showGroups) {
          var legendsWrapper = svg.append('g');
          var legends = legendsWrapper.selectAll('.legend-wrapper').data(groups).enter().append('g').attr('class', 'legend-wrapper').style('cursor', 'pointer').style('opacity', function (d) {
            return store.getState().data.groupFilter.includes(d) ? 0.3 : 1;
          }).on('click', legendClick);
          legends.append('rect').attr('class', 'legend-color').attr('width', 10).attr('height', 10).attr('y', 75).style('fill', function (d) {
            return getColor({
              group: d
            }, store);
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
        }).enter().append('rect').attr('class', function (d) {
          return 'bar ' + safeName(d.name);
        }).classed('selected', function (d) {
          return store.getState().data.selected.includes(d.name);
        }).attr('x', x(0) + 1).attr('width', barWidth).attr('y', barY).attr('height', barHeight).style('fill', function (d) {
          return getColor(d, store);
        }).on('click', selectFn).on('mouseover', highlightFn).on('mouseout', highlightFn);
        svg.selectAll('text.label').data(dateSlice, function (d) {
          return d.name;
        }).enter().append('text').attr('class', 'label').classed('outside-bars', !labelsOnBars).attr('x', labelX).attr('y', function (d) {
          return barY(d) + barHalfHeight;
        }).style('text-anchor', 'end').html(function (d) {
          return d.name;
        }).on('click', selectFn).on('mouseover', highlightFn).on('mouseout', highlightFn);
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

        var endY = height - margin.bottom;
        var endX = width - margin.right - barPadding;
        var dateCounterTextY = caption ? endY - 30 : endY - 5;
        dateCounterText = svg.append('text').attr('class', 'dateCounterText').attr('x', endX).attr('y', dateCounterTextY).style('text-anchor', 'end').html(getText(dateCounter, currentDate, CompleteDateSlice, dates, true)).call(halo);
        captionText = svg.append('text').attr('class', 'caption').attr('x', endX - 10).attr('y', endY - 5).style('text-anchor', 'end').html(getText(caption, currentDate, CompleteDateSlice, dates));
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
        var elementWidth = root.getBoundingClientRect().width;
        d3$1.select(root).append('div').classed('controls', true).style('width', width).style('right', elementWidth - width + margin.right + barPadding + 'px').selectAll('div').data(controlIcons).enter().append('div').html(function (d) {
          return Object.values(d)[0];
        }).attr('class', function (d) {
          return Object.keys(d)[0];
        });

        if (store.getState().options.showControls === 'play') {
          hideElement(root, elements.skipBack);
          hideElement(root, elements.skipForward);
        }

        if (store.getState().options.showControls === 'none') {
          hideElement(root, elements.controls);
        }
      }

      function renderOverlays() {
        var overlayIcons = [{
          overlayPlay: icons.overlayPlay
        }, {
          overlayRepeat: icons.overlayRepeat
        }];
        d3$1.select(root).append('div').classed('overlay', true).style('minHeight', minHeight + 'px').style('minWidth', minWidth + 'px').selectAll('div').data(overlayIcons).enter().append('div').html(function (d) {
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

      var _store$getState$optio3 = store.getState().options,
          tickDuration = _store$getState$optio3.tickDuration,
          title = _store$getState$optio3.title,
          subTitle = _store$getState$optio3.subTitle,
          caption = _store$getState$optio3.caption,
          dateCounter = _store$getState$optio3.dateCounter,
          fixedScale = _store$getState$optio3.fixedScale,
          fixedOrder = _store$getState$optio3.fixedOrder,
          labelsOnBars = _store$getState$optio3.labelsOnBars;
      var topN = fixedOrder.length > 0 ? fixedOrder.length : store.getState().options.topN;
      var currentDate = store.getState().ticker.currentDate;
      var CompleteDateSlice = getDateSlice(data, currentDate, store.getState().data.groupFilter);
      var dateSlice = CompleteDateSlice.slice(0, topN);

      if (showGroups) {
        svg.selectAll('.legend-wrapper').style('opacity', function (d) {
          return store.getState().data.groupFilter.includes(d) ? 0.3 : 1;
        });
      }

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
        return 'bar ' + safeName(d.name);
      }).classed('selected', function (d) {
        return store.getState().data.selected.includes(d.name);
      }).attr('x', x(0) + 1).attr('width', barWidth).attr('y', function () {
        return y(topN + 1) + 5;
      }).attr('height', barHeight).style('fill', function (d) {
        return getColor(d, store);
      }).on('click', selectFn).on('mouseover', highlightFn).on('mouseout', highlightFn).transition().duration(tickDuration).ease(d3$1.easeLinear).attr('y', barY);
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
      labels.enter().append('text').attr('class', 'label').classed('outside-bars', !labelsOnBars).attr('x', labelX).attr('y', function () {
        return y(topN + 1) + 5 + barHalfHeight;
      }).style('text-anchor', 'end').html(function (d) {
        return d.name;
      }).on('click', selectFn).on('mouseover', highlightFn).on('mouseout', highlightFn).transition().duration(tickDuration).ease(d3$1.easeLinear).attr('y', function (d) {
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
      var sameDate = lastDate === currentDate;
      valueLabels.transition().duration(tickDuration).ease(d3$1.easeLinear).attr('x', function (d) {
        return x(d.value) + 5;
      }).attr('y', function (d) {
        return barY(d) + barHalfHeight;
      }).tween('text', function (d) {
        var lastValue = sameDate ? d.value : d.lastValue;
        var i = d3$1.interpolateRound(lastValue, d.value);
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

      titleText.html(getText(title, currentDate, CompleteDateSlice, dates));
      subTitleText.html(getText(subTitle, currentDate, CompleteDateSlice, dates));
      captionText.html(getText(caption, currentDate, CompleteDateSlice, dates));
      dateCounterText.html(getText(dateCounter, currentDate, CompleteDateSlice, dates, true)).call(halo);
      updateControls();
      lastDate = currentDate;
    }

    function resize() {
      if (!store.getState().options.inputHeight && !store.getState().options.inputWidth || String(store.getState().options.inputHeight).startsWith('window') || String(store.getState().options.inputWidth).startsWith('window')) {
        height = getHeight(root, store.getState().options.minHeight, store.getState().options.inputHeight);
        width = getWidth(root, store.getState().options.minWidth, store.getState().options.inputWidth);
        var currentPosition = root.style.position;
        renderInitalView();
        renderFrame();
        updateControls();
        root.style.position = currentPosition;
      }
    }

    function updateControls() {
      var showOverlays = store.getState().options.showOverlays;

      if (store.getState().ticker.isRunning) {
        showElement(root, elements.pause);
        hideElement(root, elements.play);
      } else {
        showElement(root, elements.play);
        hideElement(root, elements.pause);
      }

      if (store.getState().ticker.isFirstDate && (showOverlays === 'all' || showOverlays === 'play') && !store.getState().ticker.isRunning) {
        hideElement(root, elements.controls, true);
        showElement(root, elements.overlay);
        showElement(root, elements.overlayPlay);
        hideElement(root, elements.overlayRepeat);
      } else if (store.getState().ticker.isLastDate && (showOverlays === 'all' || showOverlays === 'repeat') && !(store.getState().options.loop && store.getState().ticker.isRunning)) {
        hideElement(root, elements.controls, true);
        showElement(root, elements.overlay);
        showElement(root, elements.overlayRepeat);
        hideElement(root, elements.overlayPlay);
      } else {
        showElement(root, elements.controls, true);
        hideElement(root, elements.overlay);
      }
    }

    function halo(text) {
      svg.selectAll('.halo').remove();
      text.select(function () {
        return this.parentNode.insertBefore(this.cloneNode(true), this);
      }).classed('halo', true);
    }

    function legendClick(d) {
      getClicks(d3$1.event, function (event) {
        var clicks = event.detail;

        if (clicks === 3) {
          store.dispatch(actions.data.resetFilters());
        } else if (clicks === 2) {
          store.dispatch(actions.data.allExceptFilter(d));
        } else {
          store.dispatch(actions.data.toggleFilter(d));
        }
      });
    }

    function highlightFn(d) {
      if (highlightBars) {
        toggleClass(root, 'rect.' + safeName(d.name), 'highlight');
      }
    }

    function selectFn(d) {
      if (selectBars) {
        toggleClass(root, 'rect.' + safeName(d.name), 'selected');
        store.dispatch(actions.data.toggleSelection(d.name));
      }
    }

    return {
      renderInitalView: renderInitalView,
      renderFrame: renderFrame,
      resize: resize
    };
  }

  var styles = "\n__selector__ text {\n  font-size: 16px;\n  font-family: Open Sans, sans-serif;\n}\n\n__selector__ text.title {\n  font-size: 24px;\n  font-weight: 500;\n}\n\n__selector__ text.subTitle {\n  font-weight: 500;\n}\n\n__selector__ text.caption {\n  font-weight: 400;\n  font-size: 24px;\n}\n__selector__ text.legend-text {\n  user-select: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n}\n__selector__ text.label {\n  font-weight: 600;\n}\n\n__selector__ text.valueLabel {\n  font-weight: 300;\n}\n\n__selector__ text.dateCounterText {\n  font-size: 64px;\n  font-weight: 700;\n}\n\n__selector__ .xAxis .tick:nth-child(2) text {\n  text-anchor: start;\n}\n\n__selector__ .tick line {\n  shape-rendering: CrispEdges;\n}\n\n__selector__ path.domain {\n  display: none;\n}\n\n__selector__ {\n  position: relative;\n}\n\n__selector__ .controls {\n  /*  width and right are set dynamically in renderer.ts */\n  position: absolute;\n  top: 0;\n  display: flex;\n}\n\n__selector__ .controls div,\n__selector__ .overlay div {\n  cursor: pointer;\n  font-size: 24px;\n  font-weight: 700;\n  width: 38px;\n  height: 38px;\n  -moz-border-radius: 5px;\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n  margin: 5px;\n  text-align: center;\n}\n\n__selector__ .controls svg {\n  margin: 5px auto;\n  width: 28px;\n  height: 28px;\n}\n\n__selector__ .overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n__selector__ .overlay div {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 200px;\n  height: 200px;\n  -moz-border-radius: 100px;\n  -webkit-border-radius: 100px;\n  border-radius: 100px;\n}\n__selector__ .overlay svg {\n  height: 50%;\n  width: 50%;\n}\n";
  var themes = {
    "dark": "\n__selector__ {\n  background-color: #313639;\n}\n\n__selector__ text.title {\n  fill: #fafafa;\n}\n\n__selector__ text.subTitle {\n  fill: #cccccc;\n}\n\n__selector__ text.dateCounterText {\n  fill: #cccccc;\n  opacity: 1;\n}\n\n__selector__ text.caption {\n  fill: #cccccc;\n}\n\n__selector__ .halo {\n  fill: #313639;\n  stroke: #313639;\n  stroke-width: 10;\n  stroke-linejoin: round;\n  opacity: 1;\n}\n\n__selector__ text.legend-text {\n  fill: #fafafa;\n}\n\n__selector__ text.label {\n  fill: #313639;\n}\n\n__selector__ text.label.outside-bars {\n  fill: #fafafa;\n}\n\n__selector__ text.valueLabel {\n  fill: #fafafa;\n}\n\n__selector__ .tick text {\n  fill: #cccccc;\n}\n\n__selector__ .tick line {\n  shape-rendering: CrispEdges;\n  stroke: #dddddd;\n}\n\n__selector__ .tick line.origin {\n  stroke: #aaaaaa;\n}\n\n__selector__ .controls div,\n__selector__ .overlay div {\n  color: #ffffff;\n  background: #777777;\n  border: 1px solid black;\n  opacity: 0.5;\n}\n\n__selector__ .controls div:hover,\n__selector__ .overlay div:hover {\n  background: #aaaaaa;\n  color: black;\n}\n\n__selector__ .overlay {\n  background-color: black;\n  opacity: 0.7;\n}\n\n__selector__ .highlight {\n  fill: #ff2727 !important;\n}\n\n__selector__ .selected {\n  fill: #d12020 !important;\n  stroke: #777777 !important;\n  stroke-width: 1 !important;\n}\n",
    "light": "\n/* __selector__ {\n  background-color: #ffffff;\n}\n\n__selector__ text.title {\n  fill: #fafafa;\n} */\n\n__selector__ text.subTitle {\n  fill: #777777;\n}\n\n__selector__ text.dateCounterText {\n  fill: #bbbbbb;\n  opacity: 1;\n}\n\n__selector__ text.caption {\n  fill: #777777;\n}\n\n__selector__ .halo {\n  fill: #ffffff;\n  stroke: #ffffff;\n  stroke-width: 10;\n  stroke-linejoin: round;\n  opacity: 1;\n}\n\n__selector__ text.legend-text {\n  fill: #000000;\n}\n\n__selector__ text.label {\n  fill: #000000;\n}\n\n__selector__ text.label.outside-bars {\n  fill: #000000;\n}\n\n__selector__ text.valueLabel {\n  fill: #000000;\n}\n\n__selector__ .tick text {\n  fill: #777777;\n}\n\n__selector__ .tick line {\n  shape-rendering: CrispEdges;\n  stroke: #dddddd;\n}\n\n__selector__ .tick line.origin {\n  stroke: #aaaaaa;\n}\n\n__selector__ .controls div,\n__selector__ .overlay div {\n  color: #ffffff;\n  background: #777777;\n  border: 1px solid black;\n  opacity: 0.5;\n}\n\n__selector__ .controls div:hover,\n__selector__ .overlay div:hover {\n  background: #aaaaaa;\n  color: black;\n}\n\n__selector__ .overlay {\n  background-color: black;\n  opacity: 0.7;\n}\n\n__selector__ .highlight {\n  fill: #ff2727 !important;\n}\n\n__selector__ .selected {\n  fill: #d12020 !important;\n  stroke: #777777 !important;\n  stroke-width: 1 !important;\n}\n"
  };

  function styleInject(selector, theme, insertAt) {
    if (insertAt === void 0) {
      insertAt = 'top';
    }

    var css = styles + themes[theme];

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

  function registerEvents(store, ticker) {
    var root = document.querySelector(store.getState().options.selector);
    registerControlButtonEvents();
    registerOverlayEvents();
    registerClickEvents();
    registerKeyboardEvents();

    function registerControlButtonEvents() {
      addEventHandler(root, elements.skipBack, 'click', function () {
        ticker.skipBack('skipBackButton');
      });
      addEventHandler(root, elements.play, 'click', function () {
        ticker.start('playButton');
      });
      addEventHandler(root, elements.pause, 'click', function () {
        ticker.stop('pauseButton');
      });
      addEventHandler(root, elements.skipForward, 'click', function () {
        ticker.skipForward('skipForwardButton');
      });
    }

    function registerOverlayEvents() {
      addEventHandler(root, elements.overlayPlay, 'click', function () {
        hideElement(root, elements.overlay);
        ticker.start('playOverlay');
      });
      addEventHandler(root, elements.overlayRepeat, 'click', function () {
        hideElement(root, elements.overlay);
        ticker.skipBack('repeatOverlay');
        ticker.start('repeatOverlay');
      });
    }

    function registerClickEvents() {
      if (!store.getState().options.disableClickEvents) {
        var svg = root.querySelector('svg');
        svg.addEventListener('click', function () {
          ticker.toggle('mouseClick');
        });
        root.addEventListener('dblclick', function () {
          ticker.skipForward('mouseDoubleClick');
        });
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
              ticker.toggle('keyboardToggle');
              break;

            case keyCodes.a:
              ticker.skipBack('keyboardSkipBack');
              break;

            case keyCodes.s:
              ticker.toggle('keyboardToggle');
              break;

            case keyCodes.d:
              ticker.skipForward('keyboardSkipForward');
              break;
          }
        });
      }
    }
  }

  function dispatchDOMEvent(store) {
    var element = document.querySelector(store.getState().options.selector);

    if (!element) {
      return;
    }

    element.dispatchEvent(new CustomEvent('racingBars/dateChanged', {
      bubbles: true,
      detail: {
        date: store.getState().ticker.currentDate,
        isFirst: store.getState().ticker.isFirstDate,
        isLast: store.getState().ticker.isLastDate
      }
    }));
  }

  function DOMEventSubscriber(store) {
    var lastDate = '';
    return function () {
      var currentDate = store.getState().ticker.currentDate;

      if (currentDate !== lastDate) {
        dispatchDOMEvent(store);
        lastDate = currentDate;
      }
    };
  }

  function createScroller(element, store) {
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
        store.dispatch(actions.ticker.updateDate(dates[index], 'scroll'));
      } else {
        store.dispatch(actions.ticker.setLast('scroll'));
      }
    }
  }

  function race(data, options) {
    if (options === void 0) {
      options = {};
    }

    var store = createStore(rootReducer);
    store.dispatch(actions.options.optionsLoaded(options));
    var _store$getState$optio = store.getState().options,
        selector = _store$getState$optio.selector,
        injectStyles = _store$getState$optio.injectStyles,
        theme = _store$getState$optio.theme,
        autorun = _store$getState$optio.autorun;
    var root = document.querySelector(selector);

    if (!root) {
      return;
    }

    if (injectStyles) {
      styleInject(selector, theme, 'top');
    }

    var preparedData = prepareData(data, store);
    var ticker = createTicker(store);
    var renderer = createRenderer(preparedData, store);
    renderer.renderInitalView();
    store.subscribe(renderer.renderFrame);
    store.subscribe(DOMEventSubscriber(store));
    ticker.start('loaded');

    if (!autorun) {
      ticker.stop('loaded');
    }

    registerEvents(store, ticker);
    window.addEventListener('resize', resize);

    function resize() {
      renderer.resize();
      registerEvents(store, ticker);
    }

    return {
      start: function start() {
        if (!store.getState().ticker.isRunning) {
          ticker.start('apiStart');
        }
      },
      stop: function stop() {
        ticker.stop('apiStop');
      },
      rewind: function rewind() {
        ticker.skipBack('apiSkipBack');
      },
      fastforward: function fastforward() {
        ticker.skipForward('apiSkipForward');
      },
      loop: function loop() {
        ticker.loop();
      },
      inc: function inc(value) {
        if (value === void 0) {
          value = 1;
        }

        store.dispatch(actions.ticker.inc('apiInc', value));
      },
      dec: function dec(value) {
        if (value === void 0) {
          value = 1;
        }

        store.dispatch(actions.ticker.dec('apiDec', value));
      },
      getDate: function getDate() {
        return store.getState().ticker.currentDate;
      },
      setDate: function setDate(inputDate) {
        store.dispatch(actions.ticker.updateDate(getDateString(inputDate), 'apiSetDate'));
      },
      getAllDates: function getAllDates() {
        return [].concat(store.getState().ticker.dates);
      },
      createScroller: function createScroller$1() {
        createScroller(root, store);
      },
      selections: {
        select: function select(name) {
          d3$1.select(root).select('rect.' + safeName(name)).classed('selected', true);
          store.dispatch(actions.data.addSelection(name));
        },
        unselect: function unselect(name) {
          d3$1.select(root).select('rect.' + safeName(name)).classed('selected', false);
          store.dispatch(actions.data.removeSelection(name));
        },
        unselectAll: function unselectAll() {
          d3$1.select(root).selectAll('rect').classed('selected', false);
          store.dispatch(actions.data.resetSelections());
        }
      },
      groups: {
        hide: function hide(group) {
          store.dispatch(actions.data.addFilter(group));
        },
        show: function show(group) {
          store.dispatch(actions.data.removeFilter(group));
        },
        showOnly: function showOnly(group) {
          store.dispatch(actions.data.allExceptFilter(group));
        },
        showAll: function showAll() {
          store.dispatch(actions.data.resetFilters());
        }
      }
    };
  }

  exports.d3 = d3;
  exports.generateId = generateId;
  exports.loadData = loadData;
  exports.race = race;

})));
//# sourceMappingURL=racing-bars.umd.js.map
