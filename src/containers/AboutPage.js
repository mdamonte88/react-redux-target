import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { array, func } from 'prop-types';
import SimpleMap from 'components/common/maps/Map';
import Menu from 'components/user/MenuLeft';
import { loadTargets, addTarget } from '../actions/targetActions';
import { loadTopics } from '../actions/topicActions';

class AboutPage extends PureComponent {
  static propTypes = {
    targetList: array,
    topicList: array,
    loadTargets: func,
    loadTopics: func,
    addTarget: func
  };

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
        topic_id: topicId[0]
      }
    };
    this.props.addTarget(targetCompleted);
  }

  render() {
    const { targetList, topicList } = this.props;

    return (
      <div className="slidesContainer aboutpage">
        <Menu topicList={topicList} title="target.title.whatsTarget" section="aboutTarget" />
        <div className="slide slideCenter col-6">
          <SimpleMap markers={targetList} topics={topicList} onClick={this.onClickMap} />
        </div>
      </div>
    );
  }
}

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

export default connect(mapState, mapDispatch)(AboutPage);
