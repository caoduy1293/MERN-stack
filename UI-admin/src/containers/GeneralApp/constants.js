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

export const ADD_DATA = 'general/ADD_DATA';
export const ADDED_DATA = 'general/ADDED_DATA';

export const UPDATE_DATA = 'general/UPDATE_DATA';
export const UPDATED_DATA = 'general/UPDATED_DATA';

export const DELETE_DATA = 'general/DELETE_DATA';
export const DELETED_DATA = 'general/DELETED_DATA';

export const GET_DATA = 'general/GET_GENERAL_DATA';
export const GOT_DATA = 'general/GOT_GENERAL_DATA';

export const GET_LIST_DATA = 'general/GET_LIST_DATA';
export const GOT_LIST_DATA = 'general/GOT_LIST_DATA';

export const KEY_APP = 'general';
