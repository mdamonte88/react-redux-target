import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from 'constants/routesPaths';

export default class Menu extends PureComponent {
  static propTypes = {
    show: PropTypes.bool
  };

  render() {
    const { show } = this.props;

    return (
      <div className="containerMenu" style={{ display: show ? 'block' : 'none' }} >
        <div className="hamburgerIcon" />
        <div className="close" />
        <ul className="menuList">
          <li className="selected">
            <Link className="Forgot-your-password" to={routes.about}>
              <FormattedMessage id="menu.about" />
            </Link>
          </li>
          <li>
            <Link className="Forgot-your-password" to={routes.contact}>
              <FormattedMessage id="menu.contact" />
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
