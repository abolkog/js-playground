import { createContext, useMemo, useReducer } from 'react';
import { getLocalStorage, STORAGE } from 'services/storage';
import { reducer } from 'context/Reducer';

const initialState: AppState = {
  sidebarOpen: false,
  code: getLocalStorage(STORAGE.CODE),
  codeSample: '',
  codeSampleName: '',
  result: [],
  error: '',
  loading: false,
  display: 'none',
  historyOpen: false,
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
