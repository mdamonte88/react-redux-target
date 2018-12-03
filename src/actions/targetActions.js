import TargetApi from 'api/targetApi';
import * as actions from './actionTypes';
import { SubmissionError } from 'redux-form/immutable';

export const loadTargetsSuccess = targets => ({
  type: actions.LOAD_TARGETS_SUCCESS, targets
});

export const loadTargetsFailed = errors => ({
  type: actions.LOAD_TARGETS_FAILED, errors
});

export const addTargetSuccess = target => ({
  type: actions.ADD_TARGET_SUCCESS, target
});

export const addTargetFailed = errors => ({
  type: actions.ADD_TARGET_FAILED, errors
});

export const loadTargets = () =>
  (dispatch) => {
    TargetApi.getTargets().then((data) => {
      dispatch(loadTargetsSuccess(data.targets));
    }).catch((error) => {
      dispatch(loadTargetsFailed(error));
    });
  };

export const addTarget = target =>
  async () => {
    try {
      await TargetApi.createTarget(target);
    } catch (err) {
      if (err.error) {
        throw new SubmissionError({ _error: err.error });
      } else if (err.errors) {
        const { targetsLimit } = err.errors;
        const [limitMessage = ''] = targetsLimit;
        throw new SubmissionError({ _error: limitMessage });
      }
    }
  };

