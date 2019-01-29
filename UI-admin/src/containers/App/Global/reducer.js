import {fromJS, List, Map} from 'immutable';

import {
    AUTHENTICATE_USER, AUTHENTICATE_USER_ERROR, AUTHENTICATE_USER_SUCCESS, CHANGE_USER_INPUT, GOT_PENDING_RESERVATION,
    LOGIN, LOGIN_FAIL, LOGIN_SUCCESS,
} from './actions';
import {LOCAL_STORAGE_ID_KEY} from "../constants";

/**
 * this need to by syns with initialState object field name
 */
export const STATE_FIELD_NAME = {
    loading: 'loading',
    error: 'error',
    message: 'message',
    authenticatedUser: 'authenticatedUser',
    accessToken: 'accessToken',
    pendingReservation: 'pendingReservation',
};

// The initial state of the App
const initialState = fromJS({
    loading: false,
    error: false,
    message: '',
    authenticatedUser: Map({}),
    accessToken: '',
    pendingReservation: List([])
});

function globalReducer(state = initialState, action) {
    switch (action.type) {

        case LOGIN:
        case AUTHENTICATE_USER:
            return state.set(STATE_FIELD_NAME.loading, true)
                .set(STATE_FIELD_NAME.message, '')
                .set(STATE_FIELD_NAME.error, false);

        case LOGIN_SUCCESS:
            localStorage.setItem(LOCAL_STORAGE_ID_KEY.token, action.res.token.accessToken);
            return state.set(STATE_FIELD_NAME.loading, false)
                .set(STATE_FIELD_NAME.accessToken, action.res.token.accessToken);
        case LOGIN_FAIL:
            return state.set(STATE_FIELD_NAME.loading, false)
                .set(STATE_FIELD_NAME.error, true)
                .set(STATE_FIELD_NAME.message, 'Wrong Email or Password');

        case AUTHENTICATE_USER_SUCCESS:
            return state.set(STATE_FIELD_NAME.loading, false)
                .set(STATE_FIELD_NAME.authenticatedUser, Map(action.res.user));

        case AUTHENTICATE_USER_ERROR:
            return state.set(STATE_FIELD_NAME.loading, false)
                .set(STATE_FIELD_NAME.error, action.error);

        case GOT_PENDING_RESERVATION:
            return state.set(STATE_FIELD_NAME.pendingReservation, List(action.data));

        default:
            return state;
    }
}

export default globalReducer;
