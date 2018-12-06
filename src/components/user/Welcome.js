import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { string } from 'prop-types';

// Imagenes
import smileIcon from './../../assets/smilies/smilies@3x.png';

export default class Welcome extends PureComponent {
  static propTypes = {
    currentPage: string
  };

  Heading() {
    const {
      currentPage
    } = this.props;

    if (currentPage === 'Login') {
      return (
        <p className="heading" >
          <FormattedMessage id="login.createATarget" />
        </p>
      );
    }
    if (currentPage === 'Home') {
      return (
        <div>
          <p className="bulletPoint">
            <FormattedMessage id="home.welcome.createTarget" />
          </p>
          <p className="bulletPoint">
            <span className="startTextBold" > <FormattedMessage id="home.welcome.target" /> </span> <FormattedMessage id="home.welcome.willStart" />
          </p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="top-content top-separator--small">
        <img
          id="smiles-icon"
          className="icon smile-icon--big"
          alt=""
          src={smileIcon}
        />
        <p className="title" >
          <FormattedMessage id="login.targetMVD" />
        </p>
        <p className="subTitle" >
          <FormattedMessage id="login.findPeople" />
        </p>
        {this.Heading()}
      </div>
    );
  }
}
