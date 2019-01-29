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
    GOT_DATA, GOT_LIST_DATA, ADDED_DATA,
    UPDATED_DATA, DELETED_DATA, GOT_SERVICES, RESET_DETAILS
} from './constants';

// The initial state of the App
export const initialState = fromJS({
    data: Map({}),
    loading: false,
    list: List([]),
    listLoading: false,
    services: List([])
});

function homeReducer(state = initialState, action) {
    switch (action.type) {
        case GOT_DATA:
            return state.set('loading', false)
                        .set('data', Map(action.data));
        case GOT_LIST_DATA:
            return state.set('listLoading', false)
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
                    return o._id !== action.data._id;
                }));

        case GOT_SERVICES:
            return state.set('services', List(action.data));

        case RESET_DETAILS:
            return state.set('data', Map({}));

        default:
            return state;
    }
}

export default homeReducer;
