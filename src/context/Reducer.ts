import { saveToHistory, setLocalStorage, STORAGE } from 'services/storage';

export const AppActions = {
  UPDATE_CODE: 'UPDATE_CODE',
  EXECUTE_CODE: 'EXECUTE_CODE',
  CODE_RUNNING: 'CODE_RUNNING',
  CODE_RUN_SUCCESS: 'CODE_RUN_SUCCESS',
  CODE_RUN_ERROR: 'CODE_RUN_ERROR',
  TOGGLE_ABOUT_MODAL: 'TOGGLE_ABOUT_MODAL',
  TOGGLE_JSON_VIEW: 'TOGGLE_JSON_VIEW',
  TOGGLE_THEME: 'TOGGLE_THEME',
  CLEAR_RESULT: 'CLEAR_RESULT',
  LOAD_CODE_SAMPLE: 'LOAD_CODE_SAMPLE',
  TOGGLE_HISTORY_MODAL: 'TOGGLE_HISTORY_MODAL',
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

const handleCodeRunning = (state: AppState): AppState => {
  saveToHistory(state.code);
  return { ...state, loading: true };
};

const setAppTheme = (state: AppState, action: Action) => {
  setLocalStorage(STORAGE.THEME, action.payload as string);
  return { ...state, theme: action.payload as Theme };
};

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case AppActions.UPDATE_CODE:
      return handleCodeUpdate(state, action);
    case AppActions.CODE_RUNNING:
      return handleCodeRunning(state);
    case AppActions.CODE_RUN_SUCCESS:
      return handleCodeSuccess(state, action);
    case AppActions.CODE_RUN_ERROR:
      return { ...state, error: action.payload as string, loading: false };
    case AppActions.TOGGLE_ABOUT_MODAL:
      return { ...state, display: action.payload as DisplayType };
    case AppActions.TOGGLE_JSON_VIEW:
      return { ...state, jsonView: action.payload as DisplayType };
    case AppActions.TOGGLE_THEME:
      return setAppTheme(state, action);
    case AppActions.LOAD_CODE_SAMPLE:
      return handleLoadCodeSample(state, action);
    case AppActions.CLEAR_RESULT:
      return { ...state, result: [] };
    case AppActions.TOGGLE_HISTORY_MODAL:
      return { ...state, historyModalShown: !state.historyModalShown };
    default:
      return state;
  }
};
