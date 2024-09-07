import type { Props } from '../../../src';
type ChartProps = Props & {
  label: string;
  dynamicProps?: Partial<Record<keyof Props, string>>;
};

export const autorunFalse: ChartProps = {
  label: 'Autorun disabled',
  dataUrl: '/data/population.csv',
  autorun: false,
};

export const captionDataFunction: ChartProps = {
  label: 'Caption (data function)',
  dataUrl: '/data/population.csv',
  caption: (_currentDate, dateSlice, _allDates) =>
    `Total: ${Math.round(dateSlice.reduce((acc, curr) => acc + curr.value, 0))}`,
  dynamicProps: {
    caption: `(currentDate, dateSlice, allDates) =>
\`Total: \${Math.round(dateSlice.reduce((acc, curr) => acc + curr.value, 0))}\``,
  },
};

export const captionString: ChartProps = {
  label: 'Caption (string)',
  dataUrl: '/data/population.csv',
  caption: 'Source: World Bank',
};

export const colorMapGroups: ChartProps = {
  label: 'Color Map for Groups',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  colorMap: {
    Asia: 'yellow',
    Europe: 'green',
  },
  showGroups: true,
};

export const colorMap: ChartProps = {
  label: 'Color Map',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  colorMap: {
    India: 'orange',
    'United States': 'blue',
  },
  showGroups: false,
};

export const colorPalette: ChartProps = {
  label: 'Color Palette',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  colorMap: [
    '#636EFA',
    '#EF553B',
    '#00CC96',
    '#AB63FA',
    '#FFA15A',
    '#19D3F3',
    '#FF6692',
    '#B6E880',
    '#FF97FF',
    '#FECB52',
  ],
  showGroups: false,
};

export const colorSeedRandom: ChartProps = {
  label: 'Random Color Seed',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  colorSeed: Math.round(Math.random() * 100),
  dynamicProps: { colorSeed: 'Math.round(Math.random() * 100)' },
};

export const colorSeed: ChartProps = {
  label: 'Color Seed',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  colorSeed: 42,
  showGroups: false,
};

export const controlButtonsAll: ChartProps = {
  label: 'Control Buttons: All',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  subTitle: 'in millions',
  controlButtons: 'all',
};

export const controlButtonsPlay: ChartProps = {
  label: 'Control Buttons: Play',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  subTitle: 'in millions',
  controlButtons: 'play',
};

export const controlButtonsNone: ChartProps = {
  label: 'Control Buttons: None',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  subTitle: 'in millions',
  controlButtons: 'none',
};

export const cumulativeSum: ChartProps = {
  label: 'Cumulative Sum',
  dataUrl: '/data/gh-star.csv',
  title: 'Top Programming Languages',
  subTitle: 'Github Stars',
  makeCumulative: true,
};

export const datasetBrands: ChartProps = {
  label: 'Brand Values Dataset',
  dataUrl: '/data/brands.csv',
  title: '18 years of Top Global Brands',
  subTitle: 'Brand value, $m',
  colorSeed: 45,
};

export const datasetCovid: ChartProps = {
  label: 'Covid-19 Dataset',
  dataUrl: '/data/covid-19.csv',
  title: 'Covid-19',
  subTitle: 'Number of confirmed cases',
  dateCounter: 'MMM DD, YYYY',
  labelsPosition: 'outside',
};

export const datasetGdp: ChartProps = {
  label: 'GDP Dataset',
  dataUrl: '/data/gdp.csv',
  dataTransform: (data) =>
    data.map((d) => ({
      ...d,
      icon: `https://flagsapi.com/${d.code}/flat/64.png`,
    })),
  title: 'Gross domestic product (GDP)',
  caption: 'Source: World Bank',
  dateCounter: 'YYYY',
  showIcons: true,
  labelsPosition: 'outside',
  dynamicProps: {
    dataTransform: `(data) => data.map((d) => ({ ...d, icon: \`https://flagsapi.com/\${d.code}/flat/64.png\` }))`,
  },
};

