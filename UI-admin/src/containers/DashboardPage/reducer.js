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

import {GET_GENERAL_DATA, GOT_GENERAL_DATA} from './constants';

// The initial state of the App
export const initialState = fromJS({
    data: null,
    loading: false,
});

function homeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_GENERAL_DATA:
            return state.set('loading', true);
        case GOT_GENERAL_DATA:
            return state.set('loading', false)
                        .set('data', (action.data));
        default:
            return state;
    }
}

export default homeReducer;
