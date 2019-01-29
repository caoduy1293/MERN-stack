/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import {Helmet} from 'react-helmet';
import {compose} from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import {KEY_APP} from './constants';
import ReservationList from "./ReservationList";
import ReservationDetails from "./ReservationDetails";
import FancyRoute from "../App/FancyRoute";
import {Switch} from "react-router-dom";
import {ROUTE_TREE} from "../App/constants";

import NotFoundPage from 'containers/NotFoundPage/Loadable';

const routes = [
    {
        title: 'Reservation List',
        path: `/${ROUTE_TREE.reservation}/`,
        exact: true,
        component: ReservationList
    },
    {
        title: 'Reservation adding',
        path: `/${ROUTE_TREE.reservation}/${ROUTE_TREE.reservationAdd}/`,
        component: ReservationDetails
    },
    {
        title: 'Reservation Details',
        path: `/${ROUTE_TREE.reservation}/${ROUTE_TREE.reservationDetails}/:id`,
        component: ReservationDetails
    },
    {
        title: 'Not Found',
        path: '',
        component: NotFoundPage
    }
];
class ReservationApp extends React.Component {


  render() {
    return (
        <>
            <Helmet>
                <title>Reservation App</title>
                <meta
                    name="description"
                    content="Feature page of React.js Boilerplate application"
                />
            </Helmet>
            <Switch>
                {routes.map((route, i) =>
                    <FancyRoute key={i} {...route} />
                )}
            </Switch>
        </>
    );
  }
}

const withReducer = injectReducer({key: KEY_APP, reducer});
const withSaga = injectSaga({key: KEY_APP, saga});

export default compose(
    withReducer,
    withSaga
)(ReservationApp);
