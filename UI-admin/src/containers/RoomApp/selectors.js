import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { KEY_APP } from './constants';

const selectApp = state => state.get(KEY_APP, initialState);

const makeSelectData = () => createSelector(selectApp, appState => appState.get('data').toObject());
const makeLoading = () => createSelector(selectApp, appState => appState.get('loading'));

const makeSelectListData = () => createSelector(selectApp, appState => appState.get('list').toArray());
const makeListLoading = () => createSelector(selectApp, appState => appState.get('listLoading'));

const makeServices = () => createSelector(selectApp, appState => appState.get('services').toArray());

export { selectApp, makeSelectData, makeLoading, makeSelectListData, makeListLoading, makeServices };
