import * as d3 from '../d3';

import type { Store } from '../store';
import type { Data } from '../data';
import { getDateSlice, getText, getColor, safeName, getIconID, countDecimals } from '../utils';
import type { RenderOptions } from './render-options';
import { calculateDimensions } from './calculate-dimensions';
import { renderHeader } from './render-header';
import { renderControls, renderOverlays, updateControls } from './controls';
import { selectFn, highlightFn, halo } from './helpers';

export function renderInitialView(data: Data[], store: Store, renderOptions: RenderOptions) {
  const { caption, dateCounter, labelsPosition, showIcons, fixedScale, fixedOrder } =
    store.getState().options;

  const dates = store.getState().ticker.dates;
  const root = renderOptions.root;
  const topN = fixedOrder.length > 0 ? fixedOrder.length : store.getState().options.topN;
  const currentDate = store.getState().ticker.currentDate;
  const CompleteDateSlice = getDateSlice(currentDate, data, store);
  const dateSlice = CompleteDateSlice.slice(0, topN);
  const lastDateIndex = dates.indexOf(currentDate) > 0 ? dates.indexOf(currentDate) - 1 : 0;
  const valueDecimals = store.getState().options.valueDecimals;
  renderOptions.lastDate = dates[lastDateIndex];

  if (!root || dateSlice.length === 0) return;

  root.innerHTML = '';

  renderInitialFrame();
  renderControls(store, renderOptions);
  renderOverlays(store, renderOptions);
  updateControls(store, renderOptions);

  function renderInitialFrame() {
    renderOptions.maxValue = fixedScale
      ? data.map((d) => d.value).reduce((max, val) => (max > val ? max : val), 0)
      : (d3.max(dateSlice, (d: Data) => d.value) as number);

    calculateDimensions(store, renderOptions);

    const {
      margin,
      width,
      height,
      x,
      y,
      barWidth,
      barHeight,
      barY,
      barHalfHeight,
      labelX,
      iconSize,
      labelPadding,
    } = renderOptions;

    const svg: any = (renderOptions.svg = d3
      .select(root)
      .append('svg')
      .attr('width', width)
      .attr('height', height));

    renderHeader(store, renderOptions, CompleteDateSlice);

    const xAxis = (renderOptions.xAxis = d3
      .axisTop(x)
      .ticks(width > 500 ? 5 : 2)
      .tickSize(-(height - (margin.top + margin.bottom)))
      .tickFormat((n: number | { valueOf(): number }) => d3.format(',')(n)));

    svg
      .append('g')
      .attr('class', 'axis xAxis')
      .attr('transform', `translate(0, ${margin.top})`)
      .call(xAxis)
      .selectAll('.tick line')
      .classed('origin', (d: unknown) => d === 0);

    svg
      .selectAll('rect.bar')
      .data(dateSlice, (d: Data) => d.name)
      .enter()
      .append('rect')
      .attr('class', (d: Data) => 'bar ' + safeName(d.name))
      .classed('selected', (d: Data) => store.getState().data.selected.includes(d.name))
      .attr('x', x(0) + 1)
      .attr('width', barWidth)
      .attr('y', barY)
      .attr('height', barHeight)
      .style('fill', (d: Data) => getColor(d, store))
      .on('click', (_ev: Event, d: Data) => selectFn(d.name, store, renderOptions))
      .on('mouseover', (_ev: Event, d: Data) => highlightFn(d.name, store, renderOptions))
      .on('mouseout', (_ev: Event, d: Data) => highlightFn(d.name, store, renderOptions));

    svg
      .selectAll('text.label')
      .data(dateSlice, (d: Data) => d.name)
      .enter()
      .append('text')
      .attr('class', 'label')
      .classed('outside-bars', labelsPosition === 'outside')
      .classed('hidden', labelsPosition === 'none')
      .attr('x', labelX)
      .attr('y', (d: Data) => barY(d) + barHalfHeight)
      .style('text-anchor', 'end')
      .html((d: Data) => d.name)
      .on('click', (_ev: Event, d: Data) => selectFn(d.name, store, renderOptions))
      .on('mouseover', (_ev: Event, d: Data) => highlightFn(d.name, store, renderOptions))
      .on('mouseout', (_ev: Event, d: Data) => highlightFn(d.name, store, renderOptions));

    svg
      .selectAll('text.valueLabel')
      .data(dateSlice, (d: Data) => d.name)
      .enter()
      .append('text')
      .attr('class', 'valueLabel')
      .attr('x', (d: Data) => x(d.value) + 5)
      .attr('y', (d: Data) => barY(d) + barHalfHeight)
      .text((d: Data) =>
        valueDecimals === 'preserve'
          ? d.lastValue
          : d3.format(`,.${countDecimals(d.lastValue ?? d.value)}f`)(d.lastValue as number),
      );

    if (showIcons) {
      const defs = (renderOptions.defs = svg.append('svg:defs'));

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
        .append('clipPath')
        .attr('id', 'clipPath-' + store.getState().container.element.id)
        .append('rect')
        .attr('x', x(0) + 1)
        .attr('y', margin.top)
        .attr('width', width)
        .attr('height', height);

      svg
        .selectAll('circle')
        .data(dateSlice, (d: Data) => d.name)
        .enter()
        .append('circle')
        .attr('cx', (d: Data) => x(d.value) - iconSize / 2 - labelPadding)
        .attr('cy', (d: Data) => y(d.rank as number) + barHalfHeight)
        .attr('r', iconSize / 2)
        .style('fill', 'transparent')
        .style('fill', (d: Data) => `url(#${getIconID(d)})`)
        .attr('clip-path', `url(#clipPath-${store.getState().container.element.id})`);
    }

    const endY = height - margin.bottom;
    const endX = width - margin.right;
    const dateCounterTextY = caption ? endY - 30 : endY - 5;
    renderOptions.dateCounterText = svg
      .append('text')
      .attr('class', 'dateCounterText')
      .attr('x', endX)
      .attr('y', dateCounterTextY)
      .style('text-anchor', 'end')
      .html(getText(dateCounter, currentDate, CompleteDateSlice, dates, true))
      .call((text: any) => halo(text, renderOptions));

    renderOptions.captionText = svg
      .append('text')
      .attr('class', 'caption')
      .attr('x', endX - 10)
      .attr('y', endY - 5)
      .style('text-anchor', 'end')
      .html(getText(caption, currentDate, CompleteDateSlice, dates));
  }
}
