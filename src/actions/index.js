import vm from 'vm';
import { createStore } from 'redux';
import { CODE_SUCCESS, CODE_ERROR, TOGGLE_MODAL } from './types';

const runCodeInVM = code =>
  new Promise((resolve, reject) => {
    try {
      const result = vm.runInNewContext(code, {
        console,
        setTimeout,
        Redux: { createStore }
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });

export const handleCode = async code => {
  try {
    const result = await runCodeInVM(code);
    return { type: CODE_SUCCESS, payload: result };
  } catch (e) {
    return { type: CODE_ERROR, payload: e.toString() };
  }
};
export const toggleModal = () => ({ type: TOGGLE_MODAL });
