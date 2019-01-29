/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import {toastr} from "react-redux-toastr";
import nprogress from "nprogress";

import {
    GET_DATA,
    GET_LIST_DATA,
    ADD_DATA,
    UPDATE_DATA,
    DELETE_DATA,
    GET_ROOM_INFO, GET_ROOMS, MARK_RESERVATION_RELEASED
} from './constants';
import { API_URL } from '../App/constants';
import {
    gotData,
    gotListData,
    addedData,
    updatedData,
    deletedData, gotRoomDetails, gotRooms, markedReleased
} from './actions';
import request from 'utils/request';

export function* getData(action) {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.reservationApp + '/' + action._id);
        yield put(gotData(data));
        nprogress.done();
    } catch (err) {
        toastr.error('Get Reservation Fail!');
        nprogress.done();
    }
}

export function* getListData() {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.reservationApp);
        yield put(gotListData(data));
        nprogress.done();
    } catch (err) {
        yield put(gotListData([]));
        toastr.success('Get Reservations Fail!');
        nprogress.done();
    }
}
export function* addData(action) {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.reservationApp, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(action.data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        });
        yield put(addedData(data));
        action.callbackSuccess();
        toastr.success('Add Reservation successfully!');
        nprogress.done();
    } catch (err) {
        toastr.error('Add feedback Fail!');
        nprogress.done();
    }
}
export function* updateData(action) {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.reservationApp + '/' + action.data._id, {
            method: 'PUT', // or 'PUT'
            body: JSON.stringify(action.data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        });
        yield put(updatedData(data));
        action.callbackSuccess();
        toastr.success('Update reservation successfully!');
        nprogress.done();
    } catch (err) {
        toastr.error('Update reservation fail!');
        nprogress.done();
    }
}
export function* deleteData(action) {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.reservationApp + '/' + action._id);
        yield put(deletedData(data));
        toastr.success('Delete reservation successfully!');
        nprogress.done();
    } catch (err) {
        toastr.error('Delete reservation Fail!');
        nprogress.done();
    }
}

export function* markReservationReleasedReq(action) {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, `${API_URL.reservationAppMarkReleased}/${action.data._id}`);
        yield put(markedReleased(data));
        toastr.success('mark reservation released successfully!');
        nprogress.done();
    } catch (err) {
        toastr.error('mark reservation released Fail!');
        nprogress.done();
    }
}

export function* getRoomDetailsReq(action) {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.roomApp + '/' + action._id);
        yield put(gotRoomDetails(data));
        nprogress.done();
    } catch (err) {
        toastr.error('Get Room fail!');
        nprogress.done();
    }
}
export function* getRoomsReq() {
    nprogress.start();
    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.roomApp);
        yield put(gotRooms(data));
        nprogress.done();
    } catch (err) {
        toastr.error('Get Rooms Fail!');
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
    yield takeLatest(DELETE_DATA, deleteData);

    yield takeLatest(MARK_RESERVATION_RELEASED, markReservationReleasedReq);

    yield takeLatest(GET_ROOM_INFO, getRoomDetailsReq);
    yield takeLatest(GET_ROOMS, getRoomsReq);
}
