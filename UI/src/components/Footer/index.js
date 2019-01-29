import React from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import messages from './messages';

function Footer() {
    return (
        <>
            <footer className="mg-footer">
                <div className="mg-footer-widget">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="widget">
                                    <h2 className="mg-widget-title"><FormattedMessage {...messages.contactUs}/></h2>
                                    <address>
                                        <strong>Cty TNHH Shinee</strong><br/>
                                        R4-35 Hưng Phước 1, Phường Tân Phong<br/>
                                        Hồ Chí Minh
                                        Việt Nam
                                    </address>
                                    <p>
                                        +000-84-0344-418-733
                                    </p>
                                    <p><a href="mailto:#">shineeco1807@gmail.com</a></p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="widget">
                                    <h2 className="mg-widget-title"><FormattedMessage {...messages.newsletter}/></h2>
                                    <p><FormattedMessage {...messages.newsletterDescription}/></p>
                                    <form>
                                        <p>
                                            <input className="form-control" type="email" placeholder="Your Email"/>
                                        </p>
                                        <button className="btn btn-main" type="submit">
                                            <FormattedMessage {...messages.subscribe}/>
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="widget">
                                    <h2 className="mg-widget-title"><FormattedMessage {...messages.social}/></h2>
                                    <p><FormattedMessage {...messages.socialDescription}/></p>
                                    <ul className="mg-footer-social">
                                        <li><a href="#"><i className="fa fa-facebook-f"/></a></li>
                                        <li><a href="#"><i className="fa fa-twitter"/></a></li>
                                        <li><a href="#"><i className="fa fa-pinterest"/></a></li>
                                        <li><a href="#"><i className="fa fa-instagram"/></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mg-copyright">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <ul className="mg-footer-nav">
                                    <li><Link to="/"><FormattedMessage {...messages.home}/></Link></li>
                                    <li><Link to="/rooms"><FormattedMessage {...messages.rooms}/></Link></li>
                                    <li><Link to="/contact"><FormattedMessage {...messages.contact}/></Link></li>
                                </ul>
                            </div>
                            <div className="col-lg-6">
                                <p>&copy; 2018 <a href="http://www.shinne.com.vn">Shinee</a>. <FormattedMessage {...messages.copyRight}/>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
