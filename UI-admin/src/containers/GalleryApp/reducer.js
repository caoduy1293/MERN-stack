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
import { fromJS, List, Map } from 'immutable';

import {
    GET_DATA,
    GOT_DATA,
    GET_LIST_DATA,
    GOT_LIST_DATA,
    ADD_DATA,
    ADDED_DATA,
    UPDATE_DATA,
    UPDATED_DATA,
    DELETE_DATA,
    DELETED_DATA,
    GET_TYPE,
    GOT_TYPE,
    ADDED_TYPE,
    UPDATED_TYPE, DELETED_TYPE
} from './constants';

// The initial state of the App
export const initialState = fromJS({
    data: Map({}),
    loading: false,
    list: List([]),
    listLoading: false,
    types: List([])
});

function homeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DATA:
        case GET_LIST_DATA:
        case DELETE_DATA:
        case ADD_DATA:
        case UPDATE_DATA:
            return state.set('loading', true);
        case GOT_DATA:
            return state.set('loading', false)
                .set('data', Map(action.data));
        case GOT_LIST_DATA:
            return state.set('loading', false)
                .set('list', List(action.data));
        case ADDED_DATA:
            return state.set('loading', false)
                .update('list', array => array.push(action.data));
        case UPDATED_DATA:
            const indexOfListToUpdate = state.get('list').findIndex(listItem => {
                return listItem._id === action.data._id;
            });
            return state.set('loading', false)
                .setIn(['list', indexOfListToUpdate], action.data);
        case DELETED_DATA:
            return state.set('loading', false)
                .set('list', state.get('list').filter(o => {
                    console.log(o);
                    return o._id !== action.data._id;
                }));

        case DELETED_TYPE:
            return state.set('types', state.get('types').filter(o => {
                    return o._id !== action.data._id;
                }));

        //    types
        case GOT_TYPE:
            return state.set('types', List(action.data));
        case ADDED_TYPE:
            return state.set('types', action.data);
        case UPDATED_TYPE:
            return state.set('types', action.data);

        default:
            return state;
    }
}

export default homeReducer;
