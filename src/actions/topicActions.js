import TopicApi from 'api/topicApi';
import * as actions from './actionTypes';

export const loadTopicsSuccess = topics => ({
  type: actions.LOAD_TOPICS_SUCCESS, topics
});

export const loadTopicsFailed = errors => ({
  type: actions.LOAD_TOPICS_FAILED, errors
});

export const loadTopics = () =>
  async (dispatch) => {
    try {
      const topicsResponse = await TopicApi.getTopics();
      dispatch(loadTopicsSuccess(topicsResponse.topics));
    } catch (err) {
      dispatch(loadTopicsFailed(err));
    }
  };
