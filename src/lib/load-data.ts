import { json, csv, tsv, xml } from './d3';
import type { Options, Data, WideData } from './index';

/**
 * Loads data.
 *
 * @description This function loads data from the given URL based on the detected data type.
 * The data type can be explicitly specified or automatically detected from the URL extension.
 * The supported data types are 'json', 'csv', 'tsv', and 'xml'.
 *
 * @param {string} url - The URL from which to load data.
 * @param {Options['dataType']} [type='auto'] - The data type must be one of ['json', 'csv', 'tsv', 'xml']. Defaults to 'auto'.
 *
 * @returns {Promise<Data[]> | Promise<WideData[]>} A promise that resolves to the loaded data.
 *
 * @throws {Error} Throws an error if the data type is unsupported or if data loading fails.
 *
 * @example
 * loadData('data.csv', 'auto')
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 *
 * @see {@link https://racing-bars.hatemhosny.dev/documentation/api#loaddata}
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
