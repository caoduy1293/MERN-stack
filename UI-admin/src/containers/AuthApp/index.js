/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {
    withRouter
} from 'react-router-dom'
import {loginToSystem} from "../App/Global/actions";
import {LOCAL_STORAGE_ID_KEY} from "../App/constants";

class AuthPage extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        if(localStorage.getItem(LOCAL_STORAGE_ID_KEY.token)) {
            console.log(localStorage.getItem(LOCAL_STORAGE_ID_KEY.token));
            this.props.history.push('/');
        }
    }
    handleChange (evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.login(this.state);
    }
    render() {
        return (
            <>
                <Helmet>
                    <title>Dashboard Page</title>
                    <meta
                        name="description"
                        content="Feature page of React.js Boilerplate application"
                    />
                </Helmet>
                <main>
                    <div id="primary" className="p-t-b-100 height-full ">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 mx-md-auto">
                                    <div className="text-center">
                                            <h3 className="mt-2">Welcome</h3>
                                    </div>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group has-icon"><i className="icon-envelope-o"></i>
                                            <input type="text" name="email" className="form-control form-control-lg"
                                                   placeholder="Email Address" onChange={this.handleChange}/>
                                        </div>
                                        <div className="form-group has-icon"><i className="icon-lock"></i>
                                            <input type="password" name="password" className="form-control form-control-lg"
                                                   placeholder="Password" onChange={this.handleChange}/>
                                        </div>
                                        <input type="submit" className="btn btn-success btn-lg btn-block"
                                               value="Log In"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*#primary*/}
                </main>
            </>
        );
    }
}

AuthPage.propTypes = {
    login: PropTypes.func
};
export function mapDispatchToProps(dispatch) {
    return {
        login: (data) => dispatch(loginToSystem(data))
    };
}

export default connect(
    null,
    mapDispatchToProps,
)(withRouter(AuthPage));
