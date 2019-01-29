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

export const ADD_DATA = 'feedback/ADD_DATA';
export const ADDED_DATA = 'feedback/ADDED_DATA';

export const UPDATE_DATA = 'feedback/UPDATE_DATA';
export const UPDATED_DATA = 'feedback/UPDATED_DATA';

export const DELETE_DATA = 'feedback/DELETE_DATA';
export const DELETED_DATA = 'feedback/DELETED_DATA';

export const GET_DATA = 'feedback/GET_GENERAL_DATA';
export const GOT_DATA = 'feedback/GOT_GENERAL_DATA';

export const GET_LIST_DATA = 'feedback/GET_LIST_DATA';
export const GOT_LIST_DATA = 'feedback/GOT_LIST_DATA';

export const KEY_APP = 'feedback';
