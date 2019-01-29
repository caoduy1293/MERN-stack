import React from 'react';
import {Helmet} from 'react-helmet';
import {compose} from 'redux';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import {KEY_APP} from './constants';
import {Switch} from "react-router-dom";

import RoomList from './RoomList';
import RoomDetails from './RoomDetails';
import FancyRoute from "../App/FancyRoute";
import {ROUTE_TREE} from "../App/constants";
import NotFoundPage from '../NotFoundPage/Loadable';

const routes = [
    {
        title: 'Room List',
        path: `/${ROUTE_TREE.rooms}/`,
        exact: true,
        component: RoomList
    },
    {
        title: 'Room adding',
        path: `/${ROUTE_TREE.rooms}/${ROUTE_TREE.roomsAdd}/`,
        component: RoomDetails
    },
    {
        title: 'Room Details',
        path: `/${ROUTE_TREE.rooms}/${ROUTE_TREE.roomDetails}/:id`,
        component: RoomDetails
    },
    {
        title: 'Not Found',
        path: '',
        component: NotFoundPage
    }
];

class RoomApp extends React.Component {


  render() {
    return (
        <>
            <Helmet>
                <title>Room App</title>
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
)(RoomApp);
