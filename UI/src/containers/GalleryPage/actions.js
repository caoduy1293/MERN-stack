import {
    GET_DATA, GOT_DATA, GET_LIST_DATA,
    GOT_LIST_DATA, GET_TYPES, GOT_TYPES
} from './constants';

export function getData(id) {
    return {
        type: GET_DATA,
        id
    };
}
export function gotData(data) {
    return {
        type: GOT_DATA,
        data
    };
}

export function getListData(cbSuccess) {
    return {
        type: GET_LIST_DATA, cbSuccess
    };
}
export function gotListData(data) {
    return {
        type: GOT_LIST_DATA,
        data
    };
}

export function getTypes(cbSuccess) {
    return {
        type: GET_TYPES, cbSuccess
    };
}
export function gotTypes(data) {
    return {
        type: GOT_TYPES,
        data
    };
}
