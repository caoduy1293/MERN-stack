/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_PARTNERS, GET_ROOMS, GET_SERVICES} from './constants';
import { API_URL } from '../App/constants';
import {gotPartners, gotRooms, gotServices} from './actions';

import request from '../../utils/request';

export function* getRoomsReq() {

    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.roomApp);
        yield put(gotRooms(data));
    } catch (err) {

    }
}

export function* getPartnersReq() {

    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.partnerApp);
        yield put(gotPartners(data));
    } catch (err) {

    }
}

export function* getServicesReq() {

    try {
        // Call our request helper (see 'utils/request')
        const data = yield call(request, API_URL.serviceApp);
        yield put(gotServices(data));
    } catch (err) {
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {

    yield takeLatest(GET_ROOMS, getRoomsReq);

    yield takeLatest(GET_PARTNERS, getPartnersReq);

    yield takeLatest(GET_SERVICES, getServicesReq);

}
