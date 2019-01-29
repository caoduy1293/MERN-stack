import { call, put, takeLatest } from 'redux-saga/effects';
import {toastr} from "react-redux-toastr";
import {push} from 'react-router-redux';

import {GET_DATA, GET_LIST_DATA, ADD_DATA, UPDATE_DATA, DELETE_DATA, GET_SERVICES} from './constants';
import { API_URL, ROUTE_TREE } from '../App/constants';
import {gotData, gotListData, addedData, updatedData, deletedData, gotServices} from './actions';
import request from '../../utils/request';

export function* getData(action) {
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.roomApp + '/' + action._id);
        yield put(gotData(data));
    } catch (err) {
        toastr.error('Get Room Fail!');
    }
}

export function* getListData() {
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.roomApp);
        yield put(gotListData(data));
    } catch (err) {
        toastr.error('Get Rooms Fail!');
    }
}

export function* addData(action) {
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.roomApp, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(action.data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        });
        yield put(addedData(data));
        action.callbackSuccess();
        toastr.success('Add reservation successfully!');
    } catch (err) {
        toastr.error('Add reservation Fail!');
    }
}

export function* updateData(action) {
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.roomApp + '/' + action.data._id, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(action.data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        });
        yield put(updatedData(data));
        // action.callbackSuccess();
        yield put(push('/' + ROUTE_TREE.rooms))
        toastr.success('Update room successfully!');
    } catch (err) {
        toastr.error('Update room Fail!');
    }
}

export function* deleteDataReq(action) {
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.roomApp + '/' + action._id, {
            method: 'DELETE'
        });
        yield put(deletedData(data));
        toastr.success('Delete Room successfully!');
    } catch (err) {
        toastr.error('Delete Room Fail!');
    }
}

export function* getServicesReq() {
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.serviceApp);
        yield put(gotServices(data));
    } catch (err) {
        yield put(gotServices([]));
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

    yield takeLatest(GET_SERVICES, getServicesReq);
}
