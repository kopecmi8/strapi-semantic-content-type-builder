
import { takeLatest, call, put, fork } from 'redux-saga/effects';
import request from 'utils/request';
import { DELETE_CONTENT_TYPE, MODELS_FETCH } from './constants';
import { modelsFetchSucceeded } from './actions';

export function* deleteContentType(action) {
  try {
    if (action.sendRequest) {
      const requestUrl = `/semantic-content-type-builder/models/${action.itemToDelete}`;
      const response = yield call(request, requestUrl, { method: 'DELETE' }, true);

      if (response.ok && action.updateLeftMenu) {
        action.updatePlugin('content-manager', 'leftMenuSections', action.leftMenuContentTypes);
        strapi.notification.success('semantic-content-type-builder.notification.success.contentTypeDeleted');
      }
    }
  } catch(error) {
    strapi.notification.error('semantic-content-type-builder.notification.error.message');
  }
}

export function* fetchModels() {
  try {
    const requestUrl = '/semantic-content-type-builder/models';
    const data = yield call(request, requestUrl, { method: 'GET' });

    yield put(modelsFetchSucceeded(data));
  } catch(error) {
    strapi.notification.error('semantic-content-type-builder.notification.error.message');
  }
}



// Individual exports for testing
function* defaultSaga() {
  yield fork(takeLatest, DELETE_CONTENT_TYPE, deleteContentType);
  yield fork(takeLatest, MODELS_FETCH, fetchModels);
}

export default defaultSaga;

