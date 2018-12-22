import vm from 'vm';
import { createStore } from 'redux';
import { transform } from 'babel-standalone';
import { CODE_SUCCESS, CODE_ERROR, TOGGLE_MODAL } from './types';

export const handleCode = code => {
  return async dispatch => {
    try {
      const transformed = transform(code, { presets: ['stage-0'] }).code;
      const result = await runCodeInVM(transformed);
      dispatch({ type: CODE_SUCCESS, payload: result });
    } catch (e) {
      dispatch({ type: CODE_ERROR, payload: e.toString() });
    }
  };
};

const runCodeInVM = code => {
  return new Promise((resolve, reject) => {
    try {
      const result = vm.runInNewContext(code, {
        console: console,
        setTimeout: setTimeout,
        Redux: { createStore }
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

export const toggleModal = () => ({ type: TOGGLE_MODAL });
