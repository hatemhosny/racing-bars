import * as d3 from './d3';

import { icons } from './icons';
import { elements } from './elements';
import { Data, Renderer } from './models';
import { store } from './store';
import {
  getHeight,
  getWidth,
  getElement,
  hideElement,
  showElement,
  getText,
  getColor,
  getIconID,
} from './utils';
import { getDateSlice } from './data-utils';

export function createRenderer(data: Data[]): Renderer {
  let margin: { top: number; right: number; bottom: number; left: number };
  let svg: any;
  let x: d3.ScaleLinear<number, number>;
  let y: d3.ScaleLinear<number, number>;
  let xAxis: d3.Axis<number | { valueOf(): number }>;
  const titlePadding = 5;
  let barPadding: number;
  let labelPadding: number;
  let barWidth: (d: Data) => number;
  let barHeight: number;
  let barHalfHeight: number;
  let defs: any;
  let iconSize: number;
  let iconSpace: number;
  let titleText: any;
  let subTitleText: any;
  let captionText: any;
  let dateCounterText: any;
  let labelX: number | ((d: Data) => number);
  let barY: (d: Data) => number;
  let height: number;
  let width: number;
  let maxValue: number;

  const names = Array.from(new Set(data.map((d) => d.name))).sort() as string[];
  const groups = Array.from(new Set(data.map((d) => d.group)))
    .filter(Boolean)
    .sort() as string[];
  const showGroups = store.getState().options.showGroups;

  function renderInitalView() {
    const {
      selector,
      title,
      subTitle,
      caption,
      dateCounter,
      labelsOnBars,
      showIcons,
      labelsWidth,
      inputHeight,
      inputWidth,
      minHeight,
      minWidth,
      topN,
      colorSeed,
      colorMap,
      fixedScale,
    } = store.getState().options;

    const TotalDateSlice = getDateSlice(data, store.getState().ticker.currentDate);
    const dateSlice = TotalDateSlice.slice(0, store.getState().options.topN);
    const element = document.querySelector(selector) as HTMLElement;
    element.innerHTML = '';

    height = getHeight(element, minHeight, inputHeight);
    width = getWidth(element, minWidth, inputWidth);

    renderInitialFrame();
    renderControls();
    renderOverlays();
    updateControls();

    function renderInitialFrame() {
      const labelsArea = labelsOnBars ? 0 : labelsWidth;
      let groupsArea = showGroups ? 40 : 0;

      margin = {
        top: 80 + groupsArea,
        right: 0,
        bottom: 5,
        left: 0 + labelsArea,
      };

      svg = d3 //
        .select(selector)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      titleText = svg //
        .append('text')
        .attr('class', 'title')
        .attr('x', titlePadding)
        .attr('y', 24)
        .html(getText(title, TotalDateSlice));

      subTitleText = svg //
        .append('text')
        .attr('class', 'subTitle')
        .attr('x', titlePadding)
        .attr('y', 55)
        .html(getText(subTitle, TotalDateSlice));

      if (showGroups) {
        const legendsWrapper = svg.append('g');
        const legends = legendsWrapper
          .selectAll('.legend-wrapper')
          .data(groups)
          .enter()
          .append('g')
          .attr('class', 'legend-wrapper')
          .style('cursor', 'pointer');

        legends
          .append('rect')
          .attr('class', 'legend-color')
          .attr('width', 10)
          .attr('height', 10)
          .attr('y', 75)
          .style('fill', (d: string) =>
            getColor({ group: d } as Data, names, groups, showGroups, colorSeed, colorMap),
          );

        legends
          .append('text')
          .attr('class', 'legend-text')
          .attr('x', 20)
          .attr('y', 75 + 10)
          .html((d: string) => d);

        let legendX = margin.left;
        let legendY = 0;
        legends.each(function () {
          const wrapper = d3.select(this);
          const text = wrapper.select('text') as any;
          const bbox = text.node().getBBox();
          if (legendX + bbox.width > width) {
            legendX = margin.left;
            legendY += 30;
          }
          wrapper.attr('transform', 'translate(' + legendX + ', ' + legendY + ')');
          legendX += bbox.width + 40;
        });

        margin.top += legendY;
      }

      maxValue = fixedScale
        ? data.map((d) => d.value).reduce((max, val) => (max > val ? max : val), 0)
        : (d3.max(dateSlice, (d: Data) => d.value) as number);

      x = d3
        .scaleLinear()
        .domain([0, maxValue])
        .range([margin.left, width - margin.right - 65]);

      y = d3
        .scaleLinear()
        .domain([topN, 0])
        .range([height - margin.bottom, margin.top]);

      barPadding = (height - (margin.bottom + margin.top)) / (topN * 5);
      labelPadding = 8;
      barWidth = (d: Data) => Math.abs(x(d.value) - x(0) - 1);
      barHeight = y(1) - y(0) - barPadding;
      barHalfHeight = (y(1) - y(0)) / 2 + 1;
      barY = (d: Data) => y(d.rank as number) + 5;
      iconSize = showIcons ? barHeight * 0.9 : 0;
      iconSpace = showIcons ? iconSize + labelPadding : 0;
      labelX = labelsOnBars
        ? (d: Data) => x(d.value) - labelPadding - iconSpace
        : margin.left - labelPadding;

      xAxis = d3
        .axisTop(x)
        .ticks(width > 500 ? 5 : 2)
        .tickSize(-(height - (margin.top + margin.bottom)))
        .tickFormat((n: number | { valueOf(): number }) => d3.format(',')(n));

      svg
        .append('g')
        .attr('class', 'axis xAxis')
        .attr('transform', `translate(0, ${margin.top})`)
        .call(xAxis)
        .selectAll('.tick line')
        .classed('origin', (d: number) => d === 0);

      svg
        .selectAll('rect.bar')
        .data(dateSlice, (d: Data) => d.name)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', x(0) + 1)
        .attr('width', barWidth)
        .attr('y', barY)
        .attr('height', barHeight)
        .style('fill', (d: Data) => getColor(d, names, groups, showGroups, colorSeed, colorMap));

      svg
        .selectAll('text.label')
        .data(dateSlice, (d: Data) => d.name)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', labelX)
        .attr('y', (d: Data) => barY(d) + barHalfHeight)
        .style('text-anchor', 'end')
        .html((d: Data) => d.name);

      svg
        .selectAll('text.valueLabel')
        .data(dateSlice, (d: Data) => d.name)
        .enter()
        .append('text')
        .attr('class', 'valueLabel')
        .attr('x', (d: Data) => x(d.value) + 5)
        .attr('y', (d: Data) => barY(d) + barHalfHeight)
        .text((d: Data) => d3.format(',.0f')(d.lastValue as number));

      if (showIcons) {
        defs = svg.append('svg:defs');

        defs
          .selectAll('svg')
          .data(dateSlice, (d: Data) => d.name)
          .enter()
          .append('svg:pattern')
          .attr('class', 'svgpattern')
          .attr('id', getIconID)
          .attr('width', iconSize)
          .attr('height', iconSize)
          .append('svg:image')
          .attr('xlink:href', (d: Data) => d.icon)
          .attr('width', iconSize)
          .attr('height', iconSize)
          .attr('x', 0)
          .attr('y', 0);

        svg
          .selectAll('circle')
          .data(dateSlice, (d: Data) => d.name)
          .enter()
          .append('circle')
          .attr('cx', (d: Data) => x(d.value) - iconSize / 2 - labelPadding)
          .attr('cy', (d: Data) => y(d.rank as number) + barHalfHeight)
          .attr('r', iconSize / 2)
          .style('fill', 'transparent')
          .style('fill', (d: Data) => `url(#${getIconID(d)})`);
      }

      dateCounterText = svg
        .append('text')
        .attr('class', 'dateCounterText')
        .attr('x', width - margin.right - barPadding)
        .attr('y', height - 40)
        .style('text-anchor', 'end')
        .html(getText(dateCounter, TotalDateSlice, true))
        .call(halo);

      captionText = svg
        .append('text')
        .attr('class', 'caption')
        .attr('x', width - margin.right - barPadding - 10)
        .attr('y', height - margin.bottom - barPadding)
        .style('text-anchor', 'end')
        .html(getText(caption, TotalDateSlice));
    }

    function renderControls() {
      const controlIcons = [
        { skipBack: icons.skipBack },
        { play: icons.play },
        { pause: icons.pause },
        { skipForward: icons.skipForward },
      ];

      const elementWidth = element.getBoundingClientRect().width;

      d3.select(selector)
        .append('div')
        .classed('controls', true)
        .style('width', width)
        .style('right', elementWidth - width + margin.right + barPadding + 'px')
        .selectAll('div')
        .data(controlIcons)
        .enter()
        .append('div')
        .html((d) => Object.values(d)[0] as string)
        .attr('class', (d) => Object.keys(d)[0]);

      if (store.getState().options.showControls === 'play') {
        hideElement(elements.skipBack);
        hideElement(elements.skipForward);
      }
      if (store.getState().options.showControls === 'none') {
        hideElement(elements.controls);
      }
    }

    function renderOverlays() {
      const overlayIcons = [
        { overlayPlay: icons.overlayPlay },
        { overlayRepeat: icons.overlayRepeat },
      ];

      d3.select(selector)
        .append('div')
        .classed('overlay', true)
        .style('minHeight', minHeight + 'px')
        .style('minWidth', minWidth + 'px')
        .selectAll('div')
        .data(overlayIcons)
        .enter()
        .append('div')
        .html((d) => Object.values(d)[0] as string)
        .attr('class', (d) => Object.keys(d)[0]);
    }
  }

  function renderFrame() {
    if (!x) {
      return;
    }

    const {
      tickDuration,
      topN,
      title,
      subTitle,
      caption,
      dateCounter,
      showGroups,
      colorSeed,
      colorMap,
      fixedScale,
    } = store.getState().options;
    const TotalDateSlice = getDateSlice(data, store.getState().ticker.currentDate);
    const dateSlice = TotalDateSlice.slice(0, store.getState().options.topN);

    if (!fixedScale) {
      x.domain([0, d3.max(dateSlice, (d: Data) => d.value) as number]);

      svg //
        .select('.xAxis')
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .call(xAxis);
    }

    const bars = svg //
      .selectAll('.bar')
      .data(dateSlice, (d: Data) => d.name);

    bars
      .enter()
      .append('rect')
      .attr('class', (d: Data) => `bar ${d.name.replace(/\s/g, '_')}`)
      .attr('x', x(0) + 1)
      .attr('width', barWidth)
      .attr('y', () => y(topN + 1) + 5)
      .attr('height', barHeight)
      .style('fill', (d: Data) => getColor(d, names, groups, showGroups, colorSeed, colorMap))
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('y', barY);

    bars
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('width', (d: Data) => Math.abs(x(d.value) - x(0) - 1))
      .attr('y', barY);

    bars
      .exit()
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('width', (d: Data) => Math.abs(x(d.value) - x(0) - 1))
      .attr('y', () => y(topN + 1) + 5)
      .remove();

    const labels = svg //
      .selectAll('.label')
      .data(dateSlice, (d: Data) => d.name);

    labels
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', labelX)
      .attr('y', () => y(topN + 1) + 5 + barHalfHeight)
      .style('text-anchor', 'end')
      .html((d: Data) => d.name)
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('y', (d: Data) => barY(d) + barHalfHeight);

    labels
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('x', labelX)
      .attr('y', (d: Data) => barY(d) + barHalfHeight);

    labels
      .exit()
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('x', labelX)
      .attr('y', () => y(topN + 1) + 5)
      .remove();

    const valueLabels = svg //
      .selectAll('.valueLabel')
      .data(dateSlice, (d: Data) => d.name);

    valueLabels
      .enter()
      .append('text')
      .attr('class', 'valueLabel')
      .attr('x', (d: Data) => x(d.value) + 5)
      .attr('y', () => y(topN + 1) + 5)
      .text((d: Data) => d3.format(',.0f')(d.lastValue as number))
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('y', (d: Data) => barY(d) + barHalfHeight);

    valueLabels
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('x', (d: Data) => x(d.value) + 5)
      .attr('y', (d: Data) => barY(d) + barHalfHeight)
      .tween('text', function (d: Data) {
        const i = d3.interpolateRound(d.lastValue as number, d.value);
        return function (t: number) {
          this.textContent = d3.format(',')(i(t));
        };
      });

    valueLabels
      .exit()
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('x', (d: Data) => x(d.value) + 5)
      .attr('y', () => y(topN + 1) + 5)
      .remove();

    if (store.getState().options.showIcons) {
      const iconPatterns = defs.selectAll('.svgpattern').data(dateSlice, (d: Data) => d.name);

      iconPatterns
        .enter()
        .append('svg:pattern')
        .attr('class', 'svgpattern')
        .attr('id', getIconID)
        .attr('width', iconSize)
        .attr('height', iconSize)
        .append('svg:image')
        .attr('xlink:href', (d: Data) => d.icon)
        .attr('width', iconSize)
        .attr('height', iconSize)
        .style('z-index', '99')
        .attr('x', 0)
        .attr('y', 0);

      iconPatterns.exit().remove();

      const icons = svg //
        .selectAll('circle')
        .data(dateSlice, (d: Data) => d.name);

      icons
        .enter()
        .append('circle')
        .attr('cx', (d: Data) => x(d.value) - iconSize / 2 - labelPadding)
        .attr('cy', () => y(topN + 1) + iconSize + barHalfHeight)
        .attr('r', iconSize / 2)
        .style('z-index', '99')
        .style('fill', 'transparent')
        .style('fill', (d: Data) => `url(#${getIconID(d)})`)
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('cy', (d: Data) => y(d.rank as number) + barHalfHeight);

      icons
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('cx', (d: Data) => x(d.value) - iconSize / 2 - labelPadding)
        .attr('cy', (d: Data) => y(d.rank as number) + barHalfHeight);

      icons
        .exit()
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('cx', (d: Data) => x(d.value) - iconSize / 2 - labelPadding)
        .attr('cy', () => y(topN + 1) + iconSize + barHalfHeight)
        .remove();
    }

    titleText.html(getText(title, TotalDateSlice));
    subTitleText.html(getText(subTitle, TotalDateSlice));
    captionText.html(getText(caption, TotalDateSlice));
    dateCounterText.html(getText(dateCounter, TotalDateSlice, true)).call(halo);
    updateControls();
  }

  function resize() {
    if (
      (!store.getState().options.inputHeight && !store.getState().options.inputWidth) ||
      String(store.getState().options.inputHeight).startsWith('window') ||
      String(store.getState().options.inputWidth).startsWith('window')
    ) {
      const element = document.querySelector(store.getState().options.selector) as HTMLElement;

      height = getHeight(
        element,
        store.getState().options.minHeight,
        store.getState().options.inputHeight,
      );
      width = getWidth(
        element,
        store.getState().options.minWidth,
        store.getState().options.inputWidth,
      );

      const currentPosition = element.style.position; // "fixed" if scrolling
      renderInitalView();
      renderFrame();
      updateControls();
      element.style.position = currentPosition;
    }
  }

  function updateControls() {
    const showOverlays = store.getState().options.showOverlays;

    if (store.getState().ticker.isRunning) {
      showElement(elements.pause);
      hideElement(elements.play);
    } else {
      showElement(elements.play);
      hideElement(elements.pause);
    }

    if (
      store.getState().ticker.isFirstDate &&
      (showOverlays === 'all' || showOverlays === 'play') &&
      !store.getState().ticker.isRunning
    ) {
      getElement(elements.controls).style.visibility = 'hidden';
      showElement(elements.overlay);
      showElement(elements.overlayPlay);
      hideElement(elements.overlayRepeat);
    } else if (
      store.getState().ticker.isLastDate &&
      (showOverlays === 'all' || showOverlays === 'repeat') &&
      !(store.getState().options.loop && store.getState().ticker.isRunning)
    ) {
      getElement(elements.controls).style.visibility = 'hidden';
      showElement(elements.overlay);
      showElement(elements.overlayRepeat);
      hideElement(elements.overlayPlay);
    } else {
      getElement(elements.controls).style.visibility = 'unset';
      getElement(elements.overlay).style.display = 'none';
    }
  }

  function halo(text: any) {
    svg //
      .selectAll('.halo')
      .remove();

    text
      .select(function () {
        return this.parentNode.insertBefore(this.cloneNode(true), this);
      })
      .classed('halo', true);
  }

  return {
    renderInitalView,
    renderFrame,
    resize,
  };
}
