import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { signUp } from 'actions/userActions';
import SignUpForm from 'components/user/SignUpForm';
import routes from 'constants/routesPaths';

// Styles
import './SignUpPage.css';

// Imagenes
import facebookIcon from './..//assets/socialNetworks/facebook@3x.png';
import twitterIcon from './..//assets/socialNetworks/twitter@3x.png';
import playVideoIcon from './..//assets/phone/play@3x.png';

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
      <div id="signup">
        <div id="slideLeft" className="slide">
          <div className="content">
            <p id="title"><FormattedMessage id="signup.title" /></p>
            <SignUpForm onSubmit={signUp} />
            <hr />
            <Link className="SIGN-IN-Copy" to={routes.login} >
              <FormattedMessage id="signup.signin" />
            </Link>
          </div>
        </div>
        <div id="slideRight" className="slide">
          <div id="phone">
            <img id="playVideo" alt="playVideo" src={playVideoIcon} />
          </div>  
          <div id="appleStore" />
          <div id="socialNetworks">
            <img id="facebookIcon" className="icon" alt="Facebook" src={facebookIcon} />
            <img id="twitterIcon" className="icon" alt="twitter" src={twitterIcon} />
          </div>
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
