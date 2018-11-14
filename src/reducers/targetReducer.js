import { fromJS } from 'immutable';
import * as actions from '../actions/actionTypes';

const initialState = fromJS({
  targetList: [],
});

export default function targetReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOAD_TARGETS_SUCCESS:
      return state.setIn(['targetList'], action.targets);
    case actions.LOAD_TARGETS_FAILED:
      return [];
    default:
      return state;
  }
}
