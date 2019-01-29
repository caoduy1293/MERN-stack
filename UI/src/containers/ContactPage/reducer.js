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

import {ADD_DATA, ADDED_DATA} from './constants';

// The initial state of the App
export const initialState = fromJS({
    data: fromJS({}),
    loading: false
});

function homeReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_DATA:
            return state.set('loading', true);
        case ADDED_DATA:
            return state.set('loading', false)
                .set('list', fromJS(action.data));
        default:
            return state;
    }
}

export default homeReducer;
