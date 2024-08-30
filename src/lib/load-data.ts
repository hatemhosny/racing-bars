import { json, csv, tsv, xml } from './d3';
import type { Data, WideData } from './data';

export function loadData(
  url: string,
  type: 'json' | 'csv' | 'tsv' | 'xml' = 'json',
): Promise<Data[]> | Promise<WideData[]> {
  const handleError = () => {
    throw new Error(`Failed to load data as ${type.toUpperCase()} from ${url}`);
  };
  switch (type) {
    case 'json':
      return json(url).catch(handleError) as Promise<Data[]> | Promise<WideData[]>;
    case 'csv':
      return csv(url).catch(handleError) as unknown as Promise<Data[]> | Promise<WideData[]>;
    case 'tsv':
      return tsv(url).catch(handleError) as unknown as Promise<Data[]> | Promise<WideData[]>;
    case 'xml':
      return xml(url).catch(handleError) as unknown as Promise<Data[]> | Promise<WideData[]>;
    default:
      throw new Error(`Unsupported data type: ${type}`);
  }
}
