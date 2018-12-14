import { SubmissionError } from 'redux-form/immutable';
import TargetApi from 'api/targetApi';
import * as actions from './actionTypes';

export const loadTargetsSuccess = targets => ({
  type: actions.LOAD_TARGETS_SUCCESS, targets
});

export const loadTargetsFailed = errors => ({
  type: actions.LOAD_TARGETS_FAILED, errors
});

export const addOrUpdateFutureTarget = target => ({
  type: actions.ADD_OR_UPDATE_FUTURE_TARGET, target
});

export const deleteFutureTarget = () => ({
  type: actions.REMOVE_FUTURE_TARGET
});

export const addTargetSuccess = target => ({
  type: actions.ADD_TARGET_SUCCESS, target
});

export const addTargetFailed = errors => ({
  type: actions.ADD_TARGET_FAILED, errors
});

export const selectedTarget = target => ({
  type: actions.SELECT_TARGET, target
});

export const unSelectedTarget = () => ({
  type: actions.UNSELECT_TARGET
});

export const deleteTargetSuccess = (target, index) => ({
  type: actions.REMOVE_TARGET_SUCCESS, target, index
});

export const loadTargets = () =>
  async (dispatch) => {
    try {
      const responseTargets = await TargetApi.getTargets();
      dispatch(loadTargetsSuccess(responseTargets.targets));
    } catch (err) {
      dispatch(loadTargetsFailed(err));
    }
  };

export const addTarget = target =>
  async (dispatch) => {
    try {
      const targetResponse = await TargetApi.createTarget(target);
      dispatch(deleteFutureTarget());
      dispatch(addTargetSuccess(targetResponse));
    } catch (err) {
      if (err.error) {
        throw new SubmissionError({ _error: err.error });
      } else if (err.errors) {
        const { targetsLimit, user } = err.errors;
        const [errorMessage = ''] = user || targetsLimit;
        dispatch(addTargetFailed(err.errors));
        throw new SubmissionError({ _error: errorMessage });
      }
    }
  };

export const selectTarget = target =>
  (dispatch) => {
<<<<<<< HEAD
<<<<<<< HEAD
    dispatch((target && target.id ? selectedTarget : unSelectedTarget)(target));
=======
    dispatch(deleteTargetSuccess({}, -1));
=======
    dispatch(deleteFutureTarget());
>>>>>>> Added action to delete the future target clicked on the map
    dispatch(target && target.id ? selectedTarget(target) : unSelectedTarget(target));
>>>>>>> delete the future target when I selected any target on the map
  };

export const newTarget = target =>
  (dispatch) => {
    dispatch(unSelectedTarget(target));
    dispatch(addOrUpdateFutureTarget(target));
  };

export const removeTarget = (target, index) =>
  async (dispatch) => {
    try {
      const targetResponse = await TargetApi.deleteTarget(target);
      dispatch(deleteTargetSuccess(targetResponse, index));
    } catch (err) {
      throw new SubmissionError({ _error: err });
    }
  };

