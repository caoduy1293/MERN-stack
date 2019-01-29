/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import {GET_DATA, GET_LIST_DATA, GET_TYPES} from './constants';
import { API_URL } from '../App/constants';
import {getTypes, gotData, gotListData, gotTypes} from './actions';

import request from '../../utils/request';

export function* getData(action) {

    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.galleryApp + '/' + action.id);
        yield put(gotData(data));
    } catch (err) {
        yield put(gotData(null));
    }
}

export function* getListData(action) {

    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.galleryApp);
        yield put(gotListData(data));
        yield put(getTypes(action.cbSuccess));
    } catch (err) {
        yield put(gotListData([]));
    }
}

export function* getTypesReq(action) {

    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.galleryTypes);
        yield put(gotTypes(data));
        action.cbSuccess();
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
