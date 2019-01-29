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
import {getData, getListData} from './actions';
import {KEY_APP} from './constants';
import {makeLoading, makeSelectData} from "./selectors";

class GeneralPage extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedItem: null
        };
    }
    componentDidMount() {

    }

  render() {
    return (
        <>
            <Helmet>
                <title>Feature Page</title>
                <meta
                    name="description"
                    content="Feature page of React.js Boilerplate application"
                />
            </Helmet>

            <div className="card mb-3 shadow no-b r-0">
                <div className="card-header white">
                    <h6>General Information</h6>
                </div>
                <div className="card-body">
                    <form className="needs-validation" noValidate>
                        <div className="form-row">
                            <div className="col-md-12 mb-3">
                                <label htmlFor="name">Phone Number</label>
                                <input type="text" className="form-control" id="name"/>
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <label htmlFor="description">Email address</label>
                                <input className="form-control" id="description"/>
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <label htmlFor="description">Address</label>
                                <input className="form-control" id="description"/>
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <label htmlFor="description">Description</label>
                                <textarea className="form-control" id="description"></textarea>
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <label htmlFor="description">Slogan</label>
                                <input className="form-control" id="description"/>
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <label htmlFor="description">Admin email</label>
                                <input type="email" className="form-control" id="description"/>
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary" type="submit">Save</button>
                    </form>
                </div>
            </div>
        </>
    );
  }
}
GeneralPage.propTypes = {
    loading: PropTypes.bool,
    generalInfo: PropTypes.object,
    getData: PropTypes.func
};
export function mapDispatchToProps(dispatch) {
    return {
        getData: (id) => dispatch(getData(id))
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
)(GeneralPage);
