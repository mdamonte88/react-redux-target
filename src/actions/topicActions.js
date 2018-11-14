import { SubmissionError } from 'redux-form/immutable';

import TopicApi from 'api/topicApi';
import * as actions from './actionTypes';

export const loadTopicsSuccess = topics => ({
  type: actions.LOAD_TOPICS_SUCCESS, topics
});

export const loadTopics = () =>
  async (dispatch) => {
    try {
      await TopicApi.getTopics().then((data) => {
        dispatch(loadTopicsSuccess(data.topics));
      });
    } catch (err) {
      throw new SubmissionError(err.errors);
    }
  };
