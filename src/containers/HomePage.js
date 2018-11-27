import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { array, func, obj } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Menu from 'components/common/Menu';
import LogoutButton from 'components/user/LogoutButton';
import SimpleMap from 'components/common/maps/Map';
import Welcome from 'components/user/Welcome';
import CreateTargetForm from 'components/user/CreateTargetForm';
import { loadTargets, addTarget, selectTarget, removeTarget } from '../actions/targetActions';
import { loadTopics } from '../actions/topicActions';
import './../styles/responsive-styles.scss';

class HomePage extends PureComponent {
  static propTypes = {
    targetList: array,
    topicList: array,
    loadTargets: func,
    loadTopics: func,
    selectTarget: func,
    deleteTarget: func,
    addTarget: func.isRequired
  };

  constructor() {
    super();
    this.onClickMap = this.onClickMap.bind(this);
    this.onClickTarget = this.onClickTarget.bind(this);
    this.handleCreateTarget = this.handleCreateTarget.bind(this);
  }

  state = {
    targetPosition: {},
    isCreatingNewTarget: false,
    isDeletingTarget: false
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

  /* Parameters { childProps } */
  onClickTarget = (key, childProps) => {
    const { targetList } = this.props;
    const targetToRem = targetList.find(item => ((item.target.id === parseInt(key, 10))));

    this.props.selectTarget(targetToRem ? targetToRem.target : {});
    this.setState({ isDeletingTarget: true });
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
    return this.props.addTarget(targetCompleted);
  }

  handleDeleteTarget = (data) => {
    const { id } = data.toJS();
    this.props.deleteTarget(id);
  }

  MenuLeft() {
    const { isDeletingTarget } = this.state;
    return this.state.isCreatingNewTarget ?
      (
        <div>
          <div className="headerContent">
            <FormattedMessage id="target.title.createTarget" />
          </div>
          <div className="content create-target">
            <CreateTargetForm
              onSubmit={isDeletingTarget ? this.handleDeleteTarget : this.handleCreateTarget}
              isDeletingTarget={isDeletingTarget}
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
          {this.MenuLeft()}
        </div>
        <div className="slide col-6 slideCenter">
          <SimpleMap
            markers={targetList}
            topics={topicList}
            onClick={this.onClickMap}
            onChildClick={this.onClickTarget}
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
  addTarget: target => dispatch(addTarget(target)),
  selectTarget: target => dispatch(selectTarget(target)),
  deleteTarget: target => dispatch(removeTarget(target))
});

export default connect(mapState, mapDispatch)(HomePage);
