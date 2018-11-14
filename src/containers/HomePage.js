import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Menu from 'components/common/Menu';
import LogoutButton from 'components/user/LogoutButton';
import SimpleMap from 'components/common/maps/Map';
import Welcome from 'components/user/Welcome';
import { array, func } from 'prop-types';

import { loadTargets } from '../actions/targetActions';
import { loadTopics } from '../actions/topicActions';

class HomePage extends PureComponent {
  componentDidMount() {
    this.props.loadTargets();
    this.props.loadTopics();
  }

  render() {
    const { targetList, topicList } = this.props;

    return (
      <div className="slidesContainer homepage">
        <Menu />
        <div className="slide col-6">
          <Welcome currentPage="Home" />
          <div className="content">
            <LogoutButton className="sign-in-button" />
          </div>
        </div>
        <div className="slide col-6">
          <SimpleMap markers={targetList} topics={topicList} />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  targetList: array,
  topicList: array,
  loadTargets: func,
  loadTopics: func
};

const mapState = state => ({
  authenticated: state.getIn(['session', 'authenticated']),
  topicList: state.getIn(['topic', 'topicList']),
  targetList: state.getIn(['target', 'targetList'])
});

const mapDispatch = dispatch => ({
  loadTargets: () => dispatch(loadTargets()),
  loadTopics: () => dispatch(loadTopics())
});

export default connect(mapState, mapDispatch)(HomePage);
