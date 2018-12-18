import { CODE_SUCCESS, CODE_ERROR } from '../actions/types';

const INITIAL_STATE = {
  result: null,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CODE_SUCCESS:
      return { ...state, result: action.payload, error: null };
    case CODE_ERROR:
      return { ...state, error: action.payload, result: null };
    default:
      return state;
  }
};
