import { ADD_DATA, ADDED_DATA} from './constants';


export function addData(data) {
    return {
        type: ADD_DATA, data
    };
}

export function addedData(data) {
    return {
        type: ADDED_DATA,
        data
    };
}
