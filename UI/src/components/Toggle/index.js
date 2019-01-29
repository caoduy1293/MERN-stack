/**
 *
 * LocaleToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import ToggleOption from '../ToggleOption';
import messages from './messages';

function Toggle(props) {
  let content = <option>--</option>;

  // If we have items, render them
  if (props.values) {
    content = props.values.map(value => (
      <ToggleOption key={value} value={value} message={props.messages[value]} onToggle={props.onToggle} />
    ));
  }

  return (
      <>
          <a className="dropdown-toggle" href="#" role="button" data-toggle="dropdown"
                                  aria-haspopup="true" aria-expanded="false"><FormattedMessage {...messages.language}/></a>
          <ul className="dropdown-menu">
              {content}
          </ul>
      </>
  );
}

Toggle.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
  messages: PropTypes.object,
};

export default Toggle;
