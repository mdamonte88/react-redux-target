import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { array, func, object } from 'prop-types';
import Menu from 'components/common/Menu';
import SimpleMap from 'components/common/maps/Map';
import MenuLeft from 'components/user/MenuLeft';
import routes from 'constants/routesPaths';
import { SECTION_TYPES as sections } from '../constants/constants';
import { loadTargets, addTarget, selectTarget, removeTarget } from '../actions/targetActions';
import { loadTopics } from '../actions/topicActions';
import './../styles/responsive-styles.scss';

class HomePage extends PureComponent {
  static propTypes = {
    targetList: array,
    topicList: array,
    loadTargets: func,
    loadTopics: func,
    addTarget: func.isRequired,
    selectTarget: func,
    deleteTarget: func,
    history: object.isRequired
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
    this.props.selectTarget({});
    this.setState({ targetPosition, isCreatingNewTarget: true, isDeletingTarget: false });
    this.showOrHideTargetSelected();
  }
  
  /* Parameters { childProps } */
  onClickTarget = (key) => {
    const { targetList } = this.props;
    const targetToRem = targetList.find(item => ((item.target.id === parseInt(key, 10))));

    this.props.selectTarget(targetToRem ? targetToRem.target : {});
    this.setState({ isDeletingTarget: true, isCreatingNewTarget: false });

    this.showOrHideTargetSelected(key);
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
    const target = data.toJS();
    const { targetList } = this.props;
    const index = targetList.findIndex(item => ((item.target.id === parseInt(target.id, 10))));
    if (index >= 0) {
      this.props.deleteTarget(target, index);
    }
  }

  showOrHideTargetSelected = (key) => {
    const oldSelectedElements = document.getElementsByClassName('marker-point__selected');
    const selectedElement = key ? document.getElementById(`target-${key}`) : '';

    // Manipulation Dom
    if (oldSelectedElements.length > 0) {
      oldSelectedElements[0].className = 'marker-point';
    }

    if (selectedElement) {
      selectedElement.className = 'marker-point__selected';
    }
  }

  render() {
    const { targetList, topicList, history } = this.props;
    const { isCreatingNewTarget, isDeletingTarget } = this.state;
    const { location } = history;
    const isAboutPage = location.pathname === routes.about;
    const showMenu = !isAboutPage && !isCreatingNewTarget;
    const { aboutTarget, newTarget, welcome } = sections;
    let section = (isCreatingNewTarget || isDeletingTarget) ? newTarget : welcome;
    section = isAboutPage ? aboutTarget : section;

    return (
      <div className="slides-container homepage">
        <Menu show={showMenu} />
        <MenuLeft
          topicList={topicList}
          title="target.title.createTarget"
          handleCreateTarget={this.handleCreateTarget}
          handleDeleteTarget={this.handleDeleteTarget}
          section={section}
          history={history}
          isDeletingTarget={isDeletingTarget}
        />
        <div className="slide slideCenter col-6">
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
  deleteTarget: (target, index) => dispatch(removeTarget(target, index))
});

export default connect(mapState, mapDispatch)(HomePage);
