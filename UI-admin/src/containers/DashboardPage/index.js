/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import {getData} from './actions';
import {KEY_APP} from './constants';
import {makeLoading, makeSelectData} from "./selectors";

class DashboardPage extends React.Component {
    componentDidMount() {
        this.props.getData();
    }

    render() {
        console.log(this.props.loading);
        return (
            <>
                <Helmet>
                    <title>Dashboard Page</title>
                    <meta
                        name="description"
                        content="Feature page of React.js Boilerplate application"
                    />
                </Helmet>
                <div className="container">
                    {this.props.generalInfo ? this.props.generalInfo.length : ''}
                </div>
            </>
        );
    }
}
DashboardPage.propTypes = {
    loading: PropTypes.bool,
    generalInfo: PropTypes.object,
    getData: PropTypes.func
};
export function mapDispatchToProps(dispatch) {
    return {
        getData: () => dispatch(getData())
    };
}
const mapStateToProps = createStructuredSelector({
    generalInfo: makeSelectData(),
    loading: makeLoading(),
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
    withConnect,
)(DashboardPage);
