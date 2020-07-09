import * as d3 from '../d3';

import { Data } from '../data';
import { Store } from '../store';
import { getText, getColor } from '../utils';
import { RenderOptions } from './render-options';
import { legendClick } from './helpers';

export function renderHeader(
  store: Store,
  renderOptions: RenderOptions,
  CompleteDateSlice: Data[],
) {
  const groups = store.getState().data.groups;
  const dates = store.getState().ticker.dates;
  const currentDate = store.getState().ticker.currentDate;
  const { title, subTitle, marginTop, marginLeft, showGroups } = store.getState().options;
  const { svg, margin, width, titlePadding, titleHeight } = renderOptions;

  renderOptions.titleText = svg
    .append('text')
    .attr('class', 'title')
    .attr('x', marginLeft + titlePadding)
    .attr('y', marginTop + 24)
    .html(getText(title, currentDate, CompleteDateSlice, dates));

  renderOptions.subTitleText = svg
    .append('text')
    .attr('class', 'subTitle')
    .attr('x', marginLeft + titlePadding)
    .attr('y', marginTop + (titleHeight || 24))
    .html(getText(subTitle, currentDate, CompleteDateSlice, dates));

  if (showGroups) {
    const legendsWrapper = svg.append('g');
    const legends = legendsWrapper
      .selectAll('.legend-wrapper')
      .data(groups)
      .enter()
      .append('g')
      .attr('class', 'legend legend-wrapper')
      .style('cursor', 'pointer')
      .style('opacity', (d: string) => (store.getState().data.groupFilter.includes(d) ? 0.3 : 1))
      .on('click', (d: string) => legendClick(d, store));

    legends
      .append('rect')
      .attr('class', 'legend legend-color')
      .attr('width', 10)
      .attr('height', 10)
      .attr('y', margin.top - 35)
      .style('fill', (d: string) => getColor({ group: d } as Data, store) as string);

    legends
      .append('text')
      .attr('class', 'legend legend-text')
      .attr('x', 20)
      .attr('y', margin.top - 25)
      .html((d: string) => d);

    let legendX = margin.left + titlePadding;
    let legendY = 0;
    legends.each(function () {
      const wrapper = d3.select(this);
      const text = wrapper.select('text') as any;
      const bbox = text.node().getBBox();
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
