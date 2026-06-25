import { json, csv, tsv, xml } from './d3';
import type { Options, Data, WideData } from './index';

/**
 * Loads and parses data from a URL.
 *
 * Supports JSON, CSV, TSV, and XML formats. The data type is auto-detected from the file
 * extension when `type` is set to `'auto'` (default), falling back to JSON if detection fails.
 *
 * @param url - The URL of the data file to load.
 * @param type - The data format. One of `'json'`, `'csv'`, `'tsv'`, `'xml'`, or `'auto'`.
 * Defaults to `'auto'`, which infers the type from the URL's file extension.
 * @returns A Promise resolving to an array of {@link Data} or {@link WideData} objects.
 * @throws {Error} If the data fails to load or the type is unsupported.
 *
 * @example
 * ```ts
 * import { loadData, race } from 'racing-bars';
 * const data = await loadData('/data/population.csv', 'csv');
 * const racer = await race(data, '#race');
 * ```
 *
 * @see https://racing-bars.hatemhosny.dev/documentation/api
 */
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
