import { createSelector } from 'reselect/es';

import { SELECTOR_ID_PAGE } from '../constants';
import { STATE_FIELD_NAME } from './reducer';

const selectGlobal = (state) => state.get(SELECTOR_ID_PAGE);

const selectRoute = (state) => state['route'];

const getAuthenticateLoading = () => createSelector(
    selectGlobal,
    (globalState) => globalState[STATE_FIELD_NAME.loading]
);
const getAuthenticateError = () => createSelector(
    selectGlobal,
    (globalState) => globalState[STATE_FIELD_NAME.error]
);
const getAuthenticateMessage = () => createSelector(
    selectGlobal,
    (globalState) => globalState[STATE_FIELD_NAME.message]
);
const getAuthenticatedUser = () => createSelector(
    selectGlobal,
    (globalState) => globalState[STATE_FIELD_NAME.authenticatedUser]
);

const getUserToken = () => createSelector(
    selectGlobal,
    (globalState) => globalState[STATE_FIELD_NAME.accessToken]
);

const makeSelectPendingReservation = () => createSelector(selectGlobal, appState => {
    return appState.get(STATE_FIELD_NAME.pendingReservation).toArray();
});

const makeSelectLocation = () => createSelector(
    selectRoute,
    (routeState) => routeState['location'].toJS()
);

export {
    selectGlobal,
    getAuthenticateLoading,
    getAuthenticateError,
    getAuthenticateMessage,
    getAuthenticatedUser,
    getUserToken,
    makeSelectLocation,
    makeSelectPendingReservation
};
