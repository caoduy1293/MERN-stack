/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_DATA = 'Room/GET_DATA';
export const GOT_DATA = 'Room/GOT_DATA';

export const GET_LIST_DATA = 'Room/GET_LIST_DATA';
export const GOT_LIST_DATA = 'Room/GOT_LIST_DATA';

export const GET_LIST_DATA_AVAILABLE = 'Room/GET_LIST_DATA_AVAILABLE';
export const GOT_LIST_DATA_AVAILABLE = 'Room/GOT_LIST_DATA_AVAILABLE';

export const GET_BOOKING_DETAILS = 'Room/GET_BOOKING';
export const GOT_BOOKING_DETAILS = 'Room/GOT_BOOKING';

export const MAKE_BOOKING = 'Room/MAKE_BOOKING';
export const MADE_BOOKING = 'Room/MADE_BOOKING';

export const KEY_APP = 'Room';

export const RESERVATION_STATUSES = [
    {
        title: 'pending',
        value: 0
    },
    {
        title: 'approved',
        value: 1
    },
    {
        title: 'booked',
        value: 2
    },
    {
        title: 'released',
        value: 3
    }
];
