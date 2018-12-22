import { CODE_SUCCESS, CODE_ERROR, TOGGLE_MODAL } from '../actions/types';

const INITIAL_STATE = {
  result: null,
  error: null,
  display: 'none'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CODE_SUCCESS:
      return { ...state, result: action.payload, error: null };
    case CODE_ERROR:
      return { ...state, error: action.payload, result: null };
    case TOGGLE_MODAL:
      const display = state.display === 'none' ? 'block' : 'none';
      return { ...state, display };
    default:
      return state;
  }
};
