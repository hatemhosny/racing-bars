import * as d3 from '../d3';

import type { Data } from '../data';
import type { Store } from '../store';
import { getHeight, getWidth } from '../utils';
import type { RenderOptions } from './render-options';

export function calculateDimensions(store: Store, renderOptions: RenderOptions) {
  const {
    minHeight,
    inputHeight,
    minWidth,
    inputWidth,
    title,
    subTitle,
    showGroups,
    controlButtons,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    labelsPosition,
    labelsWidth,
    showIcons,
    fixedOrder,
  } = store.getState().options;
  const { root, maxValue } = renderOptions;

  const topN = fixedOrder.length > 0 ? fixedOrder.length : store.getState().options.topN;

  const height = (renderOptions.height = getHeight(root, minHeight, String(inputHeight)));
  const width = (renderOptions.width = getWidth(root, minWidth, String(inputWidth)));

  const titlePadding = 5;
  const titleHeight = title ? 55 : 0;
  const subTitleHeight = !subTitle ? 0 : title ? 20 : 40;
  const groupsHeight = !showGroups ? 0 : titleHeight || subTitleHeight ? 20 : 30;
  const controlsHeight = controlButtons !== 'none' ? 50 : 0;

  const headerHeight = Math.max(
    titleHeight + subTitleHeight + groupsHeight,
    controlsHeight + groupsHeight,
    10,
  );

  const labelsArea = labelsPosition !== 'outside' ? 0 : labelsWidth;
  const topAxisPadding = 15;

  const margin = {
    top: marginTop + headerHeight + topAxisPadding,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft + labelsArea,
  };

  const x = (renderOptions.x = d3
    .scaleLinear()
    .domain([0, maxValue])
    .range([margin.left, width - margin.right - 65]));

  const y = (renderOptions.y = d3
    .scaleLinear()
    .domain([topN, 0])
    .range([height - margin.bottom, margin.top]));

  const barPadding = (renderOptions.barPadding =
    (height - (margin.bottom + margin.top)) / (topN * 5));
  const labelPadding = (renderOptions.labelPadding = 8);
  renderOptions.barWidth = (d: Data) => Math.abs(x(d.value) - x(0) - 1);
  const barHeight = (renderOptions.barHeight = y(1) - y(0) - barPadding);
  renderOptions.barHalfHeight = (y(1) - y(0)) / 2 + 1;
  renderOptions.barY = (d: Data) => y(d.rank as number) + 5;
  const iconSize = (renderOptions.iconSize = showIcons ? barHeight * 0.9 : 0);
  const iconSpace = (renderOptions.iconSpace = showIcons ? iconSize + labelPadding : 0);
  renderOptions.labelX =
    labelsPosition !== 'outside'
      ? (d: Data) => x(d.value) - labelPadding - iconSpace
      : margin.left - labelPadding;

  renderOptions.titlePadding = titlePadding;
  renderOptions.titleHeight = titleHeight;
  renderOptions.margin = margin;
}
