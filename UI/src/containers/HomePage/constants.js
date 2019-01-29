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
export const GET_ROOMS = 'Home/GET_ROOMS';
export const GOT_ROOMS = 'Home/GOT_ROOMS';

export const GET_PARTNERS = 'Home/GET_PARTNERS';
export const GOT_PARTNERS = 'Home/GOT_PARTNERS';

export const GET_SERVICES = 'Home/GET_SERVICES';
export const GOT_SERVICES = 'Home/GOT_SERVICES';

export const KEY_APP = 'Home';
