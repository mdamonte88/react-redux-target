import { SubmissionError } from 'redux-form/immutable';

import TargetApi from 'api/targetApi';

export const loadTargets = () =>
  async () => {
    try {
      await TargetApi.getTargets();
    } catch (err) {
      throw new SubmissionError(err.errors);
    }
  };

/*
  export const loadTargets =
  () => (dispatch) => {
    dispatch(getTargetsSent());
    return targetApi.getTargets().then(({ targets }) => {
      dispatch(getTargetsSuccess(targets));
    }).catch((err) => {
      dispatch(getTargetsFailure());
      throw (err);
    });
  };
  */