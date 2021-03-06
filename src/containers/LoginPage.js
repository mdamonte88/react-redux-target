import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import TargetPoint from 'components/user/TargetPoint';
import Welcome from 'components/user/Welcome';
import LoginForm from 'components/user/LoginForm';
import { login } from 'actions/sessionActions';
import routes from 'constants/routesPaths';

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
      <div className="slides-container login">
        <div className="slide col-6">
          <Welcome currentPage="Login" />
          <div className="content login-content">
            <LoginForm onSubmit={login} />
            <Link className="forgot-your-password" to={routes.forgotPassword}>
              <FormattedMessage id="login.forgot_password" className="forgot-your-password" />
            </Link>
          </div>
          <div className="footer-content">
            <div className="signIn-facebook">
              <FormattedMessage id="login.form.submit.connectFacebook" />
            </div>
            <hr />
            <Link className="signIn-link" to={routes.signUp}>
              <FormattedMessage id="login.signup" />
            </Link>
          </div>
        </div>
        <div className="slide col-6">
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
