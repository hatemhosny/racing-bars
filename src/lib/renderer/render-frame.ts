import * as d3 from '../d3';

import type { Data } from '../data';
import type { Store } from '../store';
import { getDateSlice, safeName, getColor, getIconID, getText } from '../utils';
import type { RenderOptions } from './render-options';
import { selectFn, highlightFn, halo } from './helpers';
import { updateControls } from './controls';

export function renderFrame(data: Data[], store: Store, renderOptions: RenderOptions) {
  const {
    svg,
    titleText,
    subTitleText,
    dateCounterText,
    captionText,
    x,
    y,
    xAxis,
    labelPadding,
    barWidth,
    barHeight,
    barHalfHeight,
    barY,
    iconSize,
    labelX,
    defs,
    lastDate,
  } = renderOptions;
  const dates = store.getState().ticker.dates;
  const { showGroups } = store.getState().options;

  if (!x) {
    return;
  }

  const {
    tickDuration,
    title,
    subTitle,
    caption,
    dateCounter,
    marginBottom,
    fixedScale,
    fixedOrder,
    labelsPosition,
  } = store.getState().options;

  const topN = fixedOrder.length > 0 ? fixedOrder.length : store.getState().options.topN;
  const currentDate = store.getState().ticker.currentDate;
  const CompleteDateSlice = getDateSlice(currentDate, data, store);
  const dateSlice = CompleteDateSlice.slice(0, topN);

  if (showGroups) {
    svg
      .selectAll('.legend-wrapper')
      .style('opacity', (d: string) => (store.getState().data.groupFilter.includes(d) ? 0.3 : 1));
  }

  if (!fixedScale) {
    x.domain([0, (d3.max(dateSlice, (d: Data) => d.value) || 0) as number]);

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
    .attr('class', (d: Data) => 'bar ' + safeName(d.name))
    .classed('selected', (d: Data) => store.getState().data.selected.includes(d.name))
    .attr('x', x(0) + 1)
    .attr('width', barWidth)
    .attr('y', () => y(topN + 1) + marginBottom + 5)
    .attr('height', barHeight)
    .style('fill', (d: Data) => getColor(d, store))
    .on('click', (_ev: Event, d: Data) => selectFn(d, store, renderOptions))
    .on('mouseover', (_ev: Event, d: Data) => highlightFn(d, store, renderOptions))
    .on('mouseout', (_ev: Event, d: Data) => highlightFn(d, store, renderOptions))
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
    .attr('y', () => y(topN + 1) + marginBottom + 5)
    .remove();

  const labels = svg //
    .selectAll('.label')
    .data(dateSlice, (d: Data) => d.name);

  labels
    .enter()
    .append('text')
    .attr('class', 'label')
    .classed('outside-bars', labelsPosition !== 'inside')
    .attr('x', labelX)
    .attr('y', () => y(topN + 1) + marginBottom + 5 + barHalfHeight)
    .style('text-anchor', 'end')
    .html((d: Data) => d.name)
    .on('click', (_ev: Event, d: Data) => selectFn(d, store, renderOptions))
    .on('mouseover', (_ev: Event, d: Data) => highlightFn(d, store, renderOptions))
    .on('mouseout', (_ev: Event, d: Data) => highlightFn(d, store, renderOptions))
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
    .attr('y', () => y(topN + 1) + marginBottom + 5)
    .remove();

  const valueLabels = svg //
    .selectAll('.valueLabel')
    .data(dateSlice, (d: Data) => d.name);

  valueLabels
    .enter()
    .append('text')
    .attr('class', 'valueLabel')
    .attr('x', (d: Data) => x(d.value) + 5)
    .attr('y', () => y(topN + 1) + marginBottom + 5)
    .text((d: Data) => d3.format(',.0f')(d.lastValue as number))
    .transition()
    .duration(tickDuration)
    .ease(d3.easeLinear)
    .attr('y', (d: Data) => barY(d) + barHalfHeight);

  const sameDate = lastDate === currentDate;
  valueLabels
    .transition()
    .duration(tickDuration)
    .ease(d3.easeLinear)
    .attr('x', (d: Data) => x(d.value) + 5)
    .attr('y', (d: Data) => barY(d) + barHalfHeight)
    .tween('text', function (d: Data) {
      const lastValue = sameDate ? d.value : (d.lastValue as number);
      const i = d3.interpolateRound(lastValue, d.value);
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
    .attr('y', () => y(topN + 1) + marginBottom + 5)
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

    iconPatterns //
      .exit()
      .transition()
      .duration(tickDuration)
      .ease(d3.easeLinear)
      .remove();

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
      .attr('cy', (d: Data) => y(d.rank as number) + barHalfHeight)
      .attr('clip-path', 'url(#icons-rect-clip)');

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

  titleText.html(getText(title, currentDate, CompleteDateSlice, dates));
  subTitleText.html(getText(subTitle, currentDate, CompleteDateSlice, dates));
  captionText.html(getText(caption, currentDate, CompleteDateSlice, dates));
  dateCounterText
    .html(getText(dateCounter, currentDate, CompleteDateSlice, dates, true))
    .call((text: any) => halo(text, renderOptions));

  updateControls(store, renderOptions);

  renderOptions.lastDate = currentDate;
}
