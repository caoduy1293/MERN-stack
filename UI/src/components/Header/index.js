import React from 'react';
import {Link} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import logo from '../../assets/images/logo.png';
import LocaleToggle from '../../containers/LocaleToggle';
import NavLink from '../NavLink';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
    render() {
        return (
            <>
                <header className="header transp sticky">
                    <nav className="navbar navbar-inverse">
                        <div className="container">
                            <div className="navbar navbar-expand-md justify-content-between">
                                <Link className="navbar-brand" to={'/'}><img src={logo} alt="logo"/></Link>
                                <div className="mg-navs">
                                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                            aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="icon-bar"/><span className="icon-bar"/><span className="icon-bar"/>
                                    </button>
                                    <div className="collapse navbar-collapse ml-auto" id="navbarSupportedContent">
                                        <ul className="navbar-nav navbar-right">
                                            <NavLink to="/"><FormattedMessage {...messages.home}/></NavLink>
                                            <NavLink to="/news"><FormattedMessage {...messages.news}/></NavLink>
                                            <NavLink to="/rooms"><FormattedMessage {...messages.rooms}/></NavLink>
                                            <NavLink to="/gallery"><FormattedMessage {...messages.gallery}/></NavLink>
                                            <NavLink to="/contact"><FormattedMessage {...messages.contact}/></NavLink>
                                            <li className="dropdown">
                                                <LocaleToggle />
                                            </li>
                                        </ul>
                                    </div>
                                    {/* <div className="mg-search-box-cont"><a className="mg-search-box-trigger" href="#"><i
                                        className="fa fa-search"></i></a>
                                        <div className="mg-search-box">
                                            <form>
                                                <input className="form-control" type="text" name="s"
                                                       placeholder="Type Keyword..."/>
                                                <button className="btn btn-main" type="submit"><i
                                                    className="fa fa-search"></i></button>
                                            </form>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </>
        );
    }
}

export default Header;
