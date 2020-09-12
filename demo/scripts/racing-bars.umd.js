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

  var actionTypes = {
    loadOptions: 'options/load',
    changeOptions: 'options/change'
  };
  var loadOptions = function loadOptions(options) {
    return {
      type: actionTypes.loadOptions,
      payload: options
    };
  };
  var changeOptions = function changeOptions(options) {
    return {
      type: actionTypes.changeOptions,
      payload: options
    };
  };

  var Options = function Options() {};

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

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
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

    var rnd = Array(3).fill(null).map(function () {
      return Math.random().toString(36).substr(2);
    }).join('');
    return prefix + rnd.slice(-n);
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
    if (!root) return;
    return className ? root.querySelector('.' + className) : root;
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
  var pipe = function pipe() {
    return [].slice.call(arguments).reduce(function (f, g) {
      return function () {
        return g(f.apply(void 0, [].slice.call(arguments)));
      };
    });
  };

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
  function getDateRange(date1, date2, interval) {
    var range = [date1].concat(d3$1.timeDay.range(date1, date2));

    var daysInMonth = function daysInMonth(date) {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    var sameDay = date1.getDate() === date2.getDate();
    var sameMonth = date1.getMonth() === date2.getMonth();
    var numberOfMonths = d3$1.timeMonth.count(date1, date2);
    var numberOfYears = d3$1.timeYear.count(date1, date2);
    var outputRange = [];

    if (interval === 'year') {
      if (sameMonth && sameDay) {
        outputRange = range.filter(function (date) {
          if (date.getMonth() === date1.getMonth()) {
            if (date.getDate() === date1.getDate()) return true;

            if (date1.getDate() > daysInMonth(date)) {
              return date.getDate() === daysInMonth(date);
            }
          }

          return false;
        });
      } else {
        outputRange = range.filter(function (date) {
          return range.indexOf(date) % Math.round(range.length / numberOfYears) === 0;
        });
      }
    } else if (interval === 'month') {
      if (sameDay) {
        outputRange = range.filter(function (date) {
          if (date.getDate() === date1.getDate()) return true;

          if (date1.getDate() > daysInMonth(date)) {
            return date.getDate() === daysInMonth(date);
          }

          return false;
        });
      } else {
        outputRange = range.filter(function (date) {
          return range.indexOf(date) % Math.round(range.length / numberOfMonths) === 0;
        });
      }
    } else if (interval === 'day') {
      outputRange = range;
    }

    if (outputRange.length === 0) {
      outputRange = [date1, date2];
    }

    if (getDateString(date1) !== getDateString(outputRange[0])) {
      outputRange = [date1].concat(outputRange);
    }

    if (getDateString(date2) !== getDateString(outputRange[outputRange.length - 1])) {
      outputRange = [].concat(outputRange, [date2]);
    }

    return outputRange;
  }
  function getNextDate(dates, currentDate) {
    var currentIndex = dates.indexOf(currentDate);
    if (currentIndex === -1) return dates[0];
    var lastIndex = dates.length - 1;
    return currentIndex === lastIndex ? dates[0] : dates[currentIndex + 1];
  }

  var defaultOptions = {
    selector: '#race',
    dataShape: 'long',
    dataTransform: null,
    fillDateGapsInterval: null,
    fillDateGapsValue: 'interpolate',
    startDate: '',
    endDate: '',
    colorSeed: '',
    showGroups: false,
    tickDuration: 500,
    topN: 10,
    mouseControls: false,
    keyboardControls: false,
    autorun: true,
    loop: false,
    injectStyles: true,
    title: '',
    subTitle: '',
    caption: '',
    dateCounter: 'MM/YYYY',
    labelsPosition: 'inside',
    labelsWidth: 150,
    showIcons: false,
    controlButtons: 'all',
    overlays: 'none',
    inputHeight: '',
    inputWidth: '',
    minHeight: 300,
    minWidth: 500,
    height: '',
    width: '',
    marginTop: 0,
    marginRight: 20,
    marginBottom: 5,
    marginLeft: 0,
    theme: 'light',
    colorMap: {},
    fixedScale: false,
    fixedOrder: [],
    highlightBars: false,
    selectBars: false
  };
  var optionsReducer = function optionsReducer(state, action) {
    if (state === void 0) {
      state = defaultOptions;
    }

    switch (action.type) {
      case actionTypes.loadOptions:
      case actionTypes.changeOptions:
        {
          var excludedKeys = ['inputHeight', 'inputWidth', 'minHeight', 'minWidth'];
          var options = {};
          Object.keys(action.payload).forEach(function (key) {
            if (!excludedKeys.includes(key)) {
              var _action$payload$key;

              options[key] = (_action$payload$key = action.payload[key]) != null ? _action$payload$key : state[key];
            }
          });
          var startDate = options.startDate ? getDateString(options.startDate) : state.startDate;
          var endDate = options.endDate ? getDateString(options.endDate) : state.startDate;
          var inputHeight = options.height || state.inputHeight;
          var inputWidth = options.width || state.inputWidth;
          var fixedOrder = Array.isArray(options.fixedOrder) ? [].concat(options.fixedOrder) : state.fixedOrder;
          var colorMap = Array.isArray(options.colorMap) ? [].concat(options.colorMap).map(String) : typeof options.colorMap === 'object' ? _extends({}, options.colorMap) : state.colorMap;
          var topN = fixedOrder.length || Number(options.topN) || state.topN;
          var tickDuration = Number(options.tickDuration) || state.tickDuration;
          var labelsWidth = Number(options.labelsWidth) || state.labelsWidth;
          var marginTop = Number(options.marginTop) || state.marginTop;
          var marginRight = Number(options.marginRight) || state.marginRight;
          var marginBottom = Number(options.marginBottom) || state.marginBottom;
          var marginLeft = Number(options.marginLeft) || state.marginLeft;
          return _extends(_extends(_extends({}, state), options), {}, {
            startDate: startDate,
            endDate: endDate,
            inputHeight: inputHeight,
            inputWidth: inputWidth,
            fixedOrder: fixedOrder,
            colorMap: colorMap,
            topN: topN,
            tickDuration: tickDuration,
            labelsWidth: labelsWidth,
            marginTop: marginTop,
            marginRight: marginRight,
            marginBottom: marginBottom,
            marginLeft: marginLeft
          });
        }

      default:
        return state;
    }
  };



  var options = {
    __proto__: null,
    actionTypes: actionTypes,
    loadOptions: loadOptions,
    changeOptions: changeOptions,
    Options: Options,
    defaultOptions: defaultOptions,
    optionsReducer: optionsReducer
  };

  var actionTypes$1 = {
    dataLoaded: 'data/loaded',
    addFilter: 'data/addFilter',
    removeFilter: 'data/removeFilter',
    toggleFilter: 'data/toggleFilter',
    resetFilters: 'data/resetFilters',
    allExceptFilter: 'data/allExceptFilter',
    addSelection: 'data/addSelection',
    removeSelection: 'data/removeSelection',
    toggleSelection: 'data/toggleSelection',
    resetSelections: 'data/resetSelections',
    addDateSlice: 'data/addDateSlice',
    clearDateSlices: 'data/clearDateSlices'
  };
  var dataLoaded = function dataLoaded(dataCollections) {
    return {
      type: actionTypes$1.dataLoaded,
      payload: dataCollections
    };
  };
  var addFilter = function addFilter(group) {
    return {
      type: actionTypes$1.addFilter,
      payload: group
    };
  };
  var removeFilter = function removeFilter(group) {
    return {
      type: actionTypes$1.removeFilter,
      payload: group
    };
  };
  var toggleFilter = function toggleFilter(group) {
    return {
      type: actionTypes$1.toggleFilter,
      payload: group
    };
  };
  var resetFilters = function resetFilters() {
    return {
      type: actionTypes$1.resetFilters
    };
  };
  var allExceptFilter = function allExceptFilter(group) {
    return {
      type: actionTypes$1.allExceptFilter,
      payload: group
    };
  };
  var addSelection = function addSelection(selection) {
    return {
      type: actionTypes$1.addSelection,
      payload: selection
    };
  };
  var removeSelection = function removeSelection(selection) {
    return {
      type: actionTypes$1.removeSelection,
      payload: selection
    };
  };
  var toggleSelection = function toggleSelection(selection) {
    return {
      type: actionTypes$1.toggleSelection,
      payload: selection
    };
  };
  var resetSelections = function resetSelections() {
    return {
      type: actionTypes$1.resetSelections
    };
  };
  var addDateSlice = function addDateSlice(date, dateSlice) {
    var payload = {};
    payload[date] = dateSlice;
    return {
      type: actionTypes$1.addDateSlice,
      payload: payload,
      triggerRender: false
    };
  };
  var clearDateSlices = function clearDateSlices() {
    return {
      type: actionTypes$1.clearDateSlices
    };
  };

  var initialState = {
    names: [],
    groups: [],
    datesCache: [],
    groupFilter: [],
    selected: [],
    dateSlices: {}
  };
  var dataReducer = function dataReducer(state, action) {
    if (state === void 0) {
      state = initialState;
    }

    switch (action.type) {
      case actionTypes$1.dataLoaded:
        return _extends(_extends({}, state), {}, {
          names: [].concat(action.payload.names),
          groups: [].concat(action.payload.groups),
          datesCache: [].concat(action.payload.datesCache)
        });

      case actionTypes$1.addFilter:
        return _extends(_extends({}, state), {}, {
          groupFilter: addToArray(state.groupFilter, action.payload)
        });

      case actionTypes$1.removeFilter:
        return _extends(_extends({}, state), {}, {
          groupFilter: removeFromArray(state.groupFilter, action.payload)
        });

      case actionTypes$1.toggleFilter:
        return _extends(_extends({}, state), {}, {
          groupFilter: toggleItem(state.groupFilter, action.payload)
        });

      case actionTypes$1.resetFilters:
        return _extends(_extends({}, state), {}, {
          groupFilter: []
        });

      case actionTypes$1.allExceptFilter:
        return _extends(_extends({}, state), {}, {
          groupFilter: removeFromArray(state.groups, action.payload)
        });

      case actionTypes$1.addSelection:
        return _extends(_extends({}, state), {}, {
          selected: addToArray(state.selected, action.payload)
        });

      case actionTypes$1.removeSelection:
        return _extends(_extends({}, state), {}, {
          selected: removeFromArray(state.selected, action.payload)
        });

      case actionTypes$1.toggleSelection:
        return _extends(_extends({}, state), {}, {
          selected: toggleItem(state.selected, action.payload)
        });

      case actionTypes$1.resetSelections:
        return _extends(_extends({}, state), {}, {
          selected: []
        });

      case actionTypes$1.addDateSlice:
        return _extends(_extends({}, state), {}, {
          dateSlices: _extends(_extends({}, state.dateSlices), action.payload)
        });

      case actionTypes$1.clearDateSlices:
        return _extends(_extends({}, state), {}, {
          dateSlices: {}
        });

      default:
        return state;
    }
  };

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
    actionTypes: actionTypes$1,
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
    addDateSlice: addDateSlice,
    clearDateSlices: clearDateSlices,
    dataReducer: dataReducer
  };

  var actionTypes$2 = {
    initialize: 'ticker/initialize',
    changeDates: 'ticker/changeDates',
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
      payload: dates
    };
  };
  var changeDates = function changeDates(dates) {
    return {
      type: actionTypes$2.changeDates,
      payload: dates
    };
  };
  var updateDate = function updateDate(currentDate) {
    return {
      type: actionTypes$2.updateDate,
      payload: currentDate
    };
  };
  var setRunning = function setRunning(running) {
    return {
      type: actionTypes$2.setRunning,
      payload: running
    };
  };
  var setFirst = function setFirst() {
    return {
      type: actionTypes$2.setFirst
    };
  };
  var setLast = function setLast() {
    return {
      type: actionTypes$2.setLast
    };
  };
  var inc = function inc(value) {
    if (value === void 0) {
      value = 1;
    }

    return {
      type: actionTypes$2.inc,
      payload: value
    };
  };
  var dec = function dec(value) {
    if (value === void 0) {
      value = 1;
    }

    return {
      type: actionTypes$2.dec,
      payload: value
    };
  };

  var initialState$1 = {
    isRunning: false,
    currentDate: '',
    isFirstDate: true,
    isLastDate: false,
    dates: []
  };
  var tickerReducer = function tickerReducer(state, action) {
    if (state === void 0) {
      state = initialState$1;
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
            dates: dates
          });
        }

      case actionTypes$2.changeDates:
        {
          var _dates = action.payload;
          var currentDate = _dates.indexOf(state.currentDate) !== -1 ? state.currentDate : state.currentDate < _dates[0] ? _dates[0] : state.currentDate > _dates[_dates.length - 1] ? _dates[_dates.length - 1] : _dates[[].concat(_dates, [state.currentDate]).sort().indexOf(state.currentDate)];
          return _extends(_extends({}, state), {}, {
            currentDate: currentDate,
            isFirstDate: currentDate === _dates[0],
            isLastDate: currentDate === _dates[state.dates.length - 1],
            dates: _dates
          });
        }

      case actionTypes$2.updateDate:
        {
          var _currentDate = action.payload;

          if (state.dates.indexOf(_currentDate) === -1) {
            return _extends({}, state);
          }

          return _extends(_extends({}, state), {}, {
            currentDate: _currentDate,
            isFirstDate: _currentDate === state.dates[0],
            isLastDate: _currentDate === state.dates[state.dates.length - 1]
          });
        }

      case actionTypes$2.setRunning:
        {
          return _extends(_extends({}, state), {}, {
            isRunning: action.payload
          });
        }

      case actionTypes$2.setFirst:
        {
          return _extends(_extends({}, state), {}, {
            currentDate: state.dates[0],
            isFirstDate: true,
            isLastDate: false
          });
        }

      case actionTypes$2.setLast:
        {
          return _extends(_extends({}, state), {}, {
            currentDate: state.dates[state.dates.length - 1],
            isFirstDate: false,
            isLastDate: true
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
            isLastDate: newDate === state.dates[lastIndex]
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
            isLastDate: _newDate === state.dates[state.dates.length - 1]
          });
        }

      default:
        return state;
    }
  };

  function createTicker(store) {
    var ticker;

    function start() {
      var justStarted = true;
      ticker = d3$1.interval(showRace, store.getState().options.tickDuration);
      store.dispatch(actions.ticker.setRunning(true));

      function showRace(_) {
        if (!store.getState().ticker.isLastDate) {
          store.dispatch(actions.ticker.inc());
        } else {
          if (store.getState().options.loop || justStarted) {
            loop();
          } else {
            stop();
          }
        }

        justStarted = false;
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
      store.dispatch(actions.ticker.setLast());
    }

    function toggle() {
      if (store.getState().ticker.isLastDate) {
        skipBack();
        start();
      } else if (store.getState().ticker.isRunning) {
        stop();
      } else {
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
    actionTypes: actionTypes$2,
    initialize: initialize,
    changeDates: changeDates,
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

  var rootReducer = function rootReducer(state, action) {
    var _action$triggerRender;

    return {
      data: dataReducer(state.data, action),
      options: optionsReducer(state.options, action),
      ticker: tickerReducer(state.ticker, action),
      triggerRender: (_action$triggerRender = action.triggerRender) != null ? _action$triggerRender : true
    };
  };

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

    function unsubscribeAll() {
      subscribers.length = 0;
    }

    return {
      getState: getState,
      dispatch: dispatch,
      subscribe: subscribe,
      unsubscribeAll: unsubscribeAll
    };
  }

  function prepareData(data, store, changingOptions) {
    if (changingOptions === void 0) {
      changingOptions = false;
    }

    var options = store.getState().options;
    return pipe(customDataTransform(options.dataTransform), filterByDate(options.startDate, options.endDate), wideDataToLong(options.dataShape), processFixedOrder(options.fixedOrder), validateAndSort, fillDateGaps(options.fillDateGapsInterval, options.fillDateGapsValue, options.topN), calculateLastValues, storeDataCollections(store, changingOptions))(data);
  }

  function customDataTransform(transformFn) {
    return function (data) {
      return transformFn && typeof transformFn === 'function' ? transformFn(data) : data;
    };
  }

  function filterByDate(startDate, endDate) {
    return function (data) {
      return data.map(function (d) {
        return _extends(_extends({}, d), {}, {
          date: getDateString(d.date)
        });
      }).filter(function (d) {
        return startDate ? d.date >= startDate : true;
      }).filter(function (d) {
        return endDate ? d.date <= endDate : true;
      });
    };
  }

  function processFixedOrder(fixedOrder) {
    return function (data) {
      return fixedOrder.length === 0 ? data : data.filter(function (d) {
        return fixedOrder.includes(d.name);
      }).map(function (d) {
        return _extends(_extends({}, d), {}, {
          rank: fixedOrder.indexOf(d.name)
        });
      });
    };
  }

  function validateAndSort(data) {
    return data.map(function (d) {
      var name = d.name ? d.name : '';
      var value = isNaN(+d.value) ? 0 : +d.value;
      return _extends(_extends({}, d), {}, {
        name: name,
        value: value
      });
    }).sort(function (a, b) {
      return a.date.localeCompare(b.date) || a.name.localeCompare(b.name);
    });
  }

  function fillDateGaps(fillDateGapsInterval, fillDateGapsValue, topN) {
    return function (data) {
      return fillDateGapsInterval ? fillGaps(data, fillDateGapsInterval, fillDateGapsValue, topN) : data;
    };
  }

  function storeDataCollections(store, changingOptions) {
    return function (data) {
      var names = Array.from(new Set(data.map(function (d) {
        return String(d.name);
      }))).sort();
      var groups = Array.from(new Set(data.map(function (d) {
        return String(d.group);
      }))).filter(Boolean).sort();
      var dates = getDates(data);
      store.dispatch(actions.data.dataLoaded({
        names: names,
        groups: groups,
        datesCache: dates
      }));

      if (!changingOptions) {
        store.dispatch(actions.ticker.initialize(dates));
      } else {
        store.dispatch(actions.ticker.changeDates(dates));
      }

      return data;
    };
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

  function wideDataToLong(dataShape, nested) {
    if (nested === void 0) {
      nested = false;
    }

    return function (data) {
      if (dataShape === 'long') return data;
      var _long = [];
      data.forEach(function (row) {
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
    };
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

  function fillGaps(data, interval, fillValue, topN) {
    if (!interval) {
      return data;
    }

    var wideData = longDataToWide(data).map(function (d) {
      return _extends(_extends({}, d), {}, {
        date: new Date(d.date)
      });
    });
    var allData = wideData.reduce(function (acc, row, i) {
      var lastDate = acc[acc.length - 1].date;
      var range = getDateRange(lastDate, row.date, interval).slice(1);
      var rangeStep = 1 / range.length;

      if (i < wideData.length) {
        var iData = interpolateTopN(wideData[i - 1], wideData[i], topN);
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
    return wideDataToLong('wide', true)(allData);
  }

  function interpolateTopN(data1, data2, topN) {
    if (data1 === void 0) {
      data1 = {};
    }

    if (data2 === void 0) {
      data2 = {};
    }

    var topData1 = getTopN(data1, topN);
    var topData2 = getTopN(data2, topN);
    var topNames = Array.from(new Set([].concat(topData1, topData2)));
    var filteredData1 = topNames.reduce(function (acc, curr) {
      var _extends2;

      return _extends(_extends({}, acc), {}, (_extends2 = {}, _extends2[curr] = data1[curr], _extends2));
    }, {});
    var filteredData2 = topNames.reduce(function (acc, curr) {
      var _extends3;

      return _extends(_extends({}, acc), {}, (_extends3 = {}, _extends3[curr] = data2[curr], _extends3));
    }, {});
    return d3$1.interpolate(filteredData1, filteredData2);

    function getTopN(data, topN) {
      if (data === void 0) {
        data = {};
      }

      return Object.keys(data).filter(function (key) {
        return key !== 'date';
      }).map(function (key) {
        return data[key];
      }).sort(function (a, b) {
        return b.value - a.value;
      }).slice(0, topN).map(function (d) {
        return d.name;
      });
    }
  }

  function getDateSlice(date, data, store) {
    var dateSlice;

    if (store.getState().data.dateSlices[date]) {
      dateSlice = store.getState().data.dateSlices[date];
    } else {
      var slice = data.filter(function (d) {
        return d.date === date && !isNaN(d.value);
      }).sort(function (a, b) {
        return b.value - a.value;
      }).map(function (d, i) {
        return _extends(_extends({}, d), {}, {
          rank: getRank(d, i, store)
        });
      });
      var emptyData = [{
        name: '',
        value: 0,
        lastValue: 0,
        date: date,
        rank: 1
      }];
      dateSlice = slice.length > 0 ? slice : emptyData;
      store.dispatch(actions.data.addDateSlice(date, dateSlice));
    }

    var groupFilter = store.getState().data.groupFilter;
    return groupFilter.length > 0 ? filterGroups(dateSlice, store) : dateSlice;
  }

  function filterGroups(data, store) {
    var groupFilter = store.getState().data.groupFilter;
    return data.filter(function (d) {
      return !!d.group ? !groupFilter.includes(d.group) : true;
    }).map(function (d, i) {
      return _extends(_extends({}, d), {}, {
        rank: getRank(d, i, store)
      });
    });
  }

  function computeNextDateSubscriber(data, store) {
    return function () {
      if (store.getState().ticker.isRunning) {
        var nextDate = getNextDate(store.getState().ticker.dates, store.getState().ticker.currentDate);
        getDateSlice(nextDate, data, store);
      }
    };
  }

  function getRank(d, i, store) {
    var fixedOrder = store.getState().options.fixedOrder;
    return fixedOrder.length > 0 ? d.rank : i;
  }

  function calculateDimensions(store, renderOptions) {
    var _store$getState$optio = store.getState().options,
        minHeight = _store$getState$optio.minHeight,
        inputHeight = _store$getState$optio.inputHeight,
        minWidth = _store$getState$optio.minWidth,
        inputWidth = _store$getState$optio.inputWidth,
        title = _store$getState$optio.title,
        subTitle = _store$getState$optio.subTitle,
        showGroups = _store$getState$optio.showGroups,
        controlButtons = _store$getState$optio.controlButtons,
        marginTop = _store$getState$optio.marginTop,
        marginRight = _store$getState$optio.marginRight,
        marginBottom = _store$getState$optio.marginBottom,
        marginLeft = _store$getState$optio.marginLeft,
        labelsPosition = _store$getState$optio.labelsPosition,
        labelsWidth = _store$getState$optio.labelsWidth,
        showIcons = _store$getState$optio.showIcons,
        fixedOrder = _store$getState$optio.fixedOrder;
    var root = renderOptions.root,
        maxValue = renderOptions.maxValue;
    var topN = fixedOrder.length > 0 ? fixedOrder.length : store.getState().options.topN;
    var height = renderOptions.height = getHeight(root, minHeight, inputHeight);
    var width = renderOptions.width = getWidth(root, minWidth, inputWidth);
    var titlePadding = 5;
    var titleHeight = title ? 55 : 0;
    var subTitleHeight = !subTitle ? 0 : title ? 20 : 40;
    var groupsHeight = !showGroups ? 0 : titleHeight || subTitleHeight ? 20 : 30;
    var controlsHeight = controlButtons !== 'none' ? 50 : 0;
    var headerHeight = Math.max(titleHeight + subTitleHeight + groupsHeight, controlsHeight + groupsHeight, 10);
    var labelsArea = labelsPosition === 'inside' ? 0 : labelsWidth;
    var topAxisPadding = 15;
    var margin = {
      top: marginTop + headerHeight + topAxisPadding,
      right: marginRight,
      bottom: marginBottom,
      left: marginLeft + labelsArea
    };
    var x = renderOptions.x = d3$1.scaleLinear().domain([0, maxValue]).range([margin.left, width - margin.right - 65]);
    var y = renderOptions.y = d3$1.scaleLinear().domain([topN, 0]).range([height - margin.bottom, margin.top]);
    var barPadding = renderOptions.barPadding = (height - (margin.bottom + margin.top)) / (topN * 5);
    var labelPadding = renderOptions.labelPadding = 8;

    renderOptions.barWidth = function (d) {
      return Math.abs(x(d.value) - x(0) - 1);
    };

    var barHeight = renderOptions.barHeight = y(1) - y(0) - barPadding;
    renderOptions.barHalfHeight = (y(1) - y(0)) / 2 + 1;

    renderOptions.barY = function (d) {
      return y(d.rank) + 5;
    };

    var iconSize = renderOptions.iconSize = showIcons ? barHeight * 0.9 : 0;
    var iconSpace = renderOptions.iconSpace = showIcons ? iconSize + labelPadding : 0;
    renderOptions.labelX = labelsPosition === 'inside' ? function (d) {
      return x(d.value) - labelPadding - iconSpace;
    } : margin.left - labelPadding;
    renderOptions.titlePadding = titlePadding;
    renderOptions.titleHeight = titleHeight;
    renderOptions.margin = margin;
  }

  function halo(text, renderOptions) {
    renderOptions.svg.selectAll('.halo').remove();
    text.select(function () {
      return this.parentNode.insertBefore(this.cloneNode(true), this);
    }).classed('halo', true);
  }
  function legendClick(d, store) {
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
  function highlightFn(d, store, renderOptions) {
    if (store.getState().options.highlightBars) {
      toggleClass(renderOptions.root, 'rect.' + safeName(d.name), 'highlight');
    }
  }
  function selectFn(d, store, renderOptions) {
    if (store.getState().options.selectBars) {
      toggleClass(renderOptions.root, 'rect.' + safeName(d.name), 'selected');
      store.dispatch(actions.data.toggleSelection(d.name));
    }
  }

  function renderHeader(store, renderOptions, CompleteDateSlice) {
    var groups = store.getState().data.groups;
    var dates = store.getState().ticker.dates;
    var currentDate = store.getState().ticker.currentDate;
    var _store$getState$optio = store.getState().options,
        title = _store$getState$optio.title,
        subTitle = _store$getState$optio.subTitle,
        marginTop = _store$getState$optio.marginTop,
        marginLeft = _store$getState$optio.marginLeft,
        showGroups = _store$getState$optio.showGroups;
    var svg = renderOptions.svg,
        margin = renderOptions.margin,
        width = renderOptions.width,
        titlePadding = renderOptions.titlePadding,
        titleHeight = renderOptions.titleHeight;
    renderOptions.titleText = svg.append('text').attr('class', 'title').attr('x', marginLeft + titlePadding).attr('y', marginTop + 24).html(getText(title, currentDate, CompleteDateSlice, dates));
    renderOptions.subTitleText = svg.append('text').attr('class', 'subTitle').attr('x', marginLeft + titlePadding).attr('y', marginTop + (titleHeight || 24)).html(getText(subTitle, currentDate, CompleteDateSlice, dates));

    if (showGroups) {
      var legendsWrapper = svg.append('g');
      var legends = legendsWrapper.selectAll('.legend-wrapper').data(groups).enter().append('g').attr('class', 'legend legend-wrapper').style('cursor', 'pointer').style('opacity', function (d) {
        return store.getState().data.groupFilter.includes(d) ? 0.3 : 1;
      }).on('click', function (d) {
        return legendClick(d, store);
      });
      legends.append('rect').attr('class', 'legend legend-color').attr('width', 10).attr('height', 10).attr('y', margin.top - 35).style('fill', function (d) {
        return getColor({
          group: d
        }, store);
      });
      legends.append('text').attr('class', 'legend legend-text').attr('x', 20).attr('y', margin.top - 25).html(function (d) {
        return d;
      });
      var legendX = margin.left + titlePadding;
      var legendY = 0;
      legends.each(function () {
        var wrapper = d3$1.select(this);
        var text = wrapper.select('text');
        var bbox = text.node().getBBox();

        if (legendX + bbox.width > width) {
          legendX = margin.left + titlePadding;
          legendY += 30;
        }

        wrapper.attr('transform', 'translate(' + legendX + ', ' + legendY + ')');
        legendX += bbox.width + 40;
      });
      margin.top += legendY;
    }
  }

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

  var buttons = {
    skipBack: "<svg viewBox=\"0 0 32 32\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" stroke=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M28.46,4a3,3,0,0,0-3,.07l-15.2,9.41A3,3,0,0,0,9,15V5A3,3,0,0,0,6,2H5A3,3,0,0,0,2,5V27a3,3,0,0,0,3,3H6a3,3,0,0,0,3-3V17a3,3,0,0,0,1.22,1.53L25.42,28a3,3,0,0,0,1.58.46,3,3,0,0,0,3-3V6.59A3,3,0,0,0,28.46,4Z\"/></g></svg>",
    play: "<svg viewBox=\"0 0 32 32\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" stroke=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M26.78,13.45,11.58,4A3,3,0,0,0,7,6.59V25.41a3,3,0,0,0,3,3A3,3,0,0,0,11.58,28l15.2-9.41a3,3,0,0,0,0-5.1Z\"/></g></svg>",
    pause: "<svg viewBox=\"0 0 32 32\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" stroke=\"currentColor\" xmlns:svg=\"http://www.w3.org/2000/svg\"><g transform=\"translate(-17)\"><path d=\"m 27,2 h -1 c -1.656854,0 -3,1.3431458 -3,3 v 12 c -0.04755,3.269656 0,6.666667 0,10 0,1.656854 1.343146,3 3,3 h 1 c 1.656854,0 3,-1.343146 3,-3 V 5 C 30,3.3431458 28.656854,2 27,2 Z\" /></g><g transform=\"translate(-4)\"><path d=\"m 27,2 h -1 c -1.656854,0 -3,1.3431458 -3,3 v 12 c -0.04755,3.269656 0,6.666667 0,10 0,1.656854 1.343146,3 3,3 h 1 c 1.656854,0 3,-1.343146 3,-3 V 5 C 30,3.3431458 28.656854,2 27,2 Z\" /></g></svg>",
    skipForward: "<svg viewBox=\"0 0 32 32\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" stroke=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M27,2H26a3,3,0,0,0-3,3V15a3,3,0,0,0-1.22-1.53L6.58,4A3,3,0,0,0,2,6.59V25.41a3,3,0,0,0,3,3A3,3,0,0,0,6.58,28l15.2-9.41A3,3,0,0,0,23,17V27a3,3,0,0,0,3,3h1a3,3,0,0,0,3-3V5A3,3,0,0,0,27,2Z\"/></g></svg>",
    overlayPlay: "<svg viewBox=\"0 0 32 32\" fill=\"currentColor\" stroke=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M26.78,13.45,11.58,4A3,3,0,0,0,7,6.59V25.41a3,3,0,0,0,3,3A3,3,0,0,0,11.58,28l15.2-9.41a3,3,0,0,0,0-5.1Z\"/></g></svg>",
    overlayRepeat: "<svg viewBox=\"0 0 32 32\" fill=\"currentColor\" stroke=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><g><path d=\"M18,4A12,12,0,0,0,6.05,15H3a1,1,0,0,0-.88.53,1,1,0,0,0,0,1l4,6a1,1,0,0,0,1.66,0l4-6a1,1,0,0,0,.05-1A1,1,0,0,0,11,15H8.05A10,10,0,1,1,18,26a1,1,0,0,0,0,2A12,12,0,0,0,18,4Z\"/></g></svg>"
  };

  function renderControls(store, renderOptions) {
    var _store$getState$optio = store.getState().options,
        marginTop = _store$getState$optio.marginTop,
        controlButtons = _store$getState$optio.controlButtons;
    var root = renderOptions.root,
        width = renderOptions.width,
        margin = renderOptions.margin,
        barPadding = renderOptions.barPadding;
    var elementWidth = root.getBoundingClientRect().width;
    var controlButtonIcons = [{
      skipBack: buttons.skipBack
    }, {
      play: buttons.play
    }, {
      pause: buttons.pause
    }, {
      skipForward: buttons.skipForward
    }];
    d3$1.select(root).append('div').classed('controls', true).style('position', 'absolute').style('top', marginTop + 'px').style('right', elementWidth - width + margin.right + barPadding + 'px').selectAll('div').data(controlButtonIcons).enter().append('div').html(function (d) {
      return Object.values(d)[0];
    }).attr('class', function (d) {
      return Object.keys(d)[0];
    });

    if (controlButtons === 'play') {
      hideElement(root, elements.skipBack);
      hideElement(root, elements.skipForward);
    }

    if (controlButtons === 'none') {
      hideElement(root, elements.controls);
    }
  }
  function updateControls(store, renderOptions) {
    var _store$getState$optio2 = store.getState().options,
        overlays = _store$getState$optio2.overlays,
        loop = _store$getState$optio2.loop;
    var root = renderOptions.root;

    if (store.getState().ticker.isRunning) {
      showElement(root, elements.pause);
      hideElement(root, elements.play);
    } else {
      showElement(root, elements.play);
      hideElement(root, elements.pause);
    }

    if (store.getState().ticker.isFirstDate && (overlays === 'all' || overlays === 'play') && !store.getState().ticker.isRunning) {
      hideElement(root, elements.controls, true);
      showElement(root, elements.overlay);
      showElement(root, elements.overlayPlay);
      hideElement(root, elements.overlayRepeat);
    } else if (store.getState().ticker.isLastDate && (overlays === 'all' || overlays === 'repeat') && !(loop && store.getState().ticker.isRunning)) {
      hideElement(root, elements.controls, true);
      showElement(root, elements.overlay);
      showElement(root, elements.overlayRepeat);
      hideElement(root, elements.overlayPlay);
    } else {
      showElement(root, elements.controls, true);
      hideElement(root, elements.overlay);
    }
  }
  function renderOverlays(store, renderOptions) {
    var _store$getState$optio3 = store.getState().options,
        minHeight = _store$getState$optio3.minHeight,
        minWidth = _store$getState$optio3.minWidth;
    var root = renderOptions.root;
    var overlayButtonIcons = [{
      overlayPlay: buttons.overlayPlay
    }, {
      overlayRepeat: buttons.overlayRepeat
    }];
    d3$1.select(root).append('div').classed('overlay', true).style('minHeight', minHeight + 'px').style('minWidth', minWidth + 'px').selectAll('div').data(overlayButtonIcons).enter().append('div').html(function (d) {
      return Object.values(d)[0];
    }).attr('class', function (d) {
      return Object.keys(d)[0];
    });
  }

  function renderInitalView(data, store, renderOptions) {
    var _store$getState$optio = store.getState().options,
        selector = _store$getState$optio.selector,
        caption = _store$getState$optio.caption,
        dateCounter = _store$getState$optio.dateCounter,
        labelsPosition = _store$getState$optio.labelsPosition,
        showIcons = _store$getState$optio.showIcons,
        fixedScale = _store$getState$optio.fixedScale,
        fixedOrder = _store$getState$optio.fixedOrder;
    var dates = store.getState().ticker.dates;
    var root = renderOptions.root = document.querySelector(selector);
    var topN = fixedOrder.length > 0 ? fixedOrder.length : store.getState().options.topN;
    var currentDate = store.getState().ticker.currentDate;
    var CompleteDateSlice = getDateSlice(currentDate, data, store);
    var dateSlice = CompleteDateSlice.slice(0, topN);
    var lastDateIndex = dates.indexOf(currentDate) > 0 ? dates.indexOf(currentDate) - 1 : 0;
    renderOptions.lastDate = dates[lastDateIndex];
    if (!root || dateSlice.length === 0) return;
    root.innerHTML = '';
    renderInitialFrame();
    renderControls(store, renderOptions);
    renderOverlays(store, renderOptions);
    updateControls(store, renderOptions);

    function renderInitialFrame() {
      renderOptions.maxValue = fixedScale ? data.map(function (d) {
        return d.value;
      }).reduce(function (max, val) {
        return max > val ? max : val;
      }, 0) : d3$1.max(dateSlice, function (d) {
        return d.value;
      });
      calculateDimensions(store, renderOptions);
      var margin = renderOptions.margin,
          width = renderOptions.width,
          height = renderOptions.height,
          x = renderOptions.x,
          y = renderOptions.y,
          barWidth = renderOptions.barWidth,
          barHeight = renderOptions.barHeight,
          barY = renderOptions.barY,
          barHalfHeight = renderOptions.barHalfHeight,
          labelX = renderOptions.labelX,
          iconSize = renderOptions.iconSize,
          labelPadding = renderOptions.labelPadding;
      var svg = renderOptions.svg = d3$1.select(root).append('svg').attr('width', width).attr('height', height);
      renderHeader(store, renderOptions, CompleteDateSlice);
      var xAxis = renderOptions.xAxis = d3$1.axisTop(x).ticks(width > 500 ? 5 : 2).tickSize(-(height - (margin.top + margin.bottom))).tickFormat(function (n) {
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
      }).on('click', function (d) {
        return selectFn(d, store, renderOptions);
      }).on('mouseover', function (d) {
        return highlightFn(d, store, renderOptions);
      }).on('mouseout', function (d) {
        return highlightFn(d, store, renderOptions);
      });
      svg.selectAll('text.label').data(dateSlice, function (d) {
        return d.name;
      }).enter().append('text').attr('class', 'label').classed('outside-bars', labelsPosition !== 'inside').attr('x', labelX).attr('y', function (d) {
        return barY(d) + barHalfHeight;
      }).style('text-anchor', 'end').html(function (d) {
        return d.name;
      }).on('click', function (d) {
        return selectFn(d, store, renderOptions);
      }).on('mouseover', function (d) {
        return highlightFn(d, store, renderOptions);
      }).on('mouseout', function (d) {
        return highlightFn(d, store, renderOptions);
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
        var defs = renderOptions.defs = svg.append('svg:defs');
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
      var endX = width - margin.right;
      var dateCounterTextY = caption ? endY - 30 : endY - 5;
      renderOptions.dateCounterText = svg.append('text').attr('class', 'dateCounterText').attr('x', endX).attr('y', dateCounterTextY).style('text-anchor', 'end').html(getText(dateCounter, currentDate, CompleteDateSlice, dates, true)).call(function (text) {
        return halo(text, renderOptions);
      });
      renderOptions.captionText = svg.append('text').attr('class', 'caption').attr('x', endX - 10).attr('y', endY - 5).style('text-anchor', 'end').html(getText(caption, currentDate, CompleteDateSlice, dates));
    }
  }

  function renderFrame(data, store, renderOptions) {
    var svg = renderOptions.svg,
        titleText = renderOptions.titleText,
        subTitleText = renderOptions.subTitleText,
        dateCounterText = renderOptions.dateCounterText,
        captionText = renderOptions.captionText,
        x = renderOptions.x,
        y = renderOptions.y,
        xAxis = renderOptions.xAxis,
        labelPadding = renderOptions.labelPadding,
        barWidth = renderOptions.barWidth,
        barHeight = renderOptions.barHeight,
        barHalfHeight = renderOptions.barHalfHeight,
        barY = renderOptions.barY,
        iconSize = renderOptions.iconSize,
        labelX = renderOptions.labelX,
        defs = renderOptions.defs,
        lastDate = renderOptions.lastDate;
    var dates = store.getState().ticker.dates;
    var showGroups = store.getState().options.showGroups;

    if (!x) {
      return;
    }

    var _store$getState$optio = store.getState().options,
        tickDuration = _store$getState$optio.tickDuration,
        title = _store$getState$optio.title,
        subTitle = _store$getState$optio.subTitle,
        caption = _store$getState$optio.caption,
        dateCounter = _store$getState$optio.dateCounter,
        marginBottom = _store$getState$optio.marginBottom,
        fixedScale = _store$getState$optio.fixedScale,
        fixedOrder = _store$getState$optio.fixedOrder,
        labelsPosition = _store$getState$optio.labelsPosition;
    var topN = fixedOrder.length > 0 ? fixedOrder.length : store.getState().options.topN;
    var currentDate = store.getState().ticker.currentDate;
    var CompleteDateSlice = getDateSlice(currentDate, data, store);
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
      return y(topN + 1) + marginBottom + 5;
    }).attr('height', barHeight).style('fill', function (d) {
      return getColor(d, store);
    }).on('click', function (d) {
      return selectFn(d, store, renderOptions);
    }).on('mouseover', function (d) {
      return highlightFn(d, store, renderOptions);
    }).on('mouseout', function (d) {
      return highlightFn(d, store, renderOptions);
    }).transition().duration(tickDuration).ease(d3$1.easeLinear).attr('y', barY);
    bars.transition().duration(tickDuration).ease(d3$1.easeLinear).attr('width', function (d) {
      return Math.abs(x(d.value) - x(0) - 1);
    }).attr('y', barY);
    bars.exit().transition().duration(tickDuration).ease(d3$1.easeLinear).attr('width', function (d) {
      return Math.abs(x(d.value) - x(0) - 1);
    }).attr('y', function () {
      return y(topN + 1) + marginBottom + 5;
    }).remove();
    var labels = svg.selectAll('.label').data(dateSlice, function (d) {
      return d.name;
    });
    labels.enter().append('text').attr('class', 'label').classed('outside-bars', labelsPosition !== 'inside').attr('x', labelX).attr('y', function () {
      return y(topN + 1) + marginBottom + 5 + barHalfHeight;
    }).style('text-anchor', 'end').html(function (d) {
      return d.name;
    }).on('click', function (d) {
      return selectFn(d, store, renderOptions);
    }).on('mouseover', function (d) {
      return highlightFn(d, store, renderOptions);
    }).on('mouseout', function (d) {
      return highlightFn(d, store, renderOptions);
    }).transition().duration(tickDuration).ease(d3$1.easeLinear).attr('y', function (d) {
      return barY(d) + barHalfHeight;
    });
    labels.transition().duration(tickDuration).ease(d3$1.easeLinear).attr('x', labelX).attr('y', function (d) {
      return barY(d) + barHalfHeight;
    });
    labels.exit().transition().duration(tickDuration).ease(d3$1.easeLinear).attr('x', labelX).attr('y', function () {
      return y(topN + 1) + marginBottom + 5;
    }).remove();
    var valueLabels = svg.selectAll('.valueLabel').data(dateSlice, function (d) {
      return d.name;
    });
    valueLabels.enter().append('text').attr('class', 'valueLabel').attr('x', function (d) {
      return x(d.value) + 5;
    }).attr('y', function () {
      return y(topN + 1) + marginBottom + 5;
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
      return y(topN + 1) + marginBottom + 5;
    }).remove();

    if (store.getState().options.showIcons) {
      var iconPatterns = defs.selectAll('.svgpattern').data(dateSlice, function (d) {
        return d.name;
      });
      iconPatterns.enter().append('svg:pattern').attr('class', 'svgpattern').attr('id', getIconID).attr('width', iconSize).attr('height', iconSize).append('svg:image').attr('xlink:href', function (d) {
        return d.icon;
      }).attr('width', iconSize).attr('height', iconSize).style('z-index', '99').attr('x', 0).attr('y', 0);
      iconPatterns.exit().transition().duration(tickDuration).ease(d3$1.easeLinear).remove();
      var icons = svg.selectAll('circle').data(dateSlice, function (d) {
        return d.name;
      });
      icons.enter().append('circle').attr('cx', function (d) {
        return x(d.value) - iconSize / 2 - labelPadding;
      }).attr('cy', function () {
        return y(topN + 1) + iconSize + barHalfHeight;
      }).attr('r', iconSize / 2).style('z-index', '99').style('fill', 'transparent').style('fill', function (d) {
        return "url(#" + getIconID(d) + ")";
      }).transition().duration(tickDuration).ease(d3$1.easeLinear).attr('cy', function (d) {
        return y(d.rank) + barHalfHeight;
      });
      icons.transition().duration(tickDuration).ease(d3$1.easeLinear).attr('cx', function (d) {
        return x(d.value) - iconSize / 2 - labelPadding;
      }).attr('cy', function (d) {
        return y(d.rank) + barHalfHeight;
      });
      icons.exit().transition().duration(tickDuration).ease(d3$1.easeLinear).attr('cx', function (d) {
        return x(d.value) - iconSize / 2 - labelPadding;
      }).attr('cy', function () {
        return y(topN + 1) + iconSize + barHalfHeight;
      }).remove();
    }

    titleText.html(getText(title, currentDate, CompleteDateSlice, dates));
    subTitleText.html(getText(subTitle, currentDate, CompleteDateSlice, dates));
    captionText.html(getText(caption, currentDate, CompleteDateSlice, dates));
    dateCounterText.html(getText(dateCounter, currentDate, CompleteDateSlice, dates, true)).call(function (text) {
      return halo(text, renderOptions);
    });
    updateControls(store, renderOptions);
    renderOptions.lastDate = currentDate;
  }

  function resize(data, store, renderOptions) {
    var _store$getState$optio = store.getState().options,
        inputHeight = _store$getState$optio.inputHeight,
        inputWidth = _store$getState$optio.inputWidth,
        minHeight = _store$getState$optio.minHeight,
        minWidth = _store$getState$optio.minWidth;
    var root = renderOptions.root;
    if (!root) return;

    if (!inputHeight && !inputWidth || String(inputHeight).startsWith('window') || String(inputWidth).startsWith('window')) {
      renderOptions.height = getHeight(root, minHeight, inputHeight);
      renderOptions.width = getWidth(root, minWidth, inputWidth);
      var currentPosition = root.style.position;
      renderInitalView(data, store, renderOptions);
      renderFrame(data, store, renderOptions);
      renderFrame(data, store, renderOptions);
      updateControls(store, renderOptions);
      root.style.position = currentPosition;
    }
  }

  function createRenderer(data, store) {
    var renderOptions = {};
    return {
      renderInitalView: function renderInitalView$1() {
        return renderInitalView(data, store, renderOptions);
      },
      renderFrame: function renderFrame$1() {
        return renderFrame(data, store, renderOptions);
      },
      resize: function resize$1() {
        return resize(data, store, renderOptions);
      }
    };
  }

  function rendererSubscriber(store, renderer) {
    return function () {
      if (store.getState().triggerRender) {
        renderer.renderFrame();
      }
    };
  }

  var styles = "\n__selector__ text {\n  font-size: 16px;\n  font-family: Open Sans, sans-serif;\n}\n\n__selector__ text.title {\n  font-size: 24px;\n  font-weight: 500;\n}\n\n__selector__ text.subTitle {\n  font-weight: 500;\n}\n\n__selector__ text.caption {\n  font-weight: 400;\n  font-size: 24px;\n}\n__selector__ text.legend-text {\n  user-select: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n}\n__selector__ text.label {\n  font-weight: 600;\n}\n\n__selector__ text.valueLabel {\n  font-weight: 300;\n}\n\n__selector__ text.dateCounterText {\n  font-size: 64px;\n  font-weight: 700;\n}\n\n__selector__ .xAxis .tick:nth-child(2) text {\n  text-anchor: start;\n}\n\n__selector__ .tick line {\n  shape-rendering: CrispEdges;\n}\n\n__selector__ path.domain {\n  display: none;\n}\n\n__selector__ {\n  position: relative;\n}\n\n__selector__ .controls {\n  /*  position is set dynamically in renderer.ts */\n  display: flex;\n}\n\n__selector__ .controls div,\n__selector__ .overlay div {\n  cursor: pointer;\n  font-size: 24px;\n  font-weight: 700;\n  width: 38px;\n  height: 38px;\n  -moz-border-radius: 5px;\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n  margin: 5px;\n  text-align: center;\n}\n\n__selector__ .controls svg {\n  margin: 5px auto;\n  width: 28px;\n  height: 28px;\n}\n\n__selector__ .overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n__selector__ .overlay div {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 200px;\n  height: 200px;\n  -moz-border-radius: 100px;\n  -webkit-border-radius: 100px;\n  border-radius: 100px;\n}\n__selector__ .overlay svg {\n  height: 50%;\n  width: 50%;\n}\n";
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
    style.id = generateId('styles');
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

    return style.id;
  }

  function registerEvents(store, ticker) {
    var root = document.querySelector(store.getState().options.selector);
    var events = [];
    register();
    return {
      reregister: reregister,
      unregister: unregister,
      addApiEventHandler: addApiEventHandler
    };

    function register() {
      registerControlButtonEvents();
      registerOverlayEvents();
      registerClickEvents();
      registerKeyboardEvents();
    }

    function reregister() {
      unregister(false);
      register();
    }

    function registerControlButtonEvents() {
      addEventHandler(root, elements.skipBack, 'click', function () {
        return ticker.skipBack();
      });
      addEventHandler(root, elements.play, 'click', function () {
        return ticker.start();
      });
      addEventHandler(root, elements.pause, 'click', function () {
        return ticker.stop();
      });
      addEventHandler(root, elements.skipForward, 'click', function () {
        return ticker.skipForward();
      });
    }

    function registerOverlayEvents() {
      addEventHandler(root, elements.overlayPlay, 'click', function () {
        hideElement(root, elements.overlay);
        ticker.start();
      });
      addEventHandler(root, elements.overlayRepeat, 'click', function () {
        hideElement(root, elements.overlay);
        ticker.skipBack();
        ticker.start();
      });
    }

    function registerClickEvents() {
      if (store.getState().options.mouseControls) {
        var svg = root.querySelector('svg');
        svg.addEventListener('click', function (clickEvent) {
          var target = clickEvent.target;
          if (!target || target.classList.contains('legend')) return;
          getClicks(clickEvent, function (event) {
            var clicks = event.detail;

            if (clicks === 3) {
              ticker.skipBack();
            } else if (clicks === 2) {
              ticker.skipForward();
            } else {
              ticker.toggle();
            }
          });
        });
      }
    }

    function registerKeyboardEvents() {
      if (store.getState().options.keyboardControls) {
        addEventHandler(document, '', 'keyup', handleKeyboardEvents);
      }
    }

    function handleKeyboardEvents(e) {
      var target = document.activeElement;
      if (target && ['input', 'textarea'].includes(target.tagName.toLowerCase())) return;
      var keys = {
        spacebar: ' ',
        A: 'a',
        S: 's',
        D: 'd'
      };

      switch (e.key) {
        case keys.spacebar:
          ticker.toggle();
          e.preventDefault();
          break;

        case keys.A:
          ticker.skipBack();
          break;

        case keys.S:
          ticker.toggle();
          break;

        case keys.D:
          ticker.skipForward();
          break;
      }
    }

    function unregister(removeUserDefined) {
      if (removeUserDefined === void 0) {
        removeUserDefined = true;
      }

      events.filter(function (event) {
        return removeUserDefined ? true : !event.userDefined;
      }).forEach(function (event) {
        event.element.removeEventListener(event.eventType, event.handler);
        events.splice(events.indexOf(event), 1);
      });
    }

    function addEventHandler(root, className, eventType, handler) {
      var element = getElement(root, className);

      if (element) {
        element.addEventListener(eventType, handler);
        events.push({
          element: element,
          userDefined: false,
          eventType: eventType,
          handler: handler
        });
      }
    }

    function addApiEventHandler(eventType, handler) {
      root.addEventListener(eventType, handler);
      events.push({
        element: root,
        userDefined: true,
        eventType: eventType,
        handler: handler
      });
    }
  }
  function getTickDetails(store) {
    var _store$getState = store.getState(),
        ticker = _store$getState.ticker,
        data = _store$getState.data;

    return {
      date: ticker.currentDate,
      isFirstDate: ticker.isFirstDate,
      isLastDate: ticker.isLastDate,
      isRunning: ticker.isRunning,
      allDates: data.datesCache
    };
  }

  function dispatchDOMEvent(store, eventType) {
    var element = document.querySelector(store.getState().options.selector);
    if (!element) return;
    element.dispatchEvent(new CustomEvent(eventType, {
      bubbles: true,
      detail: getTickDetails(store)
    }));
  }

  function DOMEventSubscriber(store) {
    var lastDate = '';
    var wasRunning;
    return function () {
      var currentDate = store.getState().ticker.currentDate;
      var isRunning = store.getState().ticker.isRunning;

      if (currentDate !== lastDate) {
        dispatchDOMEvent(store, 'dateChange');

        if (store.getState().ticker.isFirstDate) {
          dispatchDOMEvent(store, 'firstDate');
        }

        if (store.getState().ticker.isLastDate) {
          dispatchDOMEvent(store, 'lastDate');
        }

        lastDate = currentDate;
      }

      if (!wasRunning && isRunning) {
        dispatchDOMEvent(store, 'play');
      }

      if (wasRunning && !isRunning) {
        dispatchDOMEvent(store, 'pause');
      }

      wasRunning = isRunning;
    };
  }

  function race(data, options) {
    if (options === void 0) {
      options = {};
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('No valid data supplied.');
    }

    var store = createStore(rootReducer);
    store.dispatch(actions.options.loadOptions(options));
    var ticker = createTicker(store);
    var preparedData = prepareData(data, store);
    var renderer = createRenderer(preparedData, store);
    var _store$getState$optio = store.getState().options,
        selector = _store$getState$optio.selector,
        injectStyles = _store$getState$optio.injectStyles,
        theme = _store$getState$optio.theme,
        autorun = _store$getState$optio.autorun;
    var root = document.querySelector(selector);
    if (!root) throw new Error('No element found with the selector: ' + selector);
    var apiSubscriptions = [];
    subscribeToStore(store, renderer, preparedData);
    var stylesId;

    if (injectStyles) {
      stylesId = styleInject(selector, theme);
    }

    renderer.renderInitalView();
    ticker.start();

    if (!autorun) {
      ticker.stop();
    }

    var events = registerEvents(store, ticker);
    window.addEventListener('resize', resize);

    function subscribeToStore(store, renderer, data) {
      var subscriptions = [rendererSubscriber(store, renderer), computeNextDateSubscriber(data, store), DOMEventSubscriber(store)];
      [].concat(subscriptions, apiSubscriptions).forEach(function (subcsription) {
        store.subscribe(subcsription);
      });
    }

    function addApiSubscription(fn) {
      apiSubscriptions.push(fn);
      store.subscribe(fn);
    }

    function resize() {
      renderer.resize();
      events.reregister();
    }

    function destroyed() {
      throw new Error('Cannot perform this operation after calling destroy()');
    }

    var API = {
      play: function play() {
        if (!store.getState().ticker.isRunning) {
          ticker.start();
        }

        return this;
      },
      pause: function pause() {
        ticker.stop();
        return this;
      },
      toggle: function toggle() {
        ticker.toggle();
        return this;
      },
      skipBack: function skipBack() {
        ticker.skipBack();
        return this;
      },
      skipForward: function skipForward() {
        ticker.skipForward();
        return this;
      },
      inc: function inc(value) {
        if (value === void 0) {
          value = 1;
        }

        store.dispatch(actions.ticker.inc(+value));
        return this;
      },
      dec: function dec(value) {
        if (value === void 0) {
          value = 1;
        }

        store.dispatch(actions.ticker.dec(+value));
        return this;
      },
      setDate: function setDate(inputDate) {
        store.dispatch(actions.ticker.updateDate(getDateString(inputDate)));
        return this;
      },
      getDate: function getDate() {
        return store.getState().ticker.currentDate;
      },
      getAllDates: function getAllDates() {
        return [].concat(store.getState().ticker.dates);
      },
      isRunning: function isRunning() {
        return store.getState().ticker.isRunning;
      },
      select: function select(name) {
        d3$1.select(root).select('rect.' + safeName(name)).classed('selected', true);
        store.dispatch(actions.data.addSelection(name));
        return this;
      },
      unselect: function unselect(name) {
        d3$1.select(root).select('rect.' + safeName(name)).classed('selected', false);
        store.dispatch(actions.data.removeSelection(name));
        return this;
      },
      unselectAll: function unselectAll() {
        d3$1.select(root).selectAll('rect').classed('selected', false);
        store.dispatch(actions.data.resetSelections());
        return this;
      },
      hideGroup: function hideGroup(group) {
        store.dispatch(actions.data.addFilter(String(group)));
        return this;
      },
      showGroup: function showGroup(group) {
        store.dispatch(actions.data.removeFilter(String(group)));
        return this;
      },
      showOnlyGroup: function showOnlyGroup(group) {
        store.dispatch(actions.data.allExceptFilter(String(group)));
        return this;
      },
      showAllGroups: function showAllGroups() {
        store.dispatch(actions.data.resetFilters());
        return this;
      },
      changeOptions: function changeOptions(newOptions) {
        var unAllowedOptions = ['selector', 'dataShape'];
        unAllowedOptions.forEach(function (key) {
          if (newOptions[key] && newOptions[key] !== store.getState().options[key]) {
            throw new Error("The option \"" + key + "\" cannot be changed.");
          }
        });
        var dataOptions = ['dataTransform', 'fillDateGapsInterval', 'fillDateGapsValue', 'startDate', 'endDate', 'fixedOrder'];
        var dataOptionsChanged = false;
        dataOptions.forEach(function (key) {
          if (newOptions[key] && newOptions[key] !== store.getState().options[key]) {
            dataOptionsChanged = true;
          }
        });
        store.dispatch(actions.options.changeOptions(newOptions));
        var _store$getState$optio2 = store.getState().options,
            injectStyles = _store$getState$optio2.injectStyles,
            theme = _store$getState$optio2.theme,
            autorun = _store$getState$optio2.autorun;

        if (dataOptionsChanged) {
          store.unsubscribeAll();
          store.dispatch(actions.data.clearDateSlices());
          preparedData = prepareData(data, store, true);
          renderer = createRenderer(preparedData, store);
          subscribeToStore(store, renderer, preparedData);
        }

        if ('injectStyles' in newOptions || 'theme' in newOptions) {
          var _document$getElementB;

          (_document$getElementB = document.getElementById(stylesId)) == null ? void 0 : _document$getElementB.remove();

          if (injectStyles) {
            stylesId = styleInject(selector, theme);
          }
        }

        renderer.renderInitalView();
        events.reregister();

        if (autorun) {
          var _store$getState$ticke = store.getState().ticker,
              isFirstDate = _store$getState$ticke.isFirstDate,
              isRunning = _store$getState$ticke.isRunning;

          if (isFirstDate && !isRunning) {
            ticker.start();
          }
        }

        return this;
      },
      call: function call(fn) {
        fn.call(API, getTickDetails(store));
        return this;
      },
      delay: function delay(duration) {
        var _this2 = this;

        var _this = this;

        if (duration === void 0) {
          duration = 0;
        }

        var queue = [];
        var newQueue = [];
        var originalMethods = {};
        var destroyCalled = false;

        var _loop = function _loop() {
          var method = _Object$keys[_i];
          if (typeof _this2[method] !== 'function') return "continue";
          originalMethods[method] = _this2[method];

          _this2[method] = function () {
            addToQueue(originalMethods[method], [].slice.call(arguments));
            return _this;
          };
        };

        for (var _i = 0, _Object$keys = Object.keys(this); _i < _Object$keys.length; _i++) {
          var _ret = _loop();

          if (_ret === "continue") continue;
        }

        function addToQueue(fn, args) {
          if (!destroyCalled) {
            queue.push({
              fn: fn,
              args: args
            });
          } else {
            queue.push({
              fn: destroyed,
              args: []
            });
          }

          if (fn.name === 'destroy') {
            destroyCalled = true;
          }
        }

        function asValidNumber(duration) {
          return isNaN(Number(duration)) || Number(duration) < 0 ? 0 : Number(duration);
        }

        (function runQueue(dur) {
          var _this3 = this;

          setTimeout(function () {
            var queueItem = queue.shift();
            var newDuration = 0;

            while (queueItem) {
              if (queueItem.fn.name !== 'delay') {
                var _queueItem;

                (_queueItem = queueItem).fn.apply(_queueItem, queueItem.args);
              } else {
                newQueue = [].concat(queue);
                queue = [];
                newDuration = asValidNumber(queueItem.args[0]);
              }

              queueItem = queue.shift();
            }

            if (newQueue.length > 0) {
              queue = [].concat(newQueue);
              newQueue = [];
              runQueue(newDuration);
            } else {
              for (var _i2 = 0, _Object$keys2 = Object.keys(originalMethods); _i2 < _Object$keys2.length; _i2++) {
                var method = _Object$keys2[_i2];
                _this3[method] = originalMethods[method];
              }
            }
          }, dur);
        })(asValidNumber(duration));

        return this;
      },
      onDate: function onDate(date, fn) {
        var dateString = getDateString(date);
        var lastDate = '';
        addApiSubscription(function () {
          if (store.getState().ticker.currentDate === dateString && dateString !== lastDate) {
            lastDate = store.getState().ticker.currentDate;
            fn.call(API, getTickDetails(store));
          }

          lastDate = store.getState().ticker.currentDate;
        });
        return this;
      },
      on: function on(event, fn) {
        events.addApiEventHandler(event, function () {
          fn.call(API, getTickDetails(store));
        });
        return this;
      },
      destroy: function destroy() {
        var _document$getElementB2;

        ticker.stop();
        store.unsubscribeAll();
        events.unregister();
        window.removeEventListener('resize', resize);
        root.innerHTML = '';
        (_document$getElementB2 = document.getElementById(stylesId)) == null ? void 0 : _document$getElementB2.remove();

        for (var _i3 = 0, _Object$keys3 = Object.keys(this); _i3 < _Object$keys3.length; _i3++) {
          var method = _Object$keys3[_i3];
          this[method] = destroyed;
        }

        return this;
      }
    };
    return API;
  }

  var Props = /*#__PURE__*/function (_Options) {
    _inheritsLoose(Props, _Options);

    function Props() {
      return _Options.apply(this, arguments) || this;
    }

    return Props;
  }(Options);
  var defaultProps = _extends(_extends({}, defaultOptions), {}, {
    data: undefined,
    dataUrl: undefined,
    dataType: undefined,
    elementId: undefined,
    loadingContent: 'Loading...',
    callback: undefined
  });

  exports.Options = Options;
  exports.Props = Props;
  exports.d3 = d3;
  exports.defaultOptions = defaultOptions;
  exports.generateId = generateId;
  exports.loadData = loadData;
  exports.race = race;

})));
//# sourceMappingURL=racing-bars.umd.js.map
