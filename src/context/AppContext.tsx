import { createContext, useMemo, useReducer } from 'react';
import { getLocalStorage } from 'services/storage';
import { STORAGE } from 'helpers/const';
import { reducer } from 'context/Reducer';

const initialState: AppState = {
  code: getLocalStorage(STORAGE.CODE),
  codeSample: '',
  codeSampleName: '',
  result: [],
  error: '',
  shareUrl: '',
  loading: false,
  sidebarOpen: false,
  historyOpen: false,
  aboutModalOpen: false,
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
