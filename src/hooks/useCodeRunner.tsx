import { useContext } from 'react';
import { transpile } from 'typescript';
import { AppContext } from 'context/AppContext';
import { AppActions } from 'context/Reducer';

const useCodeRunner = () => {
  const { dispatch } = useContext(AppContext);

  const evalCode = (code: string) =>
    new Promise((resolve, reject) => {
      try {
        const result = eval(code);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });

  const runCode = async (code: string) => {
    try {
      dispatch({ type: AppActions.CODE_RUNNING });
      const result = await evalCode(transpile(code));
      dispatch({ type: AppActions.CODE_RUN_SUCCESS, payload: result });
    } catch (e) {
      dispatch({
        type: AppActions.CODE_RUN_ERROR,
        payload: (e as Error).message,
      });
    }
  };

  return { runCode };
};

export default useCodeRunner;
