import React, { PureComponent } from 'react';
import { array, func, object, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import * as sections from '../../actions/actionTypes';
import LogoutButton from 'components/user/LogoutButton';
import Welcome from 'components/user/Welcome';
import CreateTargetForm from 'components/user/CreateTargetForm';
import AboutTarget from 'components/user/AboutTarget';
import routes from 'constants/routesPaths';

export default class MenuLeft extends PureComponent {
  static propTypes = {
    title: string,
    topicList: array,
    section: string,
    handleCreateTarget: func,
    history: object.isRequired
  };


  render() {
    const { topicList, section, title, handleCreateTarget, history } = this.props;
    const { location } = history;
    const pathname = location && location.pathname;

    return section === sections.NEW_TARGET || section === sections.ABOUT_TARGET ?
      (
        <div className="slide slideLeft col-6">
          <div className="header-content">
            <FormattedMessage id={title} />
            <Link to={pathname === routes.home ? routes.index : routes.home} >
              <div className="close-icon" />
            </Link>
          </div>
          <div className="content create-target">
            {section === sections.NEW_TARGET ? (
              <CreateTargetForm onSubmit={handleCreateTarget} topics={topicList} />
            ) : (
              <AboutTarget />
            )}
          </div>
        </div>
      ) :
      (
        <div className="slide slideLeft col-6">
          <Welcome currentPage="Home" />
          <div className="content">
            <LogoutButton className="sign-in-button" />
          </div>
        </div>
      );
  }
}
