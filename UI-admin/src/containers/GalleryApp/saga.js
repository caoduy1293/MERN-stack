/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import nprogress from "nprogress";

import {
    GET_DATA,
    GET_LIST_DATA,
    ADD_DATA,
    UPDATE_DATA,
    DELETE_DATA,
    GET_TYPE,
    ADD_TYPE,
    UPDATE_TYPE
} from './constants';
import { API_URL } from '../App/constants';
import {gotData, gotListData, addedData, updatedData, deletedData, gotType, addedType, updatedType} from './actions';
import request from 'utils/request';

export function* getData(action) {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.galleryApp + '/' + action._id);
        yield put(gotData(data));
        nprogress.done();
    } catch (err) {
        toastr.error('Get Gallery Fail!');
        nprogress.done();
    }
}

export function* getListData() {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.galleryApp);
        yield put(gotListData(data));
        nprogress.done();
    } catch (err) {
        yield put(gotListData([]));
        toastr.error('Get Gallery Fail!');
        nprogress.done();
    }
}
export function* addData(action) {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.galleryApp, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(action.data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        });
        yield put(addedData(data));
        action.callbackSuccess();
        toastr.success('Add item successfully!');
        nprogress.done();
    } catch (err) {
        toastr.error('Add item Fail!');
        nprogress.done();
    }
}
export function* updateData(action) {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.galleryApp + '/' + action.data._id, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(action.data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        });
        yield put(updatedData(data));
        action.callbackSuccess();
        toastr.success('Update item successfully!');
        nprogress.done();
    } catch (err) {
        toastr.error('Update item Fail!');
        nprogress.done();
    }
}

export function* deleteDataReq(action) {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.galleryApp + '/' + action._id, {
            method: 'DELETE'
        });
        yield put(deletedData(data));
        toastr.success('Delete item successfully!');
        nprogress.done();
    } catch (err) {
        toastr.error('Delete item fail!');
        nprogress.done();
    }
}

export function* getTypeReq() {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.galleryTypes);
        yield put(gotType(data));
        nprogress.done();
    } catch (err) {
        yield put(gotType([]));
        toastr.error('Get Types fail!');
        nprogress.done();
    }
}

export function* addTypeReq(action) {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.galleryTypes, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(action.data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        });
        yield put(addedType(data));
        toastr.success('Add Type successfully!');
        nprogress.done();
    } catch (err) {
        toastr.error('Add type fail!');
        nprogress.done();
    }
}

export function* updateTypeReq(action) {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.galleryTypes + '/' + action.data._id, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(action.data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        });
        yield put(updatedType(data));
        toastr.success('Update type successfully!');
        nprogress.done();
    } catch (err) {
        toastr.error('Update type fail!');
        nprogress.done();
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

    yield takeLatest(GET_TYPE, getTypeReq);
    yield takeLatest(ADD_TYPE, addTypeReq);
    yield takeLatest(UPDATE_TYPE, updateTypeReq);
}
