import { takeLatest, put, fork, call } from 'redux-saga/effects';
import request from 'utils/request';

import { loadedProperties, loadedTypes } from './actions';
import { GET_TYPES, TYPE_SELECTED } from './constants';



export function* selectType(state) {

  if(state.typeName != null) {
    const requestUrl = `/semantic-content-type-builder/properties/${state.typeName}`;
    const propertiesReponse = yield call(request, requestUrl, {method: 'GET'});

    yield put(loadedProperties(propertiesReponse.properties));
  }

}

export function* getTypes() {
  const requestUrl = '/semantic-content-type-builder/types';
  const typesResponse = yield call(request, requestUrl, { method: 'GET' });

  yield put(loadedTypes(typesResponse.types));
}


// Individual exports for testing
function* defaultSaga() {
  yield fork(takeLatest, GET_TYPES, getTypes);
  yield fork(takeLatest, TYPE_SELECTED, selectType);
}

export default defaultSaga;