export const datasetGhPush: ChartProps = {
  label: 'GitHub Push Events Dataset',
  dataUrl: '/data/gh-push.csv',
  title: 'Top Programming Languages',
  subTitle: 'Github Push Events',
  dateCounter: (currentDate, _dateSlice, _allDates) => {
    const month = Number(currentDate.slice(5, 7));
    const year = Number(currentDate.slice(0, 4));
    const q = Math.floor(month / 3) + 1;
    const quarter = q > 4 ? q - 4 : q;
    return `Q${quarter} ${year}`;
  },
  dynamicProps: {
    dateCounter: `(currentDate, dateSlice, allDates) => {
  const month = Number(currentDate.slice(5, 7));
  const year = Number(currentDate.slice(0, 4));
  const q = Math.floor(month / 3) + 1;
  const quarter = q > 4 ? q - 4 : q;
  return \`Q\${quarter} \${year}\`;
}`,
  },
};

export const datasetGhStars: ChartProps = {
  label: 'GitHub Stars Dataset',
  dataUrl: '/data/gh-star.csv',
  title: 'Top Programming Languages',
  subTitle: 'Github Stars',
  makeCumulative: true,
  dateCounter: (currentDate, _dateSlice, _allDates) => {
    const month = Number(currentDate.slice(5, 7));
    const year = Number(currentDate.slice(0, 4));
    const q = Math.floor(month / 3) + 1;
    const quarter = q > 4 ? q - 4 : q;
    return `Q${quarter} ${year}`;
  },
  dynamicProps: {
    dateCounter: `(currentDate, dateSlice, allDates) => {
  const month = Number(currentDate.slice(5, 7));
  const year = Number(currentDate.slice(0, 4));
  const q = Math.floor(month / 3) + 1;
  const quarter = q > 4 ? q - 4 : q;
  return \`Q\${quarter} \${year}\`;
}`,
  },
};

export const datasetPopulation: ChartProps = {
  label: 'Population Dataset',
  dataUrl: '/data/population.csv',
  dataTransform: (data) =>
    data.map((d) => ({
      ...d,
      icon: `https://flagsapi.com/${d.code}/flat/64.png`,
    })),
  title: 'World Population in 60 Years',
  subTitle: 'Country Population in millions',
  caption: 'Source: World Bank',
  dateCounter: 'YYYY',
  showIcons: true,
  labelsPosition: 'outside',
  dynamicProps: {
    dataTransform: `(data) => data.map((d) => ({ ...d, icon: \`https://flagsapi.com/\${d.code}/flat/64.png\` }))`,
  },
};

export const dataTransform: ChartProps = {
  label: 'Data Transform',
  dataUrl: '/data/population.csv',
  dataTransform: (data) =>
    data.map((d) => ({
      ...d,
      icon: `https://flagsapi.com/${d.code}/flat/64.png`,
    })),
  title: 'World Population',
  showIcons: true,
  labelsPosition: 'outside',
  dynamicProps: {
    dataTransform: `(data) => data.map((d) => ({ ...d, icon: \`https://flagsapi.com/\${d.code}/flat/64.png\` }))`,
  },
};

export const dateCounterFormat: ChartProps = {
  label: 'Date Counter (format)',
  dataUrl: '/data/population.csv',
  dateCounter: 'MMM DD, YYYY 🌍',
};

export const dateCounterDataFunction: ChartProps = {
  label: 'Date Counter (data function)',
  dataUrl: '/data/population.csv',
  dateCounter: (currentDate, _dateSlice, allDates) =>
    `${allDates.indexOf(currentDate) + 1} of ${allDates.length}`,
  dynamicProps: {
    dateCounter: `(currentDate, dateSlice, allDates) =>
    \`\${allDates.indexOf(currentDate) + 1} of \${allDates.length}\``,
  },
};

export const fillDateGapsNull: ChartProps = {
  label: 'Filling Date Gaps: null (default)',
  dataUrl: '/data/population.csv',
  fillDateGapsInterval: null,
};

export const fillDateGapsMonthInterpolate: ChartProps = {
  label: 'Filling Date Gaps: month - interpolate',
  dataUrl: '/data/population.csv',
  fillDateGapsInterval: 'month',
  fillDateGapsValue: 'interpolate',
  valueDecimals: 2,
};

