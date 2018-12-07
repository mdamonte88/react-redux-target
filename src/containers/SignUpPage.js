import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { signUp } from 'actions/userActions';
import SignUpForm from 'components/user/SignUpForm';
import TargetPoint from 'components/user/TargetPoint';
import Menu from 'components/common/Menu';
import routes from 'constants/routesPaths';

// Styles
import './../styles/responsive-styles.scss';
import './../styles/sign-up-page.scss';

class SignUpPage extends PureComponent {
  static propTypes = {
    signUp: func.isRequired,
    authenticated: bool.isRequired
  }

  render() {
    const { signUp, authenticated } = this.props;

    if (authenticated) {
      return <Redirect to={routes.index} />;
    }

    return (
      <div className="slides-container signup">
        <Menu />
        <div className="slide col-6">
          <div className="top-content topSeparator--big">
            <p className="title"><FormattedMessage id="signup.title" /></p>
          </div>
          <div className="content">
            <SignUpForm onSubmit={signUp} />
            <hr />
            <Link className="signIn-link" to={routes.login} >
              <FormattedMessage id="signup.signin" />
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
  signUp: user => dispatch(signUp(user.toJS()))
});

export default connect(mapState, mapDispatch)(SignUpPage);
