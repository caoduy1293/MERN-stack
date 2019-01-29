import React from 'react';
import {FormattedMessage} from 'react-intl';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
    return (
        <>
            <footer className="container">
                <p className="float-right"><a href="#">Back to top</a></p>
                <p className="float-right">
                    {/*<LocaleToggle/>*/}
                </p>
                <p>&copy; 2017-2018 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
            </footer>
        </>
    );
}

export default Footer;
