import {
  CODE_RUN_ERROR,
  CODE_RUN_SUCCESS,
  UPDATE_CODE,
  TOGGLE_MODAL,
  CODE_RUNNING
} from './types';

import runCodeInVM from '../helpers';

export const updateCode = code => ({ type: UPDATE_CODE, payload: code });

export const executeCode = code => async dispatch => {
  try {
    dispatch({ type: CODE_RUNNING });
    const result = await runCodeInVM(code);
    dispatch({ type: CODE_RUN_SUCCESS, payload: result });
  } catch (e) {
    dispatch({ type: CODE_RUN_ERROR, payload: e.toString() });
  }
};

export const toggleModal = () => ({ type: TOGGLE_MODAL });
