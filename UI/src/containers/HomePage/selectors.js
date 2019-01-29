import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { KEY_APP } from './constants';

const selectApp = state => state.get(KEY_APP, initialState);

const makeLoading = () => createSelector(selectApp, appState => appState.get('loading'));

const makeSelectRooms = () => createSelector(selectApp, appState => appState.get('rooms').toArray());
const makeSelectPartners = () => createSelector(selectApp, appState => appState.get('partners').toArray());
const makeSelectServices = () => createSelector(selectApp, appState => appState.get('services').toArray());

export { selectApp, makeLoading, makeSelectRooms, makeSelectPartners, makeSelectServices};
