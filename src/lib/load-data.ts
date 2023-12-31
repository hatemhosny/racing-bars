import { json, csv, tsv, xml } from './d3';
import type { Data, WideData } from './data';

export function loadData(
  URL: string,
  type: 'json' | 'csv' | 'tsv' | 'xml' = 'json',
): Promise<Data[]> | Promise<WideData[]> {
  switch (type) {
    case 'json':
      return json(URL) as Promise<Data[]> | Promise<WideData[]>;
    case 'csv':
      return csv(URL) as unknown as Promise<Data[]> | Promise<WideData[]>;
    case 'tsv':
      return tsv(URL) as unknown as Promise<Data[]> | Promise<WideData[]>;
    case 'xml':
      return xml(URL) as unknown as Promise<Data[]> | Promise<WideData[]>;
    default:
      throw new Error(`Unsupported data type: ${type}`);
  }
}
