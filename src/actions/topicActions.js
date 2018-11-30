import TopicApi from 'api/topicApi';
import * as actions from './actionTypes';

export const loadTopicsSuccess = topics => ({
  type: actions.LOAD_TOPICS_SUCCESS, topics
});

export const loadTopicsFailed = errors => ({
  type: actions.LOAD_TOPICS_FAILED, errors
});

export const loadTopics = () =>
  (dispatch) => {
    TopicApi.getTopics().then((data) => {
      dispatch(loadTopicsSuccess(data.topics));
    }).catch((error) => {
      dispatch(loadTopicsFailed(error));
    });
  };
