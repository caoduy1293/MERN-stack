/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_GENERAL_DATA } from './constants';
import { API_URL } from '../App/constants';
import { gotData } from './actions';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getData() {

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, API_URL.generalApp.getData);
    yield put(gotData(data));
  } catch (err) {
    yield put(gotData(null));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_GENERAL_DATA, getData);
}
