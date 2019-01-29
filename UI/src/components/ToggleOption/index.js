/**
 *
 * ToggleOption
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

const ToggleOption = ({ value, message, intl, onToggle }) => (
    <li>
        <a onClick={(e)=> {e.preventDefault(); onToggle(value)}}>{message ? intl.formatMessage(message) : value}</a>
    </li>
);

ToggleOption.propTypes = {
    value: PropTypes.string.isRequired,
    onToggle: PropTypes.func,
    message: PropTypes.object,
    intl: intlShape.isRequired,
};

export default injectIntl(ToggleOption);
