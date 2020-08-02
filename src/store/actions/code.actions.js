import { codeTypes } from '../types';
import runCodeInVM from '../../helpers';

const updateCode = code => ({ type: codeTypes.UPDATE_CODE, payload: code });

const loadCodeSample = (sampleName, sample) => ({
  type: codeTypes.LOAD_CODE_SAMPLE,
  payload: { sample, sampleName },
});

const executeCode = code => async dispatch => {
  try {
    dispatch({ type: codeTypes.CODE_RUNNING });
    const result = await runCodeInVM(code);
    dispatch({ type: codeTypes.CODE_RUN_SUCCESS, payload: result });
  } catch (e) {
    dispatch({ type: codeTypes.CODE_RUN_ERROR, payload: e.toString() });
  }
};

const updateEditorTheme = theme => ({ type: codeTypes.UPDATE_EDITOR_THEME, payload: theme });

export const codeActions = {
  updateCode,
  executeCode,
  updateEditorTheme,
  loadCodeSample,
};
