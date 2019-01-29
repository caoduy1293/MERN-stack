import React from 'react';
import { Link } from 'react-router-dom';


/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
    render() {
        return (
            <>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                        <a className="navbar-brand" href="#">Carousel</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin">admin</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link disabled" to="/">Disabled</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
            </>
        );
    }
}

export default Header;
