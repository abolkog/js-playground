import { useContext } from 'react';
import { AppContext } from 'context/AppContext';
import { AppAactions } from 'context/Reducer';

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
      dispatch({ type: AppAactions.CODE_RUNNING });
      const result = await evalCode(code);
      dispatch({ type: AppAactions.CODE_RUN_SUCCESS, payload: result });
    } catch (e) {
      dispatch({
        type: AppAactions.CODE_RUN_ERROR,
        payload: (e as Error).message,
      });
    }
  };

  return { runCode };
};

export default useCodeRunner;
