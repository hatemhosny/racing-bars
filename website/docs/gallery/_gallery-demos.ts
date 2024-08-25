import type { Props } from 'racing-bars';

type ChartProps = Props & {
  label: string;
  dynamicProps?: Partial<Record<keyof Props, string>>;
};

export const autorunTrue: ChartProps = {
  label: 'autorun=true',
  dataUrl: '/data/population.csv',
  dataType: 'csv',
  autorun: true,
};

export const autorunFalse: ChartProps = {
  label: 'autorun=false',
  dataUrl: '/data/population.csv',
  dataType: 'csv',
  autorun: false,
};

export const captionDataFunction: ChartProps = {
  label: 'caption (data function)',
  dataUrl: '/data/population.csv',
  dataType: 'csv',
  caption: (currentDate, dateSlice, allDates) =>
    `Total: ${Math.round(dateSlice.reduce((acc, curr) => acc + curr.value, 0))}`,
  dynamicProps: {
    caption: `(currentDate, dateSlice, allDates) =>
\`Total: \${Math.round(dateSlice.reduce((acc, curr) => acc + curr.value, 0))}\``,
  },
};
