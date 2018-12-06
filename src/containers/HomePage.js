import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { array, func, object } from 'prop-types';
import Menu from 'components/common/Menu';
import SimpleMap from 'components/common/maps/Map';
import MenuLeft from 'components/user/MenuLeft';
import { loadTargets, addTarget } from '../actions/targetActions';
import { loadTopics } from '../actions/topicActions';
import './../styles/responsive-styles.scss';

class HomePage extends PureComponent {
  static propTypes = {
    targetList: array,
    topicList: array,
    loadTargets: func,
    loadTopics: func,
    addTarget: func.isRequired,
    history: object.isRequired
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
    return this.props.addTarget(targetCompleted);
  }

  render() {
    const { targetList, topicList, history } = this.props;
    const { isCreatingNewTarget } = this.state;
    const { location } = history;
    let section = isCreatingNewTarget ? 'newTarget' : 'welcome';
    section = location.pathname === '/about' ? 'aboutTarget' : section;
    const showMenu = section !== 'aboutTarget' && !isCreatingNewTarget;

    return (
      <div className="slides-container homepage">
        <Menu show={showMenu} />
        <MenuLeft
          topicList={topicList}
          title="target.title.createTarget"
          handleCreateTarget={this.handleCreateTarget}
          section={section}
          history={history}
        />
        <div className="slide slideCenter col-6">
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