export const fillDateGapsMonthLast: ChartProps = {
  label: 'Filling Date Gaps: month - last',
  dataUrl: '/data/population.csv',
  fillDateGapsInterval: 'month',
  fillDateGapsValue: 'last',
  valueDecimals: 2,
};

export const fixedOrder: ChartProps = {
  label: 'Fixed Order',
  dataUrl: '/data/population.csv',
  dateCounter: 'YYYY',
  fixedOrder: ['Algeria', 'Italy', 'Canada', 'France', 'Argentina'],
  topN: 3,
  tickDuration: 200,
};

export const fixedScale: ChartProps = {
  label: 'Fixed Scale',
  dataUrl: '/data/covid-19.csv',
  title: 'Covid-19 Confirmed Cases',
  fixedScale: true,
  labelsPosition: 'outside',
};

export const highlightBars: ChartProps = {
  label: 'Highlight Bars',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  highlightBars: true,
};

export const icons: ChartProps = {
  label: 'Icons',
  dataUrl: '/data/population.csv',
  dataTransform: (data) =>
    data.map((d) => ({
      ...d,
      icon: `https://flagsapi.com/${d.code}/flat/64.png`,
    })),
  title: 'World Population in 60 Years',
  subTitle: 'Country Population in millions',
  caption: 'Source: World Bank',
  showIcons: true,
  labelsPosition: 'outside',
  dynamicProps: {
    dataTransform: `(data) => data.map((d) => ({ ...d, icon: \`https://flagsapi.com/\${d.code}/flat/64.png\` }))`,
  },
};

export const keyboardControls: ChartProps = {
  label: 'Keyboard Controls',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  keyboardControls: true,
};

export const labelsPosition: ChartProps = {
  label: 'Labels Position',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  labelsPosition: 'outside',
};

export const labelsPositionNone: ChartProps = {
  label: 'Hidden Labels',
  dataUrl: '/data/population.csv',
  dataTransform: (data) =>
    data.map((d) => ({
      ...d,
      icon: `https://flagsapi.com/${d.code}/flat/64.png`,
    })),
  title: 'World Population',
  labelsPosition: 'none',
  showIcons: true,
  dynamicProps: {
    dataTransform: `(data) => data.map((d) => ({ ...d, icon: \`https://flagsapi.com/\${d.code}/flat/64.png\` }))`,
  },
};

export const loop: ChartProps = {
  label: 'Loop',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  startDate: '1970-01-01',
  endDate: '1980-01-01',
  loop: true,
};

export const margins: ChartProps = {
  label: 'Margins',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  marginTop: 40,
  marginBottom: 40,
  marginRight: 40,
  marginLeft: 40,
  labelsPosition: 'outside',
};

export const mouseControls: ChartProps = {
  label: 'Mouse Controls',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  mouseControls: true,
  showGroups: true,
};

export const overlays: ChartProps = {
  label: 'Overlays',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  overlays: 'all',
  autorun: false,
  endDate: '1965-01-01',
};

export const selectBars: ChartProps = {
  label: 'Select Bars',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  selectBars: true,
};

export const showGroups: ChartProps = {
  label: 'Show Groups',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  showGroups: true,
};

export const startEndDates: ChartProps = {
  label: 'Start and End Dates',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  startDate: '1970-01-01',
  endDate: '1999-12-31',
};

export const themeDark: ChartProps = {
  label: 'Dark Theme',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  theme: 'dark',
};

export const tickDuration: ChartProps = {
  label: 'Chart Speed (tickDuration)',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  tickDuration: 100,
};

export const titleSubtitle: ChartProps = {
  label: 'Title and Sub-Title',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  subTitle: 'in millions',
};

export const topN: ChartProps = {
  label: 'Top N',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  topN: 5,
};

export const valueDecimals: ChartProps = {
  label: 'Value Decimals',
  dataUrl: '/data/population.csv',
  title: 'World Population',
  valueDecimals: 3,
};
