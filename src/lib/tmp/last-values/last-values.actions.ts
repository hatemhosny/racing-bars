import { Data } from '../../models';
import { LastValuesAction } from './last-values.models';

export const actionTypes = {
  initialize: 'lastValues/initialize',
  update: 'lastValues/update',
};

export const initialize = (data: Data[]): LastValuesAction => ({
  type: actionTypes.initialize,
  payload: data,
});

export const update = (d: Data): LastValuesAction => ({
  type: actionTypes.update,
  payload: d,
});
