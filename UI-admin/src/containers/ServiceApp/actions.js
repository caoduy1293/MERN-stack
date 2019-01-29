import { GET_DATA, GOT_DATA, ADD_DATA, ADDED_DATA,
    UPDATE_DATA, UPDATED_DATA, DELETE_DATA, DELETED_DATA,
    GET_LIST_DATA, GOT_LIST_DATA} from './constants';

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
