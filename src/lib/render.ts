import * as d3 from 'd3';

import { Data, Options } from './models';
import { formatDate } from './dates';
import { getHeight, getWidth } from './utils';

export function createRenderer() {
  let margin: any;
  let svg: any;
  let x: d3.ScaleLinear<number, number>;
  let y: d3.ScaleLinear<number, number>;
  let xAxis: any;
  let barPadding: any;
  let dateCounterText: any;
  let labelX: number | ((d: Data) => number);
  let height: number;
  let width: number;

  function renderInitalView(
    selector: string,
    dateSlice: Data[],
    renderOptions: any,
    getDateFn: () => string,
    controlFns: any,
    setRunningFn: (flag: boolean) => void
  ) {
    const {
      inputHeight,
      inputWidth,
      minHeight,
      minWidth,
      labelsOnBars,
      labelsWidth,
      topN,
      title,
      subTitle,
      caption,
      dateCounterFormat,
      showControls
    } = renderOptions;

    const element = document.querySelector(selector) as HTMLElement;

    height = getHeight(element, minHeight, inputHeight);
    width = getWidth(element, minWidth, inputWidth);

    renderInitialFrame();
    renderControls(element, showControls, controlFns);
    setRunningFn(false);

    function renderInitialFrame() {
      svg = d3
        .select(selector)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      const labelsArea = labelsOnBars ? 0 : labelsWidth;

      margin = {
        top: 80,
        right: 0,
        bottom: 5,
        left: 0 + labelsArea
      };

      barPadding = (height - (margin.bottom + margin.top)) / (topN * 5);

      svg
        .append('text')
        .attr('class', 'title')
        .attr('y', 24)
        .html(title);

      svg
        .append('text')
        .attr('class', 'subTitle')
        .attr('y', 55)
        .html(subTitle);

      x = d3
        .scaleLinear()
        .domain([0, d3.max(dateSlice, (d: Data) => d.value) as number])
        .range([margin.left, width - margin.right - 65]);

      y = d3
        .scaleLinear()
        .domain([topN, 0])
        .range([height - margin.bottom, margin.top]);

      xAxis = d3
        .axisTop(x)
        // .scale()
        .ticks(width > 500 ? 5 : 2)
        .tickSize(-(height - margin.top - margin.bottom))
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
        .attr('width', (d: Data) => Math.abs(x(d.value) - x(0) - 1))
        .attr('y', (d: any) => y(d.rank) + 5)
        .attr('height', y(1) - y(0) - barPadding)
        .style('fill', (d: Data) => d.color);

      labelX = labelsOnBars ? (d: Data) => x(d.value) - 8 : margin.left - 8;

      svg
        .selectAll('text.label')
        .data(dateSlice, (d: Data) => d.name)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', labelX)
        .attr('y', (d: Data) => y(d.rank as number) + 5 + (y(1) - y(0)) / 2 + 1)
        .style('text-anchor', 'end')
        .html((d: Data) => d.name);
      svg
        .selectAll('text.valueLabel')
        .data(dateSlice, (d: Data) => d.name)
        .enter()
        .append('text')
        .attr('class', 'valueLabel')
        .attr('x', (d: Data) => x(d.value) + 5)
        .attr('y', (d: Data) => y(d.rank as number) + 5 + (y(1) - y(0)) / 2 + 1)
        .text((d: Data) => d3.format(',.0f')(d.lastValue as number));

      const strokeWidth = 10;
      dateCounterText = svg
        .append('text')
        .attr('class', 'dateCounterText')
        .attr('x', width - margin.right - barPadding)
        .attr('y', height - 40)
        .style('text-anchor', 'end')
        .html(formatDate(getDateFn(), dateCounterFormat))
        .call(halo, strokeWidth);

      svg
        .append('text')
        .attr('class', 'caption')
        .attr('x', width - margin.right - barPadding - strokeWidth)
        .attr('y', height - margin.bottom - barPadding)
        .style('text-anchor', 'end')
        .html(caption);

      function halo(text: any, strokeWidth: number) {
        text
          .select(function() {
            return this.parentNode.insertBefore(this.cloneNode(true), this);
          })
          .style('fill', '#ffffff')
          .style('stroke', '#ffffff')
          .style('stroke-width', strokeWidth)
          .style('stroke-linejoin', 'round')
          .style('opacity', 1);
      }
    }

    function renderControls(
      element: HTMLElement,
      showControls: Options['showControls'],
      controlFns: any
    ) {
      const icons = {
        play: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
        pause: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`,
        skipForward: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-skip-forward"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>`,
        skipBack: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-skip-back"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>`
      };
      element.style.position = 'relative';

      const controls = addElement('div', 'controls', '', element);
      controls.style.position = 'absolute';
      controls.style.top = '0';
      controls.style.right = margin.right + barPadding + 'px';

      const rewindButton = addElement('div', 'rewind', icons.skipBack, controls);
      rewindButton.addEventListener('click', controlFns.rewindTicker);

      const playButton = addElement('div', 'play', icons.play, controls);
      playButton.addEventListener('click', controlFns.toggle);

      const pauseButton = addElement('div', 'pause', icons.pause, controls);
      pauseButton.addEventListener('click', controlFns.toggle);

      const fastforwardButton = addElement('div', 'fastforward', icons.skipForward, controls);
      fastforwardButton.addEventListener('click', controlFns.fastForwardTicker);

      switch (showControls) {
        case 'play':
          rewindButton.style.visibility = 'hidden';
          fastforwardButton.style.visibility = 'hidden';
          break;
        case 'none':
          controls.style.display = 'none';
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

  function renderFrame(dateSlice: Data[], renderOptions: any, getDateFn: () => string) {
    if (!x) {
      return;
    }

    const { tickDuration, topN, dateCounterFormat } = renderOptions;

    x.domain([0, d3.max(dateSlice, (d: Data) => d.value) as number]);

    svg
      .select('.xAxis')
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .call(xAxis);

    const bars = svg.selectAll('.bar').data(dateSlice, (d: Data) => d.name);

    bars
      .enter()
      .append('rect')
      .attr('class', (d: Data) => `bar ${d.name.replace(/\s/g, '_')}`)
      .attr('x', x(0) + 1)
      .attr('width', (d: Data) => Math.abs(x(d.value) - x(0) - 1))
      .attr('y', () => y(topN + 1) + 5)
      .attr('height', y(1) - y(0) - barPadding)
      .style('fill', (d: Data) => d.color)
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('y', (d: Data) => y(d.rank as number) + 5);

    bars
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('width', (d: Data) => Math.abs(x(d.value) - x(0) - 1))
      .attr('y', (d: Data) => y(d.rank as number) + 5);

    bars
      .exit()
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('width', (d: Data) => Math.abs(x(d.value) - x(0) - 1))
      .attr('y', () => y(topN + 1) + 5)
      .remove();

    const labels = svg.selectAll('.label').data(dateSlice, (d: Data) => d.name);

    labels
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', labelX)
      .attr('y', () => y(topN + 1) + 5 + (y(1) - y(0)) / 2)
      .style('text-anchor', 'end')
      .html((d: Data) => d.name)
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('y', (d: Data) => y(d.rank as number) + 5 + (y(1) - y(0)) / 2 + 1);

    labels
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('x', labelX)
      .attr('y', (d: Data) => y(d.rank as number) + 5 + (y(1) - y(0)) / 2 + 1);

    labels
      .exit()
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('x', labelX)
      .attr('y', () => y(topN + 1) + 5)
      .remove();

    const valueLabels = svg.selectAll('.valueLabel').data(dateSlice, (d: Data) => d.name);

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
      .attr('y', (d: Data) => y(d.rank as number) + 5 + (y(1) - y(0)) / 2 + 1);

    valueLabels
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .attr('x', (d: Data) => x(d.value) + 5)
      .attr('y', (d: Data) => y(d.rank as number) + 5 + (y(1) - y(0)) / 2 + 1)
      .tween('text', function(d: Data) {
        const i = d3.interpolateRound(d.lastValue as number, d.value);
        return function(t: any) {
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

    dateCounterText.html(formatDate(getDateFn(), dateCounterFormat));
  }

  function resize(element: HTMLElement, renderOptions: any, resetFn: () => void) {
    if (
      (!renderOptions.height && !renderOptions.width) ||
      String(renderOptions.height).startsWith('window') ||
      String(renderOptions.width).startsWith('window')
    ) {
      height = getHeight(element, renderOptions.minHeight, renderOptions.height);
      width = getWidth(element, renderOptions.minWidth, renderOptions.width);

      const currentPosition = element.style.position; // "fixed" if scrolling
      resetFn();
      element.style.position = currentPosition;
    }
  }

  return {
    renderInitalView,
    renderFrame,
    resize
  };
}
