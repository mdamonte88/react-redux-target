import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import LogoutButton from 'components/user/LogoutButton';
import Welcome from 'components/user/Welcome';
import CreateTargetForm from 'components/user/CreateTargetForm';
import AboutTarget from 'components/user/AboutTarget';
import routes from 'constants/routesPaths';

export default class MenuLeft extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    topicList: PropTypes.array,
    section: PropTypes.string,
    handleCreateTarget: PropTypes.func,
  };

  render() {
    const { topicList, section, title, handleCreateTarget } = this.props;
    let menu;

    if (section === 'newTarget' || section === 'aboutTarget') {
      menu = (
        <div className="slide slideLeft col-6">
          <div className="headerContent">
            <FormattedMessage id={title} /> <Link to={routes.index} > <div className="closeIcon" /> </Link>
          </div>
          <div className="content create-target">
            {section === 'newTarget' ? <CreateTargetForm onSubmit={handleCreateTarget} topics={topicList} /> : <AboutTarget /> }
          </div>
        </div>
      );
    } else {
      menu = (
        <div className="slide slideLeft col-6">
          <Welcome currentPage="Home" />
          <div className="content">
            <LogoutButton className="sign-in-button" />
          </div>
        </div>
      );
    }
    return menu;
  }
}