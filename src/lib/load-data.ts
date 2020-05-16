export function loadData(
  URL: string,
  type: 'json' | 'csv' | 'tsv' | 'xml' = 'json'
) {
  switch (type) {
    case 'json':
      return d3.json(URL);
    case 'csv':
      return d3.csv(URL);
    case 'tsv':
      return d3.tsv(URL);
    case 'xml':
      return d3.xml(URL);
    default:
      throw new Error(`Unsupported data type: ${type}`);
  }
}
