import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { KEY_APP } from './constants';

const selectApp = state => state.get(KEY_APP, initialState);

const makeSelectData = () => createSelector(selectApp, appState => appState.get('data').toObject());
const makeLoading = () => createSelector(selectApp, appState => appState.get('loading'));
const makeSelectListData = () => createSelector(selectApp, appState => appState.get('list').toArray());
const makeSelectListLoading = () => createSelector(selectApp, appState => appState.get('listLoading'));

const makeTypes = () => createSelector(selectApp, appState => appState.get('types').toArray());

export { selectApp, makeSelectData, makeLoading, makeSelectListData, makeSelectListLoading, makeTypes };
