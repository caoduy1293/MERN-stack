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
import {fromJS, List, Map} from 'immutable';

import {
    GET_DATA,
    GOT_DATA,
    GET_LIST_DATA,
    GOT_LIST_DATA,
    MADE_BOOKING,
    GOT_LIST_DATA_AVAILABLE,
    GOT_BOOKING_DETAILS
} from './constants';

// The initial state of the App
export const initialState = fromJS({
    data: Map(null),
    loading: false,
    list: List([]),
    listAvailable: List([]),
    listLoading: false,
    bookedObj: Map({}),
    bookingDetails: Map({})
});

function homeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DATA:
        case GET_LIST_DATA:
            return state.set('loading', true);
        case GOT_DATA:
            return state.set('loading', false)
                .set('data', Map(action.data));
        case GOT_LIST_DATA:
            return state.set('listLoading', false)
                .set('list', List(action.data));

        case GOT_LIST_DATA_AVAILABLE:
            return state.set('listAvailable', List(action.data));

        case GOT_BOOKING_DETAILS:
            return state.set('bookingDetails', Map(action.data));

        case MADE_BOOKING:
            return state.set('bookedObj', Map(action.data));

        default:
            return state;
    }
}

export default homeReducer;
