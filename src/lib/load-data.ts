import * as d3 from './d3';
import { Data, WideData } from './data';

export function loadData(
  URL: string,
  type: 'json' | 'csv' | 'tsv' | 'xml' = 'json',
): Promise<Data[]> | Promise<WideData[]> {
  switch (type) {
    case 'json':
      return d3.json(URL) as Promise<Data[]> | Promise<WideData[]>;
    case 'csv':
      return (d3.csv(URL) as unknown) as Promise<Data[]> | Promise<WideData[]>;
    case 'tsv':
      return (d3.tsv(URL) as unknown) as Promise<Data[]> | Promise<WideData[]>;
    case 'xml':
      return (d3.xml(URL) as unknown) as Promise<Data[]> | Promise<WideData[]>;
    default:
      throw new Error(`Unsupported data type: ${type}`);
  }
}
