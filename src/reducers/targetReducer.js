import { fromJS } from 'immutable';
import * as actions from '../actions/actionTypes';

const initialState = fromJS({
  targetList: [],
  target: {}
});

export default function targetReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOAD_TARGETS_SUCCESS:
      return state.setIn(['targetList'], action.targets);
    case actions.LOAD_TARGETS_FAILED:
      return state.setIn(['targetList'], []);
    case actions.ADD_TARGET_SUCCESS:
      return state.setIn(['target'], action.target);
    case actions.ADD_TARGET_FAILED:
      return state.setIn(['target'], {});
    default:
      return state;
  }
}
