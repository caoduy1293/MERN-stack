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
export const ADD_DATA = 'news/ADD_DATA';
export const ADDED_DATA = 'news/ADDED_DATA';

export const UPDATE_DATA = 'news/UPDATE_DATA';
export const UPDATED_DATA = 'news/UPDATED_DATA';

export const DELETE_DATA = 'news/DELETE_DATA';
export const DELETED_DATA = 'news/DELETED_DATA';

export const GET_DATA = 'news/GET_GENERAL_DATA';
export const GOT_DATA = 'news/GOT_GENERAL_DATA';

export const GET_LIST_DATA = 'news/GET_LIST_DATA';
export const GOT_LIST_DATA = 'news/GOT_LIST_DATA';

export const GET_CATEGORY = 'news/GET_CATEGORY';
export const GOT_CATEGORY = 'news/GOT_CATEGORY';

export const ADD_CATEGORY = 'news/ADD_CATEGORY';
export const ADDED_CATEGORY = 'news/ADDED_CATEGORY';

export const UPDATE_CATEGORY = 'news/UPDATE_CATEGORY';
export const UPDATED_CATEGORY = 'news/UPDATED_CATEGORY';

export const KEY_APP = 'news';
