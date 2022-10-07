import { setLocalStorage, STORAGE } from 'services/storage';

export const AppAactions = {
  UPDATE_CODE: 'UPDATE_CODE',
  EXECUTE_CODE: 'EXECUTE_CODE',
  CODE_RUNNING: 'CODE_RUNNING',
  CODE_RUN_SUCCESS: 'CODE_RUN_SUCCESS',
  CODE_RUN_ERROR: 'CODE_RUN_ERROR',
  TOGGLE_ABOUT_MODAL: 'TOGGLE_ABOUT_MODAL',
  TOGGLE_JSON_VIEW: 'TOGGLE_JSON_VIEW',
  TOGGLE_THEME: 'TOGGLE_THEME',
  CLEAR_RESULT: 'CLEAR_RESULT',
  RESET_ALL: 'RESET_ALL',
  LOAD_CODE_SAMPLE: 'LOAD_CODE_SAMPLE',
};

const handleCodeUpdate = (state: AppState, action: Action): AppState => {
  const code = action.payload as string;
  setLocalStorage(STORAGE.CODE, code);
  return { ...state, code };
};

const handleCodeSuccess = (state: AppState, action: Action): AppState => {
  const { result } = state;
  if (action.payload) {
    result.push(action.payload);
  }
  return { ...state, error: '', result, loading: false };
};

const handleLoadCodeSample = (state: AppState, action: Action): AppState => {
  const { codeSample, codeSampleName } = action.payload as Record<
    string,
    string
  >;
  return { ...state, codeSample, codeSampleName };
};

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case AppAactions.UPDATE_CODE:
      return handleCodeUpdate(state, action);
    case AppAactions.CODE_RUNNING:
      return { ...state, loading: true };
    case AppAactions.CODE_RUN_SUCCESS:
      return handleCodeSuccess(state, action);
    case AppAactions.CODE_RUN_ERROR:
      return { ...state, error: action.payload as string, loading: false };
    case AppAactions.TOGGLE_ABOUT_MODAL:
      return { ...state, display: action.payload as DisplayType };
    case AppAactions.TOGGLE_JSON_VIEW:
      return { ...state, jsonView: action.payload as DisplayType };
    case AppAactions.TOGGLE_THEME:
      return { ...state, theme: action.payload as Theme };
    case AppAactions.LOAD_CODE_SAMPLE:
      return handleLoadCodeSample(state, action);
    case AppAactions.CLEAR_RESULT:
      return { ...state, result: [] };
    case AppAactions.RESET_ALL:
      return {
        ...state,
        codeSample: '',
        codeSampleName: '',
        result: [],
        error: '',
        loading: false,
      };
    default:
      return state;
  }
};
