import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Menu from 'components/common/Menu';
import LogoutButton from 'components/user/LogoutButton';
import SimpleMap from 'components/common/maps/Map';
import Welcome from 'components/user/Welcome';
import CreateTargetForm from 'components/user/CreateTargetForm';
import { array, func } from 'prop-types';

import { loadTargets, addTarget } from '../actions/targetActions';
import { loadTopics } from '../actions/topicActions';

class HomePage extends PureComponent {
  constructor() {
    super();
    this.state = {
      targetPosition: {},
      isCreatingNewTarget: false,
    };
    this.onClickMap = this.onClickMap.bind(this);
    this.handleCreateTarget = this.handleCreateTarget.bind(this);
  }

  componentDidMount() {
    this.props.loadTargets();
    this.props.loadTopics();
  }

  onClickMap = ({ x, y, lat, lng, event }) => {
    console.log(x, y, lat, lng, event);
    const targetPosition = {
      lat,
      lng
    };
    this.setState({ targetPosition });
    this.setState({ isCreatingNewTarget: true });
  }

  handleCreateTarget(data) {
    const { title, radius, topicId } = data.toJS();
    const { lat, lng } = this.state.targetPosition;
    const targetCompleted = {
      target: {
        lat,
        lng,
        title,
        radius,
        topic_id: topicId
      }
    };
    this.setState({ target: targetCompleted });
    this.props.addTarget(targetCompleted);
  }

  MenuLeft(topicList) {
    let menu;
    if (this.state.isCreatingNewTarget) {
      menu = (
        <div className="content">
          <CreateTargetForm onSubmit={this.handleCreateTarget} topics={topicList} />
        </div>
      );
    } else {
      menu = (
        <div>
          <Welcome currentPage="Home" />
          <div className="content">
            <LogoutButton className="sign-in-button" />
          </div>
        </div>
      );
    }
    return menu;
  }

  render() {
    const { targetList, topicList } = this.props;

    return (
      <div className="slidesContainer homepage">
        <Menu />
        <div className="slide col-6">
          {this.MenuLeft(topicList)}
        </div>
        <div className="slide col-6">
          <SimpleMap markers={targetList} topics={topicList} onClick={this.onClickMap} />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  targetList: array,
  topicList: array,
  loadTargets: func,
  loadTopics: func,
  addTarget: func
};

const mapState = state => ({
  authenticated: state.getIn(['session', 'authenticated']),
  topicList: state.getIn(['topic', 'topicList']),
  targetList: state.getIn(['target', 'targetList']),
  target: state.getIn(['target', 'target'])
});

const mapDispatch = dispatch => ({
  loadTargets: () => dispatch(loadTargets()),
  loadTopics: () => dispatch(loadTopics()),
  addTarget: target => dispatch(addTarget(target))
});

export default connect(mapState, mapDispatch)(HomePage);
