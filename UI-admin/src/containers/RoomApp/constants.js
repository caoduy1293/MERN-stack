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

export const ADD_DATA = 'Room/ADD_DATA';
export const ADDED_DATA = 'Room/ADDED_DATA';

export const UPDATE_DATA = 'Room/UPDATE_DATA';
export const UPDATED_DATA = 'Room/UPDATED_DATA';

export const DELETE_DATA = 'Room/DELETE_DATA';
export const DELETED_DATA = 'Room/DELETED_DATA';

export const GET_DATA = 'Room/GET_GENERAL_DATA';
export const GOT_DATA = 'Room/GOT_GENERAL_DATA';

export const GET_LIST_DATA = 'Room/GET_LIST_DATA';
export const GOT_LIST_DATA = 'Room/GOT_LIST_DATA';

export const GET_SERVICES = 'Room/GET_SERVICES';
export const GOT_SERVICES = 'Room/GOT_SERVICES';

export const RESET_DETAILS = 'Room/RESET_DETAILS';

export const KEY_APP = 'Room';
