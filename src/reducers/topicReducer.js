import { fromJS } from 'immutable';
import * as actions from '../actions/actionTypes';

const initialState = fromJS({
  topicList: [],
});

export default function topicReducer(state = initialState, { type, topics }) {
  switch (type) {
    case actions.LOAD_TOPICS_SUCCESS:
      return state.setIn(['topicList'], fromJS(topics));
    case actions.LOAD_TOPICS_FAILED:
      return state.setIn(['topicList'], fromJS([]));
    default:
      return state;
  }
}
