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

export const deleteTargetSuccess = index => ({
  type: actions.REMOVE_TARGET_SUCCESS, index
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
    dispatch((target && target.id ? selectedTarget : unSelectedTarget)(target));
    dispatch(deleteFutureTarget());
  };

export const newTarget = target =>
  (dispatch) => {
    dispatch(unSelectedTarget(target));
    dispatch(addOrUpdateFutureTarget(target));
  };

export const removeTarget = (target, index) =>
  async (dispatch) => {
    try {
      await TargetApi.deleteTarget(target);
      dispatch(deleteTargetSuccess(index));
    } catch (err) {
      throw new SubmissionError({ _error: err });
    }
  };

