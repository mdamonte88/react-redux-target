import { fromJS } from 'immutable';
import * as actions from '../actions/actionTypes';

const initialState = fromJS({
  targetList: [],
  target: {}
});

export default function targetReducer(
  state = initialState,
  { type, targets, target = {}, index }
) {
  switch (type) {
    case actions.LOAD_TARGETS_SUCCESS:
      return state.setIn(['targetList'], fromJS(targets));
    case actions.LOAD_TARGETS_FAILED:
      return state.setIn(['targetList'], fromJS([]));
    case actions.ADD_OR_UPDATE_FUTURE_TARGET: {
      const lastTarget = (state.get('targetList').size > 0 ? state.getIn(['targetList', -1]).toJS() : {}).target;
      const isAFutureTarget = lastTarget && lastTarget.id === -1;
      return isAFutureTarget ? state.setIn(['targetList', -1], fromJS(target)) :
        state.set('targetList', state.get('targetList').push(fromJS(target)));
    }
    case actions.REMOVE_FUTURE_TARGET: {
      const lastTarget = (state.get('targetList').size > 0 ? state.getIn(['targetList', -1]).toJS() : {}).target;
      const isAFutureTarget = lastTarget && lastTarget.id === -1;
      const futureTarget = isAFutureTarget ? lastTarget : undefined;
      return futureTarget ? state.set('targetList', state.getIn(['targetList']).remove(-1)) :
        state;
    }
    case actions.ADD_TARGET_SUCCESS:
      return state.set('targetList', state.get('targetList').push(fromJS(target)));
    case actions.ADD_TARGET_FAILED:
      return state.set('target', fromJS({}));
    case actions.SELECT_TARGET:
      return state.set('target', fromJS(target));
    case actions.UNSELECT_TARGET:
      return state.set('target', fromJS({}));
    case actions.REMOVE_TARGET_SUCCESS:
      return state.set('targetList', state.get('targetList').remove(index));
    default:
      return state;
  }
}
