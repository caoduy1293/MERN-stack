import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');
const selectRouter = state => {
    return state.get('route');
};
const makeSelectStartDate = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.get('startDate'),
    );
const makeSelectEndDate = () =>
    createSelector(
        selectGlobal,
        globalState => globalState.get('endDate'),
    );
const makeSelectLocation = () =>
    createSelector(
        selectRouter,
        routerState => {
            return routerState.get('location').toJS();
        }
    );
export {
    selectGlobal,
    makeSelectEndDate,
    makeSelectStartDate,
    makeSelectLocation,
};
