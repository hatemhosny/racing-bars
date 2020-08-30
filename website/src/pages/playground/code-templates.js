export const languages = {
  js: 'js',
  ts: 'ts',
  ng: 'html',
  react: 'jsx',
  vue: 'html',
  py: 'py',
};

export const getCodeTemplates = (options) => ({
  js: `
const options = {
  selector: '#race',
  dataShape: 'long',
  dataTransform: ${options.dataTransform},
  fillDateGapsInterval: '${options.fillDateGapsInterval}',
  fillDateGapsValue: '${options.fillDateGapsValue}',
  startDate: '${options.startDate}',
  endDate: '${options.endDate}',
  colorSeed: '${options.colorSeed}',
  showGroups: ${options.showGroups},
  tickDuration: ${options.tickDuration},
  topN: ${options.topN},
  mouseControls: ${options.mouseControls},
  keyboardControls: ${options.keyboardControls},
  autorun: ${options.autorun},
  loop: ${options.loop},
  injectStyles: ${options.injectStyles},
  title: '${options.title}',
  subTitle: '${options.subTitle}',
  caption: '${options.caption}',
  dateCounter: '${options.dateCounter}',
  labelsPosition: '${options.labelsPosition}',
  labelsWidth: ${options.labelsWidth},
  showIcons: ${options.showIcons},
  controlButtons: '${options.controlButtons}',
  overlays: '${options.overlays}',
  height: ${options.height},
  width: ${options.width},
  marginTop: ${options.marginTop},
  marginRight: ${options.marginRight},
  marginBottom: ${options.marginBottom},
  marginLeft: ${options.marginLeft},
  theme: '${options.theme}',
  colorMap: ${options.colorMap},
  fixedScale: ${options.fixedScale},
  fixedOrder: ${options.fixedOrder},
  highlightBars: ${options.highlightBars},
  selectBars: ${options.selectBars},
};

racingBars.loadData('/data/${options.data}.csv', 'csv').then((data) => {
  racingBars.race(data, options);
});
`,
  ts: `
import { Data, loadData, race } from 'racing-bars';
const options = {
  selector: '#race',
  dataShape: 'long',
  dataTransform: ${options.dataTransform},
  fillDateGapsInterval: '${options.fillDateGapsInterval}',
  fillDateGapsValue: '${options.fillDateGapsValue}',
  startDate: '${options.startDate}',
  endDate: '${options.endDate}',
  colorSeed: '${options.colorSeed}',
  showGroups: ${options.showGroups},
  tickDuration: ${options.tickDuration},
  topN: ${options.topN},
  mouseControls: ${options.mouseControls},
  keyboardControls: ${options.keyboardControls},
  autorun: ${options.autorun},
  loop: ${options.loop},
  injectStyles: ${options.injectStyles},
  title: '${options.title}',
  subTitle: '${options.subTitle}',
  caption: '${options.caption}',
  dateCounter: '${options.dateCounter}',
  labelsPosition: '${options.labelsPosition}',
  labelsWidth: ${options.labelsWidth},
  showIcons: ${options.showIcons},
  controlButtons: '${options.controlButtons}',
  overlays: '${options.overlays}',
  height: ${options.height},
  width: ${options.width},
  marginTop: ${options.marginTop},
  marginRight: ${options.marginRight},
  marginBottom: ${options.marginBottom},
  marginLeft: ${options.marginLeft},
  theme: '${options.theme}',
  colorMap: ${options.colorMap},
  fixedScale: ${options.fixedScale},
  fixedOrder: ${options.fixedOrder},
  highlightBars: ${options.highlightBars},
  selectBars: ${options.selectBars},
};

loadData('/data/${options.data}.csv', 'csv').then((data: Data) => {
  race(data, options);
});
`,
  ng: `
<racing-bars
  dataUrl="assets/data/population.csv"
  dataType="csv"
  dataShape= "long"
  [dataTransform]="${options.dataTransform}"
  fillDateGapsInterval="${options.fillDateGapsInterval}"
  fillDateGapsValue="${options.fillDateGapsValue}"
  startDate="${options.startDate}"
  endDate="${options.endDate}"
  colorSeed="${options.colorSeed}"
  [showGroups]="${options.showGroups}"
  [tickDuration]="${options.tickDuration}"
  [topN]="${options.topN}"
  [mouseControls]="${options.mouseControls}"
  [keyboardControls]="${options.keyboardControls}"
  [autorun]="${options.autorun}"
  [loop]="${options.loop}"
  [injectStyles]="${options.injectStyles}"
  title="${options.title}"
  subTitle="${options.subTitle}"
  caption="${options.caption}"
  dateCounter="${options.dateCounter}"
  labelsPosition="${options.labelsPosition}"
  [labelsWidth]="${options.labelsWidth}"
  [showIcons]="${options.showIcons}"
  controlButtons="${options.controlButtons}"
  overlays="${options.overlays}"
  height="${options.height}"
  width="${options.width}"
  marginTop="${options.marginTop}"
  marginRight="${options.marginRight}"
  marginBottom="${options.marginBottom}"
  marginLeft="${options.marginLeft}"
  theme="${options.theme}"
  [colorMap]="${options.colorMap}"
  [fixedScale]="${options.fixedScale}"
  [fixedOrder]="${options.fixedOrder}"
  [highlightBars]="${options.highlightBars}"
  [selectBars]="${options.selectBars}"
>
</racing-bars>
`,
  react: `
<RacingBars
  dataUrl="assets/data/population.csv"
  dataType="csv"
  dataShape= "long"
  dataTransform={${options.dataTransform}}
  fillDateGapsInterval="${options.fillDateGapsInterval}"
  fillDateGapsValue="${options.fillDateGapsValue}"
  startDate="${options.startDate}"
  endDate="${options.endDate}"
  colorSeed="${options.colorSeed}"
  showGroups={${options.showGroups}}
  tickDuration={${options.tickDuration}}
  topN={${options.topN}}
  mouseControls={${options.mouseControls}}
  keyboardControls={${options.keyboardControls}}
  autorun={${options.autorun}}
  loop={${options.loop}}
  injectStyles={${options.injectStyles}}
  title="${options.title}"
  subTitle="${options.subTitle}"
  caption="${options.caption}"
  dateCounter="${options.dateCounter}"
  labelsPosition="${options.labelsPosition}"
  labelsWidth={${options.labelsWidth}}
  showIcons={${options.showIcons}}
  controlButtons="${options.controlButtons}"
  overlays="${options.overlays}"
  height="${options.height}"
  width="${options.width}"
  marginTop="${options.marginTop}"
  marginRight="${options.marginRight}"
  marginBottom="${options.marginBottom}"
  marginLeft="${options.marginLeft}"
  theme="${options.theme}"
  colorMap={${options.colorMap}}
  fixedScale={${options.fixedScale}}
  fixedOrder={${options.fixedOrder}}
  highlightBars={${options.highlightBars}}
  selectBars={${options.selectBars}}
>
</RacingBars>
`,
  vue: `
<racing-bars
  data-url="assets/data/population.csv"
  data-type="csv"
  data-shape= "long"
  :data-transform="${options.dataTransform}"
  fill-date-gaps-interval="${options.fillDateGapsInterval}"
  fill-date-gaps-value="${options.fillDateGapsValue}"
  start-date="${options.startDate}"
  end-date="${options.endDate}"
  color-seed="${options.colorSeed}"
  :show-groups="${options.showGroups}"
  :tick-duration="${options.tickDuration}"
  :top-n="${options.topN}"
  :mouse-controls="${options.mouseControls}"
  :keyboard-controls="${options.keyboardControls}"
  :autorun="${options.autorun}"
  :loop="${options.loop}"
  :inject-styles="${options.injectStyles}"
  title="${options.title}"
  sub-title="${options.subTitle}"
  caption="${options.caption}"
  date-counter="${options.dateCounter}"
  labels-position="${options.labelsPosition}"
  :labels-width="${options.labelsWidth}"
  :show-icons="${options.showIcons}"
  control-buttons="${options.controlButtons}"
  overlays="${options.overlays}"
  height="${options.height}"
  width="${options.width}"
  margin-top="${options.marginTop}"
  margin-right="${options.marginRight}"
  margin-bottom="${options.marginBottom}"
  margin-left="${options.marginLeft}"
  theme="${options.theme}"
  :color-map="${options.colorMap}"
  :fixed-scale="${options.fixedScale}"
  :fixed-order="${options.fixedOrder}"
  :highlight-bars="${options.highlightBars}"
  :select-bars="${options.selectBars}"
>
</racing-bars>
`,
});
