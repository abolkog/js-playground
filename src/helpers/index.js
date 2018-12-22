import vm from 'vm';
import { createStore } from 'redux';
import { transform } from 'babel-standalone';

const runCodeInVm = code => {
  return new Promise((resolve, reject) => {
    try {
      const transformed = transform(code, { presets: ['stage-0'] }).code;
      const result = vm.runInNewContext(transformed, {
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

export { runCodeInVm };
