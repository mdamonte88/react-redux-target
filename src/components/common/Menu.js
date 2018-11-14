import React from 'react';
import { FormattedMessage } from 'react-intl';

const Menu = () => (
  <div className="containerMenu">
    <div className="hamburgerIcon" />
    <div className="close" />
    <ul className="menuList">
      <li className="selected"> <FormattedMessage id="menu.about" /> </li>
      <li> <FormattedMessage id="menu.contact" /> </li>
    </ul>
  </div>
);

export default Menu;

