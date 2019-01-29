import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {makeLoading, makeSelectData} from "./selectors";
import {addData} from "./actions";
import {KEY_APP} from "./constants";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

class ContactPage extends React.Component {
    constructor(props) {
        super(props);
        super(props);
        this.state = {
            createObj: {
                _id: '',
                name: '',
                emailAddress: '',
                phoneNum: '',
                rating: '',
                note: '',
                imgs: [],
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.cancelForm = this.cancelForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    cancelForm () {
        this.setState({
            createObj: {
                _id: '',
                name: '',
                emailAddress: '',
                phoneNum: '',
                rating: '',
                note: '',
                imgs: [],
            }
        });
    }

    handleChange (evt) {
        this.setState({
            createObj: {
                ...this.state.createObj,
                [evt.target.name]: evt.target.value
            }
        });
    }

    handleSubmit(env) {
        env.preventDefault();
        let dtoObj = {
            name: this.state.createObj.name,
            emailAddress: this.state.createObj.emailAddress,
            phoneNum: this.state.createObj.phoneNum,
            rating: this.state.createObj.rating,
            note: this.state.createObj.note,
            imgs: this.state.createObj.imgs,
        };
        this.props.addData(dtoObj);

    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Contact Page</title>
                    <meta
                        name="description"
                        content="Contact page"
                    />
                </Helmet>

                <div className="mg-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5">
                                <h2 className="mg-sec-left-title"><FormattedMessage {...messages.sendAnEmail}/></h2>
                                <form className="clearfix" onSubmit={this.handleSubmit}>
                                    <div className="mg-contact-form-input">
                                        <label htmlFor="name"><FormattedMessage {...messages.fullName}/></label>
                                        <input className="form-control" id="name" type="text" name={'name'}
                                               onChange={this.handleChange} value={this.state.createObj.name}/>
                                    </div>
                                    <div className="mg-contact-form-input">
                                        <label htmlFor="emailAddress"><FormattedMessage {...messages.email}/></label>
                                        <input className="form-control" id="emailAddress" type="text" name={'emailAddress'}
                                               onChange={this.handleChange} value={this.state.createObj.emailAddress}/>
                                    </div>
                                    <div className="mg-contact-form-input">
                                        <label htmlFor="phoneNum"><FormattedMessage {...messages.phone}/></label>
                                        <input className="form-control" id="phoneNum" type="text" name={'phoneNum'}
                                               onChange={this.handleChange} value={this.state.createObj.phoneNum}/>
                                    </div>
                                    <div className="mg-contact-form-input">
                                        <label htmlFor="subject"><FormattedMessage {...messages.message}/></label>
                                        <textarea className="form-control" id="note" rows="5" name={'note'}
                                                  onChange={this.handleChange} value={this.state.createObj.note}/>
                                    </div>
                                    <button className="btn btn-dark-main pull-right" type="submit">
                                        <FormattedMessage {...messages.send}/>
                                    </button>
                                </form>
                            </div>
                            <div className="col-lg-7 mt-4 mt-lg-0">
                                <h2 className="mg-sec-left-title">Cty TNHH Shinee</h2>
                                <ul className="mg-contact-info">
                                    <li><i className="fa fa-map-marker"/>
                                        R4-35 Hưng Phước 1, Phường Tân Phong Quận 7
                                        Hồ Chí Minh Việt Nam
                                    </li>
                                    <li><i className="fa fa-phone"/> +000-84-0344-418-733</li>
                                    <li><i className="fa fa-envelope"/> <a href="mailto:#">shineeco1807@gmail.com</a>
                                    </li>
                                </ul>
                                {/*<div className="mg-map" id="mg-map"></div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
ContactPage.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.object,
    addData: PropTypes.func
};
export function mapDispatchToProps(dispatch) {
    return {
        addData: (data) => dispatch(addData(data)),
    };
}
const mapStateToProps = createStructuredSelector({
    data: makeSelectData(),
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
)(ContactPage);
