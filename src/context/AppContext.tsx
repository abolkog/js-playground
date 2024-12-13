import { createContext, useMemo, useReducer } from 'react';
import { getLocalStorage, STORAGE } from 'services/storage';
import { reducer } from 'context/Reducer';

const getTheme = (): Theme => {
  const themeFromStorage = getLocalStorage(STORAGE.THEME) as Theme;
  if (themeFromStorage === 'vs-dark' || themeFromStorage === 'vs-light')
    return themeFromStorage;
  return 'vs-dark';
};

const initialState: AppState = {
  code: getLocalStorage(STORAGE.CODE),
  codeSample: '',
  codeSampleName: '',
  result: [],
  error: '',
  loading: false,
  theme: getTheme(),
  display: 'none',
  position: null,
  jsonView: 'none',
  historyModalShown: false,
};

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export const AppProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
