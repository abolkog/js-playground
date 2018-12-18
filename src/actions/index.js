import { CODE_SUCCESS, CODE_ERROR } from './types';
import { transform } from 'babel-standalone';

export const handleCode = code => {
  try {
    const transformed = transform(code, { presets: ['stage-0'] }).code;
    const result = eval(transformed);
    return { type: CODE_SUCCESS, payload: result };
  } catch (e) {
    return { type: CODE_ERROR, payload: e.toString() };
  }
};
