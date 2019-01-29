import React from 'react';
// import propTypes from 'prop-types';
// import { createStructuredSelector } from 'reselect/es';
// import { connect } from 'react-redux';
// import {authenticateUser} from "./actions";
// import {getAuthenticatedUser} from "./selectors";
import {LOCAL_STORAGE_ID_KEY, ROUTE_TREE} from "../constants";
import * as jwt_decode from 'jwt-decode';
import moment from 'moment';

export default function (ComposedComponent) {
    class Authentication extends React.Component {

        componentWillMount() {
            let token  = localStorage.getItem(LOCAL_STORAGE_ID_KEY.token);
            if(!!token) {
                try {
                    let decodedToken = jwt_decode(token);
                    // let expTime = decodedToken.exp;
                    let expTime = moment.unix(decodedToken.exp);
                    let currentTime = moment();
                    if(expTime.isBefore(currentTime)) {
                        localStorage.removeItem(LOCAL_STORAGE_ID_KEY.token);
                        this.props.history.push('/' + ROUTE_TREE.login);
                    }
                } catch (error) {
                    console.log(error);
                    localStorage.removeItem(LOCAL_STORAGE_ID_KEY.token);
                    this.props.history.push('/' + ROUTE_TREE.login);
                }
            } else {
                localStorage.removeItem(LOCAL_STORAGE_ID_KEY.token);
                this.props.history.push('/' + ROUTE_TREE.login);
            }
        }

        componentWillUpdate(nextProps) {
            if (!localStorage.getItem(LOCAL_STORAGE_ID_KEY.token)) {
                this.props.history.push('/' + ROUTE_TREE.login);
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }
    Authentication.propTypes = {
    };

    // function mapDispatchToProps(dispatch) {
    //     return {
    //         authFn: () => dispatch(authenticateUser()),
    //     };
    // }
    //
    // const mapStateToProps = createStructuredSelector({
    //     authenticatedUser: getAuthenticatedUser(),
    // });

    return Authentication;
}
