import {
    GET_DATA,
    GOT_DATA,
    GET_LIST_DATA,
    GOT_LIST_DATA,
    MAKE_BOOKING,
    MADE_BOOKING, GET_LIST_DATA_AVAILABLE, GOT_LIST_DATA_AVAILABLE, GET_BOOKING_DETAILS, GOT_BOOKING_DETAILS
} from './constants';

export function getData(id, cbSuccess) {
    return {
        type: GET_DATA,
        id,
        cbSuccess
    };
}
export function gotData(data) {
    return {
        type: GOT_DATA,
        data
    };
}

export function getListData() {
    return {
        type: GET_LIST_DATA
    };
}
export function gotListData(data) {
    return {
        type: GOT_LIST_DATA,
        data
    };
}

export function getListDataAvailable(filterObj) {
    return {
        type: GET_LIST_DATA_AVAILABLE,
        filterObj
    };
}
export function gotListDataAvailable(data) {
    return {
        type: GOT_LIST_DATA_AVAILABLE,
        data
    };
}

export function getBookingDetails(_id) {
    return {
        type: GET_BOOKING_DETAILS, _id
    };
}
export function gotBookingDetails(data) {
    return {
        type: GOT_BOOKING_DETAILS,
        data
    };
}

export function makeBooking(data, cbSuccess) {
    return {
        type: MAKE_BOOKING, data, cbSuccess
    };
}
export function madeBooking(data) {
    return {
        type: MADE_BOOKING,
        data
    };
}


