import { SubmissionError } from 'redux-form/immutable';

import TargetApi from 'api/targetApi';
import * as actions from './actionTypes';

export const loadTargetsSuccess = targets => ({
  type: actions.LOAD_TARGETS_SUCCESS, targets
});

export const loadTargets = () =>
  async (dispatch) => {
    try {
      await TargetApi.getTargets().then((data) => {
        dispatch(loadTargetsSuccess(data.targets));
      });
    } catch (err) {
      throw new SubmissionError(err.errors);
    }
  };