import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class NavLink extends React.Component {
    render() {
        let isActive = false;
        if(this.props.to === '/' || this.props.to === '') {
            isActive = this.context.router.route.location.pathname === this.props.to;
        } else {
            isActive = this.context.router.route.location.pathname.includes(this.props.to);
        }
        let className = isActive ? 'active' : '';

        return(
            <li className={ 'treeview' + ' ' + className}>
                <Link {...this.props}>{this.props.children}</Link>
            </li>
        );
    }
}

NavLink.contextTypes = {
    router: PropTypes.object
};

export default NavLink;
