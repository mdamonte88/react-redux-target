import React, { PureComponent } from 'react';
import { array, bool, func, object, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import LogoutButton from 'components/user/LogoutButton';
import Welcome from 'components/user/Welcome';
import CreateTargetForm from 'components/user/CreateTargetForm';
import AboutTarget from 'components/user/AboutTarget';
import routes from 'constants/routesPaths';
import { SECTION_TYPES as sections } from '../../constants/constants';

export default class MenuLeft extends PureComponent {
  static propTypes = {
    isDeletingTarget: bool,
    title: string,
    topicList: array,
    section: string,
    handleCreateTarget: func.isRequired,
    handleDeleteTarget: func.isRequired,
    history: object.isRequired
  };

  render() {
    const { isDeletingTarget, topicList, section, title, handleCreateTarget, handleDeleteTarget, history } = this.props;
    const { location } = history;
    const pathname = location && location.pathname;
    const { aboutTarget, newTarget } = sections;

    return section === newTarget || section === aboutTarget ?
      (
        <div className="slide slideLeft col-6">
          <div className="header-content">
            <FormattedMessage id={title} />
            <Link to={pathname === routes.home ? routes.index : routes.home} >
              <div className="close-icon" />
            </Link>
          </div>
          <div className="content create-target">
            {section === newTarget ?
              <CreateTargetForm
                onSubmit={isDeletingTarget ? handleDeleteTarget : handleCreateTarget}
                topics={topicList}
                isDeletingTarget={isDeletingTarget}
                enableReinitialize
              />
              :
              <AboutTarget />
            }
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
