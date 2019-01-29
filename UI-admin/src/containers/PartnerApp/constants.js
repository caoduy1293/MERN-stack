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

export const ADD_DATA = 'partner/ADD_DATA';
export const ADDED_DATA = 'partner/ADDED_DATA';

export const UPDATE_DATA = 'partner/UPDATE_DATA';
export const UPDATED_DATA = 'partner/UPDATED_DATA';

export const DELETE_DATA = 'partner/DELETE_DATA';
export const DELETED_DATA = 'partner/DELETED_DATA';

export const GET_DATA = 'partner/GET_GENERAL_DATA';
export const GOT_DATA = 'partner/GOT_GENERAL_DATA';

export const GET_LIST_DATA = 'partner/GET_LIST_DATA';
export const GOT_LIST_DATA = 'partner/GOT_LIST_DATA';

export const KEY_APP = 'partner';
