/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import nprogress from "nprogress";

import { GET_DATA, GET_LIST_DATA, ADD_DATA, UPDATE_DATA, DELETE_DATA } from './constants';
import { API_URL } from '../App/constants';
import { gotData, gotListData, addedData, updatedData, deletedData } from './actions';
import request from 'utils/request';

export function* getData(action) {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.serviceApp + '/' + action._id);
        yield put(gotData(data));
        nprogress.done();
    } catch (err) {
        toastr.error('Get Service Fail!');
        nprogress.done();
    }
}

export function* getListData() {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.serviceApp);
        yield put(gotListData(data));
    } catch (err) {
        yield put(gotListData([]));
        toastr.error('Get Services Fail!');
    }
}
export function* addDataReq(action) {
    try {
        // Call our request helper (see 'utils/request')
        const res = yield call(request, API_URL.serviceApp, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(action.data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        });
        yield put(addedData(res));
        action.callbackSuccess();
        toastr.success('Add a Service successfully!');
    } catch (err) {
        // yield put(addedData(false));
        toastr.error('Add a Service Fail!');
    }
}
export function* updateData(action) {
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.serviceApp + '/' + action.data._id, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(action.data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        });
        yield put(updatedData(data));
        action.callbackSuccess();
        toastr.success('Update service successfully!');
    } catch (err) {
        toastr.error('Update service Fail!');
    }
}
export function* deleteDataReq(action) {
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.serviceApp + '/' + action._id, {
            method: 'DELETE'
        });
        yield put(deletedData(data));
        toastr.success('Delete service successfully!');
    } catch (err) {
        toastr.error('Delete service Fail!');
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
    yield takeLatest(GET_DATA, getData);
    yield takeLatest(GET_LIST_DATA, getListData);

    yield takeLatest(ADD_DATA, addDataReq);

    yield takeLatest(UPDATE_DATA, updateData);
    yield takeLatest(DELETE_DATA, deleteDataReq);
}
