import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { KEY_APP } from './constants';

const selectApp = state => state.get(KEY_APP, initialState);

const makeSelectData = () => createSelector(selectApp, appState => appState.get('data').toObject());
const makeLoading = () => createSelector(selectApp, appState => appState.get('loading'));
const makeSelectListData = () => createSelector(selectApp, appState => appState.get('list').toArray());

const makeSelectListAvailableData = () => createSelector(selectApp, appState => appState.get('listAvailable').toArray());

const makeListLoading = () => createSelector(selectApp, appState => appState.get('listLoading'));
const makeBookedObj = () => createSelector(selectApp, appState => appState.get('bookedObj').toObject());

const makeSelectBookingDetails = () => createSelector(selectApp, appState => appState.get('bookingDetails').toObject());

export { selectApp, makeSelectData, makeLoading, makeSelectListData, makeListLoading,
    makeBookedObj, makeSelectListAvailableData, makeSelectBookingDetails };
