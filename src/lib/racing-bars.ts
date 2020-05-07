import { Data } from './models/data.model';
import { Options } from './models/options.model';

// TODO import and treeshake
declare var d3: any;

export function race(data: Data[], options: Options = {}) {
  const dataShape = options.dataShape || "";
  const fillDateGaps = options.fillDateGaps; // [false, "years", "months", "days"]
  // const fillDateGapsValue = options.fillDateGapsValue || "last"; // ["last", "zero"]
  const selector = options.selector || "#race";
  const title = options.title || "18 years of Top Global Brands";
  const subTitle = options.subTitle || "Brand value, $m";
  const dateCounterFormat = options.dateCounterFormat || "YYYY";
  const startDate = options.startDate ? getDateString(options.startDate) : "";
  const endDate = options.endDate ? getDateString(options.endDate) : "";
  const loop = options.loop;
  const caption = options.caption || "Source: Interbrand";
  const labelsOnBars = options.labelsOnBars !== false;
  const labelsWidth = options.labelsWidth || 100;
  const colorSeed = options.colorSeed || "";
  const disableGroupColors = options.disableGroupColors;
  const tickDuration = +options.tickDuration || 500;
  const topN = +options.top_n || 10;
  const inputHeight = options.height;
  const inputWidth = options.width;
  const disableClickEvents = options.disableClickEvents || true;
  const disableKeyboardEvents = options.disableKeyboardEvents;
  const showControls = options.showControls || "all"; // ["all", "play", "none"]
  const autorun = options.autorun !== false;

  let margin: any;
  let svg: any;
  let x: any;
  let y: any;
  let xAxis: any;
  let barPadding: any;
  let dateCounterText: any;
  let labelX: number | ((d: Data) => number);
  let lastValues: any;
  let running: boolean;
  let ticker: any;
  const element = document.querySelector(selector) as HTMLElement;
  const minHeight = 300;
  const minWidth = 500;
  let height = getHeight(inputHeight);
  let width = getWidth(inputWidth);

  data = filterDates(data, startDate, endDate);
  data = prepareData(data, dataShape);

  if (fillDateGaps) {
    data = fillGaps(data, getDates(data), fillDateGaps);
  }

  const tickerDate = tickerDateFactory(getDates(data));

  let initialView = true;
  let dateSlice: Data[];
  initialize();

  renderInitalView();
  initialView = false;
  renderFrame();

  startTicker();

  if (!autorun) {
    stopTicker();
  }

  if (!disableClickEvents) {registerClickEvents();}
  if (!disableKeyboardEvents) {registerKeyboardEvents();}

  window.addEventListener("resize", resize);

  function prepareData(data: Data[], dataShape = "") {
    if (dataShape === "wide") {
      data = wideDataToLong(data);
    }
    return data.map((item) => {
      const d = { ...item };
      d.value = isNaN(+d.value) ? 0 : +d.value;
      d.date = getDateString(d.date);
      d.color = getColor(d);
      return d;
    });
  }

  function wideDataToLong(wide: any) {
    const long = [] as Data[];
    wide.forEach((item: any) => {
      for (const [key, value] of Object.entries(item)) {
        long.push({
          date: item.date,
          name: key,
          value: Number(value),
        });
      }
    });
    return long;
  }

  function getDates(data: Data[]) {
    const uniqueDates = new Set<string>();
    data.forEach((d) => {
      uniqueDates.add(d.date);
    });
    return Array.from(uniqueDates).sort();
  }

  function filterDates(data: Data[], startDate: string, endDate: string) {
    return data
      .filter((d) => (startDate ? d.date >= startDate : true))
      .filter((d) => (endDate ? d.date <= endDate : true));
  }

  function fillGaps(data: Data[], dates: string[], period: "years" | "months" | "days") {

    const minDate = new Date(formatDate(dates[0], "YYYY-MM-DD"));
    const maxDate = new Date(formatDate(dates[dates.length - 1], "YYYY-MM-DD"));

    const next = {
      years: (dt: Date) => { dt.setFullYear(dt.getFullYear() + 1); },
      months: (dt: Date) => { dt.setMonth(dt.getMonth() + 1); },
      days: (dt: Date) => { dt.setDate(dt.getDate() + 1); },
    };
    if (!next[period]) {return data;}

    const dateRange: string[] = [];
    for (const date = minDate; date < maxDate; next[period](date)) {
      dateRange.push(getDateString(date));
    }

    dateRange.forEach((date, index) => {
      if (data.filter((d) => d.date === date).length > 0) { return; }

      const missing = data
      .filter((d) => d.date === dateRange[index - 1])
      .map((d) => {
        // const value = {
        //   last: d.value,
        //   zero: 0,
        // }
        return {
          ...d,
          date,
          // value: value[fillDateGapsValue],
        }
      });

      data.push(...missing);
    })

    return data;
  }

  function tickerDateFactory(dates: string[]) {
    let dateCounter = 0;
    let currentDate: string;
    const lastIndex = dates.length - 1;
    const maxDate = dates[lastIndex];

    function updateDate() {
      currentDate = dates[dateCounter];
      dateSlice = getDateSlice(data, tickerDate.getDate(), topN, initialView);
      if (!initialView) { renderFrame(); }
      element.dispatchEvent(
        new CustomEvent("dateChanged", {
          detail: { date: formatDate(currentDate, "YYYY-MM-DD") },
        })
      );
    }

    return {
      inc: (value = 1) => {
        const newValue = dateCounter + value;
        dateCounter = newValue > lastIndex ? lastIndex : newValue;
        updateDate();
      },
      dec: (value = 1) => {
        const newValue = dateCounter - value;
        dateCounter = newValue < 0 ? 0 : newValue;
        updateDate();
      },
      setFirst: () => {
        dateCounter = 0;
        updateDate();
      },
      setLast: () => {
        dateCounter = dates.length - 1;
        updateDate();
      },
      update: () => {
        updateDate();
      },
      set: (date: string) => {
        const dateIndex = dates.indexOf(date);
        if (dateIndex > -1) {
          dateCounter = dateIndex;
          updateDate();
        }
      },
      getDate: () => currentDate,
      isLast: () => currentDate === maxDate,
      getDates: () => [...dates],
    };
  }

  function getDateSlice(data: Data[], date: string, topN: number, initialView = false) {
    const dateSlice = data
      .filter((d) => d.date === date && !isNaN(d.value))
      .map((d) => {
        if (initialView) { return d; }

        const lastValue = lastValues[d.name].value;
        lastValues[d.name].date = d.date;
        lastValues[d.name].value = d.value;
        return { ...d, lastValue };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, topN);
    dateSlice.forEach((d, i) => (d.rank = i));

    return dateSlice;
  }

  function initialize() {
    tickerDate.setFirst();
    initializeLastValues();

    function initializeLastValues() {
      lastValues = {};
      data.forEach((d) => {
        d.lastValue = d.value;
        if (!lastValues[d.name] || d.date < lastValues[d.name].date) {
          lastValues[d.name] = {
            date: d.date,
            value: d.value,
          };
        }
      });
    }
  }

  function startTicker() {
    setRunning(true);
    ticker = d3.interval(showRace, tickDuration);

    function showRace(_: Event) {
      if (tickerDate.isLast()) {
        renderFrame();
        if (loop) {
          loopTicker();
        } else {
          stopTicker();
        }
      } else {
        tickerDate.inc();
      }
    }
  }

  function stopTicker() {
    ticker.stop();
    setRunning(false);
  }

  function rewindTicker() {
    stopTicker();
    tickerDate.setFirst();
    renderFrame();
  }

  function loopTicker() {
    tickerDate.setFirst();
    renderFrame();
  }

  function fastForwardTicker() {
    stopTicker();
    tickerDate.setLast();
    renderFrame();
  }

  function toggle() {
    if (tickerDate.isLast()) {
      rewindTicker();
      startTicker();
    } else if (running) {
      stopTicker();
    } else {
      startTicker();
    }
  }

  function setRunning(flag = true) {
    const playButton = document.querySelector(selector + " .play") as HTMLElement;
    const pauseButton = document.querySelector(selector + " .pause") as HTMLElement;
    if (flag) {
      running = true;
      playButton.style.display = "none";
      pauseButton.style.display = "unset";
    } else {
      running = false;
      playButton.style.display = "unset";
      pauseButton.style.display = "none";
    }
  }

  function getDateString(inputDate: string | Date) {
    const date = new Date(inputDate);
    if (isNaN(+date)) { throw new Error(`"${inputDate}" is not a valid date`); }

    const year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = zeroPad(month, 2);

    let day = date.getDate().toString();
    day = zeroPad(day, 2);

    return `${year}${month}${day}`;
  }

  function formatDate(dateStr: string, format = dateCounterFormat) {
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    const date = new Date(`${year}-${month}-${day}`);
    const weekDayIndex = date.getDay();
    const monthNames: any = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      "10": "Oct",
      "11": "Nov",
      "12": "Dec",
    };

    const weekDays: any = {
      "0": "Sun",
      "1": "Mon",
      "2": "Tue",
      "3": "Wed",
      "4": "Thu",
      "5": "Fri",
      "6": "Sat",
    };

    return format
      .replace("MMM", monthNames[month])
      .replace("DDD", weekDays[weekDayIndex])
      .replace("YYYY", year)
      .replace("MM", month)
      .replace("DD", day);
  }

  function getColor(d: Data) {
    const nameseed = d.group && !disableGroupColors ? d.group : d.name;
    const seed = nameseed + colorSeed;
    return d3.hsl(random(seed) * 360, 0.75, 0.75);
  }

  function zeroPad(n: string, w: number) {
    while (n.toString().length < w) { n = "0" + n; }
    return n;
  }

  function random(seedStr: string) {
    function toNumbers(s: string) {
      let nums = "";
      for (let i = 0; i < s.length; i++) {
        nums += zeroPad(String(s.charCodeAt(i)), 3);
      }
      return nums;
    }

    const seed = toNumbers(seedStr);
    const x = Math.sin(+seed) * 10000;
    return x - Math.floor(x);
  }

  function getHeight(height: string) {
    let newHeight;
    if (!height) {
      newHeight = element.getBoundingClientRect().height;
    } else if (String(height).startsWith("window")) {
      const scale = +height.split("*")[1] || 1;
      newHeight = window.innerHeight * scale;
    } else {
      newHeight = +height;
    }
    return newHeight > minHeight ? newHeight : minHeight;
  }

  function getWidth(width: string) {
    let newWidth;
    if (!width) {
      newWidth = element.getBoundingClientRect().width;
    } else if (String(width).startsWith("window")) {
      const scale = +width.split("*")[1] || 1;
      newWidth = window.innerWidth * scale;
    } else {
      newWidth = +width;
    }
    return newWidth > minWidth ? newWidth : minWidth;
  }

  function renderInitalView() {
    renderInitialFrame();
    renderControls();
    setRunning(false);

    function renderInitialFrame() {
      svg = d3
        .select(selector)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      const labelsArea = labelsOnBars ? 0 : labelsWidth;

      margin = {
        top: 80,
        right: 0,
        bottom: 5,
        left: 0 + labelsArea,
      };

      barPadding = (height - (margin.bottom + margin.top)) / (topN * 5);

      svg.append("text").attr("class", "title").attr("y", 24).html(title);

      svg.append("text").attr("class", "subTitle").attr("y", 55).html(subTitle);

      x = d3
        .scaleLinear()
        .domain([0, d3.max(dateSlice, (d: Data) => d.value)])
        .range([margin.left, width - margin.right - 65]);

      y = d3
        .scaleLinear()
        .domain([topN, 0])
        .range([height - margin.bottom, margin.top]);

      xAxis = d3
        .axisTop()
        .scale(x)
        .ticks(width > 500 ? 5 : 2)
        .tickSize(-(height - margin.top - margin.bottom))
        .tickFormat((d: Data) => d3.format(",")(d));

      svg
        .append("g")
        .attr("class", "axis xAxis")
        .attr("transform", `translate(0, ${margin.top})`)
        .call(xAxis)
        .selectAll(".tick line")
        .classed("origin", (d: number) => d === 0);

      svg
        .selectAll("rect.bar")
        .data(dateSlice, (d: Data) => d.name)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", x(0) + 1)
        .attr("width", (d: Data) => Math.abs(x(d.value) - x(0) - 1))
        .attr("y", (d: Data) => y(d.rank) + 5)
        .attr("height", y(1) - y(0) - barPadding)
        .style("fill", (d: Data) => d.color);

      labelX = labelsOnBars ? (d: Data) => x(d.value) - 8 : margin.left - 8;

      svg
        .selectAll("text.label")
        .data(dateSlice, (d: Data) => d.name)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", labelX)
        .attr("y", (d: Data) => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1)
        .style("text-anchor", "end")
        .html((d: Data) => d.name);
      svg
        .selectAll("text.valueLabel")
        .data(dateSlice, (d: Data) => d.name)
        .enter()
        .append("text")
        .attr("class", "valueLabel")
        .attr("x", (d: Data) => x(d.value) + 5)
        .attr("y", (d: Data) => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1)
        .text((d: Data) => d3.format(",.0f")(d.lastValue));

      const strokeWidth = 10;
      dateCounterText = svg
        .append("text")
        .attr("class", "dateCounterText")
        .attr("x", width - margin.right - barPadding)
        .attr("y", height - 40)
        .style("text-anchor", "end")
        .html(formatDate(tickerDate.getDate(), dateCounterFormat))
        .call(halo, strokeWidth);

      svg
        .append("text")
        .attr("class", "caption")
        .attr("x", width - margin.right - barPadding - strokeWidth)
        .attr("y", height - margin.bottom - barPadding)
        .style("text-anchor", "end")
        .html(caption);

      function halo(text: any, strokeWidth: number) {
        text
          .select(function () {
            return this.parentNode.insertBefore(this.cloneNode(true), this);
          })
          .style("fill", "#ffffff")
          .style("stroke", "#ffffff")
          .style("stroke-width", strokeWidth)
          .style("stroke-linejoin", "round")
          .style("opacity", 1);
      }
    }

    function renderControls() {
      element.style.position = "relative";

      const controls = addElement("div", "controls", "", element);
      controls.style.position = "absolute";
      controls.style.top = "0";
      controls.style.right = margin.right + barPadding + "px";

      const rewindButton = addElement("span", "rewind", "⏮︎", controls);
      rewindButton.addEventListener("click", rewindTicker);

      const playButton = addElement("span", "play", "⏵︎", controls);
      playButton.addEventListener("click", toggle);

      const pauseButton = addElement("span", "pause", "⏸︎", controls);
      pauseButton.addEventListener("click", toggle);

      const fastforwardButton = addElement("span", "fastforward", "⏭︎", controls);
      fastforwardButton.addEventListener("click", fastForwardTicker);

      switch (showControls) {
        case "play":
          rewindButton.style.visibility = "hidden";
          fastforwardButton.style.visibility = "hidden";
          break;
        case "none":
          controls.style.display = "none";
          break;
      }

      function addElement(tag: string, className: string, html: string, parent: HTMLElement) {
        const domElement = document.createElement(tag);
        domElement.classList.add(className);
        domElement.innerHTML = html;
        parent.appendChild(domElement);
        return domElement;
      }
    }
  }

  function renderFrame() {
    x.domain([0, d3.max(dateSlice, (d: Data) => d.value)]);

    svg
      .select(".xAxis")
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .call(xAxis);

    const bars = svg.selectAll(".bar").data(dateSlice, (d: Data) => d.name);

    bars
      .enter()
      .append("rect")
      .attr("class", (d: Data) => `bar ${d.name.replace(/\s/g, "_")}`)
      .attr("x", x(0) + 1)
      .attr("width", (d: Data) => Math.abs(x(d.value) - x(0) - 1))
      .attr("y", () => y(topN + 1) + 5)
      .attr("height", y(1) - y(0) - barPadding)
      .style("fill", (d: Data) => d.color)
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr("y", (d: Data) => y(d.rank) + 5);

    bars
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr("width", (d: Data) => Math.abs(x(d.value) - x(0) - 1))
      .attr("y", (d: Data) => y(d.rank) + 5);

    bars
      .exit()
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr("width", (d: Data) => Math.abs(x(d.value) - x(0) - 1))
      .attr("y", () => y(topN + 1) + 5)
      .remove();

    const labels = svg.selectAll(".label").data(dateSlice, (d: Data) => d.name);

    labels
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", labelX)
      .attr("y", () => y(topN + 1) + 5 + (y(1) - y(0)) / 2)
      .style("text-anchor", "end")
      .html((d: Data) => d.name)
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr("y", (d: Data) => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1);

    labels
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr("x", labelX)
      .attr("y", (d: Data) => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1);

    labels
      .exit()
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr("x", labelX)
      .attr("y", () => y(topN + 1) + 5)
      .remove();

    const valueLabels = svg
      .selectAll(".valueLabel")
      .data(dateSlice, (d: Data) => d.name);

    valueLabels
      .enter()
      .append("text")
      .attr("class", "valueLabel")
      .attr("x", (d: Data) => x(d.value) + 5)
      .attr("y", () => y(topN + 1) + 5)
      .text((d: Data) => d3.format(",.0f")(d.lastValue))
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr("y", (d: Data) => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1);

    valueLabels
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr("x", (d: Data) => x(d.value) + 5)
      .attr("y", (d: Data) => y(d.rank) + 5 + (y(1) - y(0)) / 2 + 1)
      .tween("text", function (d: Data) {
        const i = d3.interpolateRound(d.lastValue, d.value);
        return function (t: any) {
          this.textContent = d3.format(",")(i(t));
        };
      });

    valueLabels
      .exit()
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr("x", (d: Data) => x(d.value) + 5)
      .attr("y", () => y(topN + 1) + 5)
      .remove();

    dateCounterText.html(formatDate(tickerDate.getDate(), dateCounterFormat));
  }

  function resize() {
    if (
      (!options.height && !options.width) ||
      String(options.height).startsWith("window") ||
      String(options.width).startsWith("window")
    ) {
      height = getHeight(options.height);
      width = getWidth(options.width);

      const currentlyRunning = running;
      const currentPosition = element.style.position; // "fixed" if scrolling

      stopTicker();
      element.innerHTML = "";
      tickerDate.update();
      renderInitalView();

      if (currentlyRunning) {
        startTicker();
      }
      element.style.position = currentPosition;
    }
  }

  function createScroller() {
    prepareDOM();

    const dates = tickerDate.getDates();
    const step = document.body.clientHeight / dates.length;

    subscribeToEvents();

    function prepareDOM() {
      element.style.position = "fixed";
      element.style.top = "0";

      const scrollElement = document.createElement("div");
      scrollElement.style.height = window.innerHeight * 10 + "px";
      document.body.appendChild(scrollElement);
    }

    function subscribeToEvents() {
      window.addEventListener("scroll", goToDate);
      // element.addEventListener("dateChanged", scrollToPosition);
    }

    // function scrollToPosition(e: CustomEvent) {
    //   let currentDate = getDateString(e.detail.date);
    //   let index = dates.indexOf(currentDate);
    //   ignoreNextScrollEvent = true;
    //   window.scroll({
    //     top: index * step,
    //     behavior: "smooth",
    //   });
    // }

    function goToDate() {
      const index = Math.ceil(window.pageYOffset / step);
      if (index < dates.length) {
        tickerDate.set(dates[index]);
      } else {
        tickerDate.setLast();
      }
    }
  }

  function registerClickEvents() {
    const svg = element.querySelector("svg") as SVGSVGElement;
    svg.addEventListener("click", toggle);

    element.addEventListener("dblclick", fastForwardTicker);
  }

  function registerKeyboardEvents() {
    document.addEventListener("keypress", function (e) {
      const keyCodes = {
        spacebar: 32,
        a: 97,
        d: 100,
        s: 115,
      };

      // TODO: keyCode is deprecated
      switch (e.keyCode) {
        case keyCodes.spacebar:
          toggle();
          break;
        case keyCodes.a:
          rewindTicker();
          break;
        case keyCodes.s:
          toggle();
          break;
        case keyCodes.d:
          fastForwardTicker();
          break;
      }
    });
  }

  return {
    // TODO: validate user input
    start: () => {
      if (!running) { startTicker(); }
    },
    stop: () => {
      stopTicker();
    },
    rewind: () => {
      rewindTicker();
    },
    fastforward: () => {
      fastForwardTicker();
    },
    loop: () => {
      loopTicker();
    },
    inc: (value = 1) => {
      tickerDate.inc(value);
    },
    dec: (value = 1) => {
      tickerDate.dec(value);
    },
    getCurrentDate: () => {
      return tickerDate.getDate();
    },
    getDates: () =>
      tickerDate.getDates().map((date) => formatDate(date, "YYYY-MM-DD")),
    setDate: (inputDate: string | Date) => {
      tickerDate.set(getDateString(inputDate));
    },
    createScroller: () => {
      createScroller();
    },
  };
}

export function loadData(URL: URL, type = "json") {
  switch (type) {
    case "json":
      return d3.json(URL);
    case "csv":
      return d3.csv(URL);
    case "tsv":
      return d3.tsv(URL);
    default:
      throw new Error(`Unsupported data type: ${type}`);
  }
}
