import { ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react';
import useCodeRunner from './useCodeRunner';
import { AppActions } from 'context/Reducer';
import { AppContext } from 'context/AppContext';

describe('useCodeRunner', () => {
  const state = {} as AppState;
  let dispatch: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    dispatch = jest.fn();
  });

  const createWrapper = ({ children }: { children: ReactNode }) => (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );

  it('should dispatch CODE_RUNNING and CODE_RUN_SUCCESS on valid code', async () => {
    const { result } = renderHook(() => useCodeRunner(), {
      wrapper: createWrapper,
    });

    const code = 'const a = 2 + 2; a;';

    await act(async () => {
      await result.current.runCode(code);
    });

    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: AppActions.CODE_RUNNING,
    });

    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: AppActions.CODE_RUN_SUCCESS,
      payload: 4,
    });
  });

  it('should dispatch CODE_RUN_ERROR on invalid code', async () => {
    const { result } = renderHook(() => useCodeRunner(), {
      wrapper: createWrapper,
    });

    const code = 'throw new Error("Invalid code dude");';

    await act(async () => {
      await result.current.runCode(code);
    });

    expect(dispatch).toHaveBeenCalledWith({ type: AppActions.CODE_RUNNING });
    expect(dispatch).toHaveBeenCalledWith({
      type: AppActions.CODE_RUN_ERROR,
      payload: 'Invalid code dude',
    });
  });
});
