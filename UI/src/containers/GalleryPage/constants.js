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

export const GET_DATA = 'Gallery/GET_DATA';
export const GOT_DATA = 'Gallery/GOT_DATA';

export const GET_LIST_DATA = 'Gallery/GET_LIST_DATA';
export const GOT_LIST_DATA = 'Gallery/GOT_LIST_DATA';

export const GET_TYPES = 'Gallery/GET_TYPES';
export const GOT_TYPES = 'Gallery/GOT_TYPES';

export const KEY_APP = 'gallery';
