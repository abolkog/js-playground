import { createContext, useMemo, useReducer } from 'react';
import { getLocalStorage, STORAGE } from 'services/storage';
import { reducer } from 'context/Reducer';

const initialState: AppState = {
  code: getLocalStorage(STORAGE.CODE),
  codeSample: '',
  codeSampleName: '',
  result: [],
  error: '',
  loading: false,
  theme: 'vs-dark',
  display: 'none',
  position: null,
  jsonView: 'none',
};

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export const AppProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
