import { CODE_SUCCESS, CODE_ERROR } from '../actions/types';

const INITIAL_STATE = {
  result: [],
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CODE_SUCCESS:
      return { ...state, result: action.payload, error: null };
    case CODE_ERROR:
      return { ...state, error: action.payload, result: [] };
    default:
      return state;
  }
};
