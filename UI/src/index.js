/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import createHistory from 'history/createBrowserHistory';
import { register } from './serviceWorker';
// import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

// Import CSS reset and Global Styles
import $ from 'jquery';
/* eslint-disable import/first */
window.jQuery = window.$ = $;
require('popper.js/dist/popper.min');
require('bootstrap/dist/js/bootstrap.min.js');
require('bootstrap-datepicker/dist/js/bootstrap-datepicker.min');
require('owl-carousel/owl-carousel/owl.carousel.min');
require('jquery-parallax.js/parallax.min');

import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'owl-carousel/owl-carousel/owl.carousel.css';
import 'owl-carousel/owl-carousel/owl.theme.css';
import 'owl-carousel/owl-carousel/owl.transitions.css';
import './assets/scss/cs-select.scss';
import './assets/scss/index.scss';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';


// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
    // document.body.classList.add('fontLoaded');
});

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

const renderApp = (message) => {
    ReactDOM.render(
        <Provider store={store}>
            <LanguageProvider messages={message}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </LanguageProvider>
        </Provider>,
        MOUNT_NODE
    )
};

if (module.hot) {
    // Hot reloadable React components and translation json files
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept(['./i18n', 'containers/App'], () => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        renderApp(translationMessages);
    });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
    (new Promise((resolve) => {
        resolve(import('intl'));
    }))
        .then(() => Promise.all([
            import('intl/locale-data/jsonp/en.js'),
            import('intl/locale-data/jsonp/de.js'),
        ]))
        .then(() => renderApp(translationMessages))
        .catch((err) => {
            throw err;
        });
} else {
    renderApp(translationMessages);
}

if (process.env.NODE_ENV === 'production') {
    require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}

register();
