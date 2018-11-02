import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import TargetPoint from 'components/common/TargetPoint';
import LoginForm from 'components/user/LoginForm';
import { login } from 'actions/sessionActions';
import routes from 'constants/routesPaths';

import smileIcon from './../assets/smilies/smilies@3x.png';

class LoginPage extends PureComponent {
  static propTypes = {
    login: func.isRequired,
    authenticated: bool.isRequired,
  }

  render() {
    const { login, authenticated } = this.props;

    if (authenticated) {
      return <Redirect to={routes.index} />;
    }

    return (
      <div id="login" className="slidesContainer">
        <div id="slideLeft" className="slide col-6">
          <div className="topContent smallTopSeparator">
            <img id="smilesIcon" className="iconCenter" alt="smiles" src={smileIcon} />
            <p className="title" ><FormattedMessage id="login.targetMVD" /></p>
            <p className="subTitle" > <FormattedMessage id="login.findPeople" /> </p>
            <p className="heading" > <FormattedMessage id="login.createATarget" /></p>
          </div>
          <div className="content">

            <LoginForm onSubmit={login} />
            <div className="Forgot-your-password"> <FormattedMessage id="login.forgot_password" className="Forgot-your-password" /> </div>

            <div className="SIGN-IN-Facebook">
              <FormattedMessage id="login.form.submit.connectFacebook" />
            </div>
            <hr />
            <Link className="SIGN-IN-Copy" to={routes.signUp}>
              <FormattedMessage id="login.signup" />
            </Link>
          </div>
        </div>
        <div id="slideRight" className="slide col-6">
          <TargetPoint />
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  authenticated: state.getIn(['session', 'authenticated'])
});

const mapDispatch = dispatch => ({
  login: user => dispatch(login(user.toJS()))
});

export default connect(mapState, mapDispatch)(LoginPage);
