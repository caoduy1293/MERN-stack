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

export const ADD_DATA = 'reservation/ADD_DATA';
export const ADDED_DATA = 'reservation/ADDED_DATA';

export const UPDATE_DATA = 'reservation/UPDATE_DATA';
export const UPDATED_DATA = 'reservation/UPDATED_DATA';

export const DELETE_DATA = 'reservation/DELETE_DATA';
export const DELETED_DATA = 'reservation/DELETED_DATA';

export const GET_DATA = 'reservation/GET_GENERAL_DATA';
export const GOT_DATA = 'reservation/GOT_GENERAL_DATA';

export const GET_LIST_DATA = 'reservation/GET_LIST_DATA';
export const GOT_LIST_DATA = 'reservation/GOT_LIST_DATA';

export const GET_STATUSES = 'reservation/GET_STATUSES';
export const GOT_STATUSES = 'reservation/GOT_STATUSES';

export const GET_ROOM_INFO = 'reservation/GET_ROOM_INFO';
export const GOT_ROOM_INFO = 'reservation/GOT_ROOM_INFO';

export const GET_ROOMS = 'reservation/GET_ROOMS';
export const GOT_ROOMS = 'reservation/GOT_ROOMS';

export const MARK_RESERVATION_RELEASED = 'reservation/MARK_RESERVATION_RELEASED';
export const MARKED_RESERVATION_RELEASED = 'reservation/MARKED_RESERVATION_RELEASED';

export const KEY_APP = 'reservation';

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
