/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import {Helmet} from 'react-helmet';
import {Switch} from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';

import HomePage from 'containers/HomePage/Loadable';
import AppWrapped from './AppWrapped';
import Header from 'components/Header';
import Footer from 'components/Footer';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'nprogress/nprogress.css';
import './FancyRoute.scss';
import FancyRoute from "../../components/FancyRoute";

const rootRoutes = [
    {
        path: '/',
        exact: true,
        component: HomePage
    },
    {
        path: '/',
        component: AppWrapped
    }
];

export default class App extends React.Component{
    // componentDidMount(){
    //
    // }
    addScript(url) {
        let promisePayScript = document.createElement('script');
        promisePayScript.src = url;
        // bingMapScript.onload = resolve;
        document.head.appendChild(promisePayScript);
    }
    render(){
        return (
            <>
                <Helmet
                    titleTemplate="%s - React.js Boilerplate"
                    defaultTitle="React.js Boilerplate"
                >
                    <meta name="description" content="A React.js Boilerplate application"/>
                </Helmet>
                <Header/>
                <Switch>
                    {rootRoutes.map((route, i) =>
                        <FancyRoute key={i} {...route} />
                    )}
                </Switch>
                <Footer/>


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
