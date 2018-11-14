import { fromJS } from 'immutable';
import * as actions from '../actions/actionTypes';

const initialState = fromJS({
  topicList: [],
});

export default function topicReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOAD_TOPICS_SUCCESS:
      return state.setIn(['topicList'], action.topics);
    case actions.LOAD_TOPICS_FAILED:
      return [];
    default:
      return state;
  }
}
