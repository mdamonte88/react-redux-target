import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from 'constants/routesPaths';
import {
  injectIntl,
  intlShape,
  defineMessages
} from 'react-intl';

const messages = defineMessages({
  about: { id: 'menu.about' },
  contact: { id: 'menu.contact' },
});

class Menu extends PureComponent {
  static propTypes = {
    show: PropTypes.bool,
    intl: intlShape.isRequired,
  };

  render() {
    const { show, intl } = this.props;

    return !show ? null : (
      <div className="containerMenu" >
        <div className="hamburgerIcon" />
        <div className="close" />
        <ul className="menuList">
          <li className="selected">
            <Link className="forgot-your-password" to={routes.about}>
              {intl.formatMessage(messages.about)}
            </Link>
          </li>
          <li>
            <Link className="forgot-your-password" to={routes.contact}>
              {intl.formatMessage(messages.contact)}
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default injectIntl(Menu);
