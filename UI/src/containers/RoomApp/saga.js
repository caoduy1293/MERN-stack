import { call, put, takeLatest } from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import nprogress from "nprogress";

import {GET_BOOKING_DETAILS, GET_DATA, GET_LIST_DATA, GET_LIST_DATA_AVAILABLE, MAKE_BOOKING} from './constants';
import { API_URL } from '../App/constants';
import {gotBookingDetails, gotData, gotListData, gotListDataAvailable, madeBooking, getData} from './actions';
import request from '../../utils/request';

export function* getDataReq(action) {

    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, `${API_URL.roomApp}/${action.id}`);
        yield put(gotData(data));
        action.cbSuccess();
    } catch (err) {
        toastr.error('Get Room details fail!');
    }
}

export function* getListDataReq() {

    try {
        // Call our request helper (see 'utils/request')
        let url = API_URL.roomApp;
        const data = yield call(request, url);
        yield put(gotListData(data));
    } catch (err) {
        yield put(gotListData([]));
    }
}

export function* getListAvailableDataReq(action) {

    try {
        // Call our request helper (see 'utils/request')
        let url = API_URL.roomApp;
        if(action.filterObj) {
            url = `${API_URL.roomAppAvailable}?startDate=${action.filterObj.startDate}&endDate=${action.filterObj.endDate}`
        }
        const data = yield call(request, url);
        yield put(gotListDataAvailable(data));
    } catch (err) {
        yield put(gotListDataAvailable([]));
    }
}

export function* getBookingDetailsReq(action) {

    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, `${API_URL.reservationApp}/${action._id}`);
        yield put(gotBookingDetails(data));
        yield put(getData(data.roomId));
    } catch (err) {
        toastr.error('Get Booking Fail!');
    }
}

export function* makeBookingReq(action) {
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
        yield put(madeBooking(data));
        action.cbSuccess();
        nprogress.done();
    } catch (err) {
        toastr.error('Book Reservation Fail!');
        nprogress.done();
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {

    yield takeLatest(GET_DATA, getDataReq);
    yield takeLatest(GET_LIST_DATA, getListDataReq);

    yield takeLatest(GET_LIST_DATA_AVAILABLE, getListAvailableDataReq);

    yield takeLatest(GET_BOOKING_DETAILS, getBookingDetailsReq);

    yield takeLatest(MAKE_BOOKING, makeBookingReq);
}
