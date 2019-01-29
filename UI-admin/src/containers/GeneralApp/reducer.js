/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import {fromJS} from 'immutable';

import {GET_DATA, GOT_DATA, GET_LIST_DATA, GOT_LIST_DATA,
    ADD_DATA, ADDED_DATA, UPDATE_DATA, UPDATED_DATA, DELETE_DATA, DELETED_DATA} from './constants';

// The initial state of the App
export const initialState = fromJS({
    data: null,
    loading: false,
    list: [],
    listLoading: false,
});

function homeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DATA:
            return state.set('loading', true);
        case GOT_DATA:
            return state.set('loading', false)
                .set('data', (action.data));
        case GET_LIST_DATA:
            return state.set('listLoading', true);
        case GOT_LIST_DATA:
            return state.set('listLoading', false)
                .set('list', (action.data));
        case ADD_DATA:
            return state.set('loading', true);
        case ADDED_DATA:
            return state.set('loading', false)
                .set('list', (action.data));
        case UPDATE_DATA:
            return state.set('loading', true);
        case UPDATED_DATA:
            return state.set('loading', false)
                .set('list', (action.data));
        case DELETE_DATA:
            return state.set('loading', true);
        case DELETED_DATA:
            return state.set('loading', false)
                .set('list', (action.data));
        default:
            return state;
    }
}

export default homeReducer;
