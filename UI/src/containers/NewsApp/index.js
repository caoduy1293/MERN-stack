
import React from 'react';
import { Helmet } from 'react-helmet';
import {Switch, Link} from "react-router-dom";
import {compose} from 'redux';
import moment from 'moment';
import {FormattedMessage} from 'react-intl';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import NotFoundPage from '../NotFoundPage/Loadable';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {KEY_APP} from "./constants";
import reducer from "./reducer";
import saga from "./saga";

import NewsDetails from "../NewsApp/NewsDetails";
import NewsList from "../NewsApp/NewsList";
import FancyRoute from "../../components/FancyRoute";
import {makeTypes, makeLoading, makeSelectListData} from "./selectors";
import {getTypes, getListData} from "./actions";
import messages from "./messages";

const newRoutes = [
    {
        title: 'News Details',
        path: '/news/details/:id',
        component: NewsDetails
    },
    {
        title: 'News List',
        path: '/news/',
        exact: true,
        component: NewsList
    },
    {
        title: 'Not Found',
        path: '',
        component: NotFoundPage
    }
];
class NewsApp extends React.Component {

    componentDidMount() {
        this.props.getTypes();
        this.props.getListData();
    }

    render() {
        const typesOptions = [
            { value: 'news', label: 'News'},
            { value: 'event', label: 'Event'},
        ];
        return (
            <>
                <Helmet>
                    <title>Tin tức</title>
                    <meta
                        name=""
                        content=""
                    />
                </Helmet>
                <div className="mg-blog-list">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <main>
                                    <Switch>
                                        {newRoutes.map((route, i) =>
                                            <FancyRoute key={i} {...route} />
                                        )}
                                    </Switch>
                                </main>
                            </div>
                            <div className="col-lg-4">
                                <div className="mg-widget-area">
                                    <aside className="mg-widget">
                                        <h2 className="mg-widget-title"><FormattedMessage {...messages.latestNews}/></h2>
                                        <ul className="mg-recnt-posts">
                                            {
                                                this.props.list.filter(item => {
                                                    return moment(item.createdAt).isAfter(moment(Date.now() + -2*24*3600*1000));
                                                }).map((item, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <div className="mg-recnt-post">
                                                                <div className="mg-rp-date">{moment(item.createdAt).format('DD')}
                                                                    <div className="mg-rp-month">{moment(item.createdAt).format('MMM')}</div>
                                                                </div>
                                                                <h3><Link to="/">{item.name}</Link></h3>
                                                                <p>{item.description}...</p>
                                                            </div>
                                                        </li>
                                                    );
                                                })
                                            }
                                        </ul>
                                    </aside>
                                    <aside className="mg-widget">
                                        <h2 className="mg-widget-title"><FormattedMessage {...messages.category}/></h2>
                                        <ul>
                                            {
                                                typesOptions.map((item, index) => {
                                                    return (
                                                        <li key={index}><Link to="news">{item.label}</Link></li>
                                                    );
                                                })
                                            }
                                        </ul>
                                    </aside>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

NewsApp.propTypes = {
    list: PropTypes.array,
    loading: PropTypes.bool,
    types: PropTypes.array,
    getListData: PropTypes.func,
    getTypes: PropTypes.func
};

export function mapDispatchToProps(dispatch) {
    return {
        getListData: () => dispatch(getListData()),
        getTypes: () => dispatch(getTypes())
    };
}
const mapStateToProps = createStructuredSelector({
    list: makeSelectListData(),
    loading: makeLoading(),
    types: makeTypes(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({key: KEY_APP, reducer});
const withSaga = injectSaga({key: KEY_APP, saga});

export default compose(
    withReducer,
    withSaga,
    withConnect
)(NewsApp);
