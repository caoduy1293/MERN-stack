export const AUTHENTICATE_USER = 'bookingApp/AUTHENTICATE_USER';
export const AUTHENTICATE_USER_SUCCESS = 'bookingApp/AUTHENTICATE_USER_SUCCESS';
export const AUTHENTICATE_USER_ERROR = 'bookingApp/AUTHENTICATE_USER_ERROR';

export const LOGIN = 'Authorization App - login';
export const LOGIN_SUCCESS = 'Authorization App - login successfully';
export const LOGIN_FAIL = 'Authorization App - login fail';
export const GET_PENDING_RESERVATION = 'GLOBAL- GET_PENDING_RESERVATION';
export const GOT_PENDING_RESERVATION = 'GLOBAL- GOT_PENDING_RESERVATION';
export const LOGOUT = 'Authorization App - logOut';

export function getPendingReservation() {
    return {
        type: GET_PENDING_RESERVATION,
    };
}
export function gotPendingReservation(data) {
    return {
        type: GOT_PENDING_RESERVATION,
        data
    };
}

export function authenticateUser() {
    return {
        type: AUTHENTICATE_USER,
    };
}
export function authenticateUserSuccess(res) {
    return {
        type: AUTHENTICATE_USER_SUCCESS,
        res,
    };
}

export function authenticateUserError(res) {
    return {
        type: AUTHENTICATE_USER_ERROR,
        res,
    };
}

export function loginToSystem(data) {
    return {
        type: LOGIN, data
    };
}
export function loginSuccess(res) {
    return {
        type: LOGIN_SUCCESS,
        res,
    };
}
export function loginFail(res) {
    return {
        type: LOGIN_FAIL,
        res,
    };
}
