import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { array, func } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Menu from 'components/common/Menu';
import LogoutButton from 'components/user/LogoutButton';
import SimpleMap from 'components/common/maps/Map';
import Welcome from 'components/user/Welcome';
import CreateTargetForm from 'components/user/CreateTargetForm';
import { loadTargets, addTarget } from '../actions/targetActions';
import { loadTopics } from '../actions/topicActions';
import './../styles/responsive-styles.scss';

class HomePage extends PureComponent {
  static propTypes = {
    targetList: array,
    topicList: array,
    loadTargets: func,
    loadTopics: func,
    addTarget: func.isRequired
  };

  constructor() {
    super();
    this.onClickMap = this.onClickMap.bind(this);
    this.handleCreateTarget = this.handleCreateTarget.bind(this);
  }

  state = {
    targetPosition: {},
    isCreatingNewTarget: false,
  };

  componentDidMount() {
    this.props.loadTargets();
    this.props.loadTopics();
  }

  /* Parameters { x, y, lat, lng, event } */
  onClickMap = ({ lat, lng }) => {
    const targetPosition = {
      lat,
      lng
    };
    this.setState({ targetPosition, isCreatingNewTarget: true });
  }

  handleCreateTarget = (data) => {
    const { title, radius, topicId } = data.toJS();
    const { lat, lng } = this.state.targetPosition;
    const targetCompleted = {
      target: {
        lat,
        lng,
        title,
        radius,
        topicId: topicId[0]
      }
    };
    this.props.addTarget(targetCompleted);
  }

  MenuLeft(topicList) {
    return this.state.isCreatingNewTarget ?
      (
        <div>
          <div className="headerContent">
            <FormattedMessage id="target.title.createTarget" />
          </div>
          <div className="content create-target">
            <CreateTargetForm
              onSubmit={this.handleCreateTarget}
              topics={topicList}
            />
          </div>
        </div>
      ) :
      (
        <div>
          <Welcome currentPage="Home" />
          <div className="content">
            <LogoutButton className="sign-in-button" />
          </div>
        </div>
      );
  }

  render() {
    const { targetList, topicList } = this.props;

    return (
      <div className="slides-container homepage">
        <Menu />
        <div className="slide col-6 slideLeft">
          {this.MenuLeft(topicList)}
        </div>
        <div className="slide col-6 slideCenter">
          <SimpleMap
            markers={targetList}
            topics={topicList}
            onClick={this.onClickMap}
          />
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  authenticated: state.getIn(['session', 'authenticated']),
  topicList: state.getIn(['topic', 'topicList']).toJS(),
  targetList: state.getIn(['target', 'targetList']).toJS(),
  target: state.getIn(['target', 'target']).toJS()
});

const mapDispatch = dispatch => ({
  loadTargets: () => dispatch(loadTargets()),
  loadTopics: () => dispatch(loadTopics()),
  addTarget: target => dispatch(addTarget(target))
});

export default connect(mapState, mapDispatch)(HomePage);
