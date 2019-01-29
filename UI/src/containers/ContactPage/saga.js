/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import nprogress from "nprogress";

import { ADD_DATA } from './constants';
import { API_URL } from '../App/constants';
import { addedData } from './actions';
import request from '../../utils/request';

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
        toastr.success('Submit successfully. We will contact to you as soon as possible. Thanks ');
        nprogress.done();
    } catch (err) {
        toastr.error('Submit Fail. If possible, could you call us directly, please?');
        nprogress.done();
    }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
    yield takeLatest(ADD_DATA, addData);
}
