import type { Props } from 'racing-bars';

type ChartProps = Props & {
  label: string;
  dynamicProps?: Record<keyof Props, string>;
};

export const autorunTrueOptions: ChartProps = {
  label: 'autorun=true',
  dataUrl: '/data/population.csv',
  dataType: 'csv',
  autorun: true,
};

export const autorunFalseOptions: ChartProps = {
  label: 'autorun=false',
  dataUrl: '/data/population.csv',
  dataType: 'csv',
  autorun: false,
};
