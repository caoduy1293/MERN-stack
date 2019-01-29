/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';

import {GET_DATA, GET_LIST_DATA, GET_TYPES} from './constants';
import { API_URL } from '../App/constants';
import {gotData, gotListData, gotTypes} from './actions';
import request from '../../utils/request';

export function* getData(action) {

    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.newsApp + '/' + action.id);
        yield put(gotData(data));
    } catch (err) {
        
    }
}

export function* getListData() {

    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.newsApp);
        yield put(gotListData(data));
    } catch (err) {
        yield put(gotListData([]));
    }
}

export function* getTypesReq() {

    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.newsType);
        yield put(gotTypes(data));
    } catch (err) {
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
    yield takeLatest(GET_DATA, getData);
    yield takeLatest(GET_LIST_DATA, getListData);

    yield takeLatest(GET_TYPES, getTypesReq);
}
