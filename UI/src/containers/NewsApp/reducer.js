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
import {fromJS, List} from 'immutable';

import {GET_DATA, GOT_DATA, GET_LIST_DATA, GOT_LIST_DATA, GOT_TYPES} from './constants';

// The initial state of the App
export const initialState = fromJS({
    data: fromJS({}),
    loading: false,
    list: List([]),
    listLoading: false,
    types: List([]),
});

function homeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DATA:
        case GET_LIST_DATA:
            return state.set('loading', true);
        case GOT_DATA:
            return state.set('loading', false)
                .set('data', fromJS(action.data));
        case GOT_LIST_DATA:
            return state.set('listLoading', false)
                .set('list', List(action.data));
        //types
        case GOT_TYPES:
            return state.set('types', List(action.data));
        default:
            return state;
    }
}

export default homeReducer;
