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

export const ADD_DATA = 'gallery/ADD_DATA';
export const ADDED_DATA = 'gallery/ADDED_DATA';

export const UPDATE_DATA = 'gallery/UPDATE_DATA';
export const UPDATED_DATA = 'gallery/UPDATED_DATA';

export const DELETE_DATA = 'gallery/DELETE_DATA';
export const DELETED_DATA = 'gallery/DELETED_DATA';

export const GET_DATA = 'gallery/GET_GENERAL_DATA';
export const GOT_DATA = 'gallery/GOT_GENERAL_DATA';

export const GET_LIST_DATA = 'gallery/GET_LIST_DATA';
export const GOT_LIST_DATA = 'gallery/GOT_LIST_DATA';

export const GET_TYPE = 'gallery/GET_TYPE';
export const GOT_TYPE = 'gallery/GOT_TYPE';

export const ADD_TYPE = 'gallery/ADD_TYPE';
export const ADDED_TYPE = 'gallery/ADDED_TYPE';

export const UPDATE_TYPE = 'gallery/UPDATE_TYPE';
export const UPDATED_TYPE = 'gallery/UPDATED_TYPE';

export const DELETE_TYPE = 'gallery/DELETE_TYPE';
export const DELETED_TYPE = 'gallery/DELETED_TYPE';

export const KEY_APP = 'gallery';
