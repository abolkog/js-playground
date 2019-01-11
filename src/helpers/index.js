import vm from 'vm';
import { createStore } from 'redux';
import axios from 'axios';

const sandbox = {
  axios,
  console,
  setTimeout,
  Redux: { createStore }
};

const runCodeInVM = code =>
  new Promise((resolve, reject) => {
    try {
      const context = vm.createContext(sandbox);
      const result = vm.runInContext(code, context);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });

export default runCodeInVM;
