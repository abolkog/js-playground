import { saveToHistory, setLocalStorage, STORAGE } from 'services/storage';

export const AppActions = {
  UPDATE_CODE: 'UPDATE_CODE',
  EXECUTE_CODE: 'EXECUTE_CODE',
  CODE_RUNNING: 'CODE_RUNNING',
  CODE_RUN_SUCCESS: 'CODE_RUN_SUCCESS',
  CODE_RUN_ERROR: 'CODE_RUN_ERROR',
  TOGGLE_ABOUT_MODAL: 'TOGGLE_ABOUT_MODAL',
  CLEAR_RESULT: 'CLEAR_RESULT',
  LOAD_CODE_SAMPLE: 'LOAD_CODE_SAMPLE',
  TOGGLE_HISTORY_MODAL: 'TOGGLE_HISTORY_MODAL',
  SHOW_SIDEBAR: 'SHOW_SIDEBAR',
  HIDE_SIDEBAR: 'HIDE_SIDEBAR',
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
  return { ...state, error: '', result, loading: false, sidebarOpen: false };
};

const handleLoadCodeSample = (state: AppState, action: Action): AppState => {
  const { codeSample, codeSampleName } = action.payload as Record<
    string,
    string
  >;
  return { ...state, codeSample, codeSampleName, sidebarOpen: false };
};

const handleCodeRunning = (state: AppState): AppState => {
  saveToHistory(state.code);
  return { ...state, loading: true };
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
      return {
        ...state,
        sidebarOpen: false,
        display: action.payload as DisplayType,
      };
    case AppActions.LOAD_CODE_SAMPLE:
      return handleLoadCodeSample(state, action);
    case AppActions.CLEAR_RESULT:
      return { ...state, sidebarOpen: false, result: [] };
    case AppActions.TOGGLE_HISTORY_MODAL:
      return {
        ...state,
        sidebarOpen: false,
        historyModalShown: !state.historyModalShown,
      };
    case AppActions.SHOW_SIDEBAR:
      return { ...state, sidebarOpen: true };
    case AppActions.HIDE_SIDEBAR:
      return { ...state, sidebarOpen: false };
    default:
      return state;
  }
};
