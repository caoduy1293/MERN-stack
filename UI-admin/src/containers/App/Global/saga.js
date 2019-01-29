import { put, call, fork, select, takeLatest, all } from 'redux-saga/effects';
import { push } from "react-router-redux";

import {
    AUTHENTICATE_USER, AUTHENTICATE_USER_SUCCESS, GET_PENDING_RESERVATION, gotPendingReservation, LOGIN,
    LOGIN_SUCCESS
} from './actions';
import request from '../../../utils/request';
import { authenticateUserError, authenticateUserSuccess, loginFail, loginSuccess } from './actions';
import {API_URL} from "../constants";

export function* authToSystem() {
    try {
        const res = yield call(request, API_URL.authApp.me, {
            method: 'post',
        });
        yield put(authenticateUserSuccess(res));
    } catch (error) {
        yield put(authenticateUserError(error));
    }
}

export function* authToSystemSuccess() {
    yield put(push('/'));
}

export function* loginToSystemSuccess() {
    yield put(push('/'));
}


export function* loginToSystem(action) {
    try {
        const email = action.data.email;
        const password = action.data.password;
        const res = yield call(request, API_URL.authApp.login, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        yield put(loginSuccess(res));
    } catch (error) {
        yield put(loginFail(error));
    }
}

export function* getPendingReservationReq() {
    try {
        const res = yield call(request, API_URL.reservationAppPending);
        yield put(gotPendingReservation(res));
    } catch (error) {
    }
}

export default function* rootSaga() {
    yield takeLatest(LOGIN, loginToSystem);
    yield takeLatest(LOGIN_SUCCESS, loginToSystemSuccess);
    yield takeLatest(AUTHENTICATE_USER, authToSystem);
    yield takeLatest(AUTHENTICATE_USER_SUCCESS, authToSystemSuccess);

    yield takeLatest(GET_PENDING_RESERVATION, getPendingReservationReq);
}
