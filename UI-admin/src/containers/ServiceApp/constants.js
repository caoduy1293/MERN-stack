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

export const ADD_DATA = 'services/ADD_DATA';
export const ADDED_DATA = 'services/ADDED_DATA';

export const UPDATE_DATA = 'services/UPDATE_DATA';
export const UPDATED_DATA = 'services/UPDATED_DATA';

export const DELETE_DATA = 'services/DELETE_DATA';
export const DELETED_DATA = 'services/DELETED_DATA';

export const GET_DATA = 'services/GET_GENERAL_DATA';
export const GOT_DATA = 'services/GOT_GENERAL_DATA';

export const GET_LIST_DATA = 'services/GET_LIST_DATA';
export const GOT_LIST_DATA = 'services/GOT_LIST_DATA';

export const KEY_APP = 'services';
