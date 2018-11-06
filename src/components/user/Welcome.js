import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';

// Imagenes
import smileIcon from './../../assets/smilies/smilies@3x.png';

export default class Welcome extends PureComponent {
  Heading() {
    if (this.props.currentPage === 'Login') {
      return <p className="heading" > <FormattedMessage id="login.createATarget" /></p>;
    }
    if (this.props.currentPage === 'Home') {
      return (
        <div>
          <p className="bulletPoint">
            <FormattedMessage id="home.welcome.createTarget" />
          </p>
          <p className="bulletPoint">
            <span>TARGET</span> <FormattedMessage id="home.welcome.willStart" />
          </p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="topContent topSeparator--small">
        <img id="smilesIcon" className="iconCenter" alt="smiles" src={smileIcon} />
        <p className="title" ><FormattedMessage id="login.targetMVD" /></p>
        <p className="subTitle" > <FormattedMessage id="login.findPeople" /> </p>
        {this.Heading()}
      </div>
    );
  }
}