/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import {Switch} from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';

import AppWrapped from './AppWrapped';
import LoginPage from '../AuthApp/Loadable';
import RequiredAuth from './Global/AuthorizationRequired';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'nprogress/nprogress.css';
import './FancyRoute.scss';
import {ROUTE_TREE} from "./constants";

import FancyRoute from "./FancyRoute";

const rootRoutes = [
    {
        title: 'Login Page',
        path: '/' + ROUTE_TREE.login,
        component: LoginPage
    },
    {
        title: 'App layout',
        path: '/',
        component: RequiredAuth(AppWrapped)
        // component: AppWrapped
    }
];

export default class App extends React.Component{

    // componentDidMount () {
    //     const script = document.createElement("script");
    //
    //     script.src = "https://cdn.ckeditor.com/4.6.1/basic/ckeditor.js";
    //
    //     document.body.appendChild(script);
    // }

    render() {
        return (

            <>
                <div id="app">
                    <Switch>
                        {rootRoutes.map((route, i) =>
                            <FancyRoute key={i} {...route} />
                        )}
                    </Switch>
                </div>
                <ReduxToastr
                    timeOut={4000}
                    newestOnTop={true}
                    preventDuplicates
                    position="top-center"
                    transitionIn="bounceIn"
                    transitionOut="bounceOut"
                    progressBar={false}/>
            </>
        );
    }
}
