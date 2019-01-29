/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import nprogress from 'nprogress';

import { GET_DATA, GET_LIST_DATA, ADD_DATA, UPDATE_DATA, DELETE_DATA } from './constants';
import { API_URL } from '../App/constants';
import { gotData, gotListData, addedData, updatedData, deletedData } from './actions';
import request from 'utils/request';

export function* getData(action) {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.feedbackApp + '/' + action._id);
        yield put(gotData(data));
        nprogress.done();
    } catch (err) {
        toastr.error('Get feedback Fail!');
        nprogress.done();
    }
}

export function* getListData() {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.feedbackApp);
        yield put(gotListData(data));
        nprogress.done();
    } catch (err) {
        yield put(gotListData([]));
        toastr.error('Get Feedback Fail!');
        nprogress.done();
    }
}
export function* addData(action) {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.feedbackApp, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(action.data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        });
        yield put(addedData(data));
        action.callbackSuccess();
        toastr.success('Add a Feedback successfully!');
        nprogress.done();
    } catch (err) {
        toastr.error('Add a Feedback Fail!');
        nprogress.done();
    }
}
export function* updateData(action) {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, `${API_URL.feedbackApp}/${action.data._id}`, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(action.data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        });
        yield put(updatedData(data));
        action.callbackSuccess();
        toastr.success('Update feedback successfully!');
        nprogress.done();
    } catch (err) {
        toastr.error('Update feedback fail!');
        nprogress.done();
    }
}
export function* deleteDataReq(action) {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.feedbackApp + '/' + action._id, {
            method: 'DELETE'
        });
        yield put(deletedData(data));
        toastr.success('Delete feedback successfully!');
        nprogress.done();
    } catch (err) {
        toastr.error('Delete feedback fail!');
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
}
