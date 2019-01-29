import {
    GET_DATA, GOT_DATA, ADD_DATA, ADDED_DATA,
    UPDATE_DATA, UPDATED_DATA, DELETE_DATA, DELETED_DATA,
    GET_LIST_DATA, GOT_LIST_DATA, ADD_TYPE, ADDED_TYPE, GET_TYPE, GOT_TYPE, DELETE_TYPE, DELETED_TYPE
} from './constants';

export function getData(_id) {
    return {
        type: GET_DATA,
        _id
    };
}
export function gotData(data) {
    return {
        type: GOT_DATA,
        data
    };
}
export function addData(data, callbackSuccess) {
    return {
        type: ADD_DATA,
        data,
        callbackSuccess
    };
}

export function addedData(data) {
    return {
        type: ADDED_DATA,
        data
    };
}
export function updateData(data, callbackSuccess) {
    return {
        type: UPDATE_DATA, data, callbackSuccess
    };
}

export function updatedData(data) {
    return {
        type: UPDATED_DATA,
        data
    };
}
export function deleteData(_id) {
    return {
        type: DELETE_DATA, _id
    };
}

export function deletedData(data) {
    return {
        type: DELETED_DATA, data
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

export function getType() {
    return {
        type: GET_TYPE
    };
}
export function gotType(data) {
    return {
        type: GOT_TYPE, data
    };
}

export function addType(data) {
    return {
        type: ADD_TYPE, data
    };
}
export function addedType(data) {
    return {
        type: ADDED_TYPE, data
    };
}

export function updateType(data) {
    return {
        type: UPDATE_DATA, data
    };
}
export function updatedType(data) {
    return {
        type: UPDATED_DATA, data
    };
}
export function deleteType(id) {
    return {
        type: DELETE_TYPE, id
    };
}
export function deletedType(data) {
    return {
        type: DELETED_TYPE, data
    };
}
