/*
 *
 * App reducer
 *
 */

import { fromJS, List } from 'immutable';
import { findIndex, size } from 'lodash';
import {
  DELETE_CONTENT_TYPE,
  MODELS_FETCH,
  MODELS_FETCH_SUCCEEDED,
} from './constants';

const initialState = fromJS({
  loading: true,
  menu: List(),
  models: List(),
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_CONTENT_TYPE:
      return state
        .updateIn(['menu', '0', 'items'], (list) => list.splice(findIndex(state.getIn(['menu', '0', 'items']).toJS(), ['name', action.itemToDelete]), 1))
        .update('models', (array) => array.splice(findIndex(state.get('models').toJS(), ['name', action.itemToDelete]), 1));
    case MODELS_FETCH:
      return state.set('loading', true);
    case MODELS_FETCH_SUCCEEDED:
      return state
        .set('loading', false)
        .set('menu', List(action.menu.sections))
        .set('models', List(action.data.models));
    default:
      return state;
  }
}

export default appReducer;
