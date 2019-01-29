import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { KEY_APP } from './constants';

const selectApp = state => state.get(KEY_APP, initialState);

const makeSelectData = () => createSelector(selectApp, appState => appState.get('data').toObject());
const makeLoading = () => createSelector(selectApp, appState => appState.get('loading'));

const makeSelectListData = () => createSelector(selectApp, appState => appState.get('list').toArray());
const makeListLoading = () => createSelector(selectApp, appState => appState.get('listLoading'));

const makeCategories = () => createSelector(selectApp, appState => appState.get('categories').toArray());

export { selectApp, makeSelectData, makeLoading, makeSelectListData, makeListLoading, makeCategories };
