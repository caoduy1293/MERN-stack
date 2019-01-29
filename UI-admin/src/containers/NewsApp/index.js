/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import {Helmet} from 'react-helmet';
import {compose} from 'redux';
import {Switch} from "react-router-dom";

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import {KEY_APP} from './constants';
import NewsList from "./NewsList";
import NewsDetails from "./NewsDetails";
import FancyRoute from "../App/FancyRoute";
import {ROUTE_TREE} from '../App/constants';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

const routes = [
    {
        title: 'News List',
        path: `/${ROUTE_TREE.news}/`,
        exact: true,
        component: NewsList
    },
    {
        title: 'News Adding',
        path: `/${ROUTE_TREE.news}/${ROUTE_TREE.newsAdd}/`,
        component: NewsDetails
    },
    {
        title: 'News Details',
        path: `/${ROUTE_TREE.news}/${ROUTE_TREE.newsDetails}/:id`,
        component: NewsDetails
    },
    {
        title: 'Not Found',
        path: '',
        component: NotFoundPage
    }
];
class NewsApp extends React.Component {


  render() {
    return (
        <>
            <Helmet>
                <title>News App</title>
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
)(NewsApp);
