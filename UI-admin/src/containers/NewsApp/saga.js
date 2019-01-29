/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import {toastr} from "react-redux-toastr";

import {GET_DATA, GET_LIST_DATA, ADD_DATA, UPDATE_DATA, DELETE_DATA,
    GET_CATEGORY, ADD_CATEGORY, UPDATE_CATEGORY} from './constants';
import { API_URL } from '../App/constants';
import {gotData, gotListData, addedData, updatedData, deletedData, gotCategory, addedCategory, updatedCategory} from './actions';
import request from '../../utils/request';

export function* getData(action) {
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.newsApp + '/' + action._id);
        yield put(gotData(data));
    } catch (err) {
        yield put(gotData(null));
    }
}

export function* getListData() {
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.newsApp);
        yield put(gotListData(data));
    } catch (err) {
        toastr.error('Get News Fail!');
        yield put(gotListData([]));
    }
}
export function* addData(action) {
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.newsApp, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(action.data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        });
        yield put(addedData(data));
        action.callbackSuccess();
    } catch (err) {
    }
}
export function* updateData(action) {
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.newsApp + '/' + action.data._id, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(action.data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        });
        yield put(updatedData(data));
        action.callbackSuccess();
    } catch (err) {
    }
}

export function* deleteDataReq(action) {
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.newsApp + '/' + action._id, {
            method: 'DELETE'
        });
        yield put(deletedData(data));
    } catch (err) {
    }
}

export function* getCateReq() {
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.newsType);
        yield put(gotCategory(data));
    } catch (err) {
    }
}
export function* addCateReq(action) {
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.newsType, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(action.data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        });
        yield put(addedCategory(data));
    } catch (err) {
    }
}

export function* updateCateReq(action) {
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.newsType + '/' + action.data._id, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(action.data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        });
        yield put(updatedCategory(data));
    } catch (err) {
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
    yield takeLatest(GET_DATA, getData);
    yield takeLatest(GET_LIST_DATA, getListData);
    yield takeLatest(ADD_DATA, addData);
    yield takeLatest(UPDATE_DATA, updateData);
    yield takeLatest(DELETE_DATA, deleteDataReq);

    yield takeLatest(GET_CATEGORY, getCateReq);
    yield takeLatest(ADD_CATEGORY, addCateReq);
    yield takeLatest(UPDATE_CATEGORY, updateCateReq);
}
