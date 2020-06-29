// required for ./lib/shared

export * from './public-api';

import { racingBars } from './public-api';
export const { loadData } = racingBars;
