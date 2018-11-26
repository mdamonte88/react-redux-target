import TargetApi from 'api/targetApi';
import * as actions from './actionTypes';

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
  async (dispatch) => {
    await TargetApi.getTargets().then((data) => {
      dispatch(loadTargetsSuccess(data.targets));
    }).catch((error) => {
      dispatch(loadTargetsFailed(error));
    });
  };

export const addTarget = target =>
  async (dispatch) => {
    await TargetApi.createTarget(target).then((data) => {
      dispatch(addTargetSuccess(data.target));
    }).catch((error) => {
      dispatch(addTargetFailed(error));
    });
  };

