import {
    GET_DATA,
    GOT_DATA,
    ADD_DATA,
    ADDED_DATA,
    UPDATE_DATA,
    UPDATED_DATA,
    DELETE_DATA,
    DELETED_DATA,
    GET_LIST_DATA,
    GOT_LIST_DATA,
    GET_CATEGORY,
    GOT_CATEGORY,
    ADD_CATEGORY,
    ADDED_CATEGORY,
    UPDATE_CATEGORY,
    UPDATED_CATEGORY
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

export function getCategory() {
    return {
        type: GET_CATEGORY
    };
}
export function gotCategory(data) {
    return {
        type: GOT_CATEGORY, data
    };
}

export function addCategory(data) {
    return {
        type: ADD_CATEGORY, data
    };
}
export function addedCategory(data) {
    return {
        type: ADDED_CATEGORY, data
    };
}

export function updateCategory(data) {
    return {
        type: UPDATE_CATEGORY, data
    };
}
export function updatedCategory(data) {
    return {
        type: UPDATED_CATEGORY, data
    };
}
