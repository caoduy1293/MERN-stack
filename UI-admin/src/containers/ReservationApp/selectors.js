import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { KEY_APP } from './constants';

const selectApp = state => state.get(KEY_APP, initialState);

const makeSelectData = () => createSelector(selectApp, appState => appState.get('data').toObject());
const makeLoading = () => createSelector(selectApp, appState => appState.get('loading'));

const makeSelectListData = () => createSelector(selectApp, appState => appState.get('list').toArray());
const makeListLoading = () => createSelector(selectApp, appState => appState.get('listLoading'));

const makeClientInfo = () => createSelector(selectApp, appState => appState.get('clientInfo'));
const makeRoomDetails = () => createSelector(selectApp, appState => appState.get('roomDetails'));

const makeRooms = () => createSelector(selectApp, appState => appState.get('rooms').toArray());

export { selectApp, makeSelectData, makeLoading, makeSelectListData, makeListLoading,
    makeClientInfo, makeRoomDetails, makeRooms };
