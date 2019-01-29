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

import {
    GOT_ROOMS, GOT_PARTNERS, GOT_SERVICES
} from './constants';

// The initial state of the App
export const initialState = fromJS({
    loading: false,
    partners: List([]),
    rooms: List([]),
    services: List([]),
});

function homeReducer(state = initialState, action) {
    switch (action.type) {
        case GOT_ROOMS:
            return state.set('listLoading', false)
                .set('rooms', List(action.data));

        case GOT_PARTNERS:
            return state.set('listLoading', false)
                .set('partners', List(action.data));

        case GOT_SERVICES:
            return state.set('listLoading', false)
                .set('services', List(action.data));
        default:
            return state;
    }
}

export default homeReducer;
