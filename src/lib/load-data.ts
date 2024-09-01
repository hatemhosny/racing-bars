import { json, csv, tsv, xml } from './d3';
import type { Options, Data, WideData } from './index';

export function loadData(
  url: string,
  type: Options['dataType'] = 'auto',
): Promise<Data[]> | Promise<WideData[]> {
  const supportedTypes: Array<Exclude<Options['dataType'], 'auto'>> = ['json', 'csv', 'tsv', 'xml'];
  const isSupported = (t: any) => supportedTypes.includes(t);

  const detectDataType = () => {
    const t = type.toLowerCase();
    if (isSupported(t)) {
      return t;
    }
    const extension = url.split('.').pop()?.toLowerCase() || '';
    if (isSupported(extension)) {
      return extension;
    }
    return 'json';
  };

  const handleError = () => {
    throw new Error(`Failed to load data as ${type.toUpperCase()} from ${url}`);
  };

  switch (detectDataType()) {
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
