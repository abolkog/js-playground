import _ from 'lodash';

import {
  CODE_SUCCESS,
  CODE_ERROR,
  TOGGLE_MODAL,
  CONSOLE_LOG
} from '../actions/types';

const INITIAL_STATE = {
  result: null,
  logs: [],
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
    case CONSOLE_LOG:
      //TODO: Change Using array
      const message = action.payload;
      const { logs } = state;
      if (!_.includes(logs, message)) {
        logs.push(message);
      }

      return { ...state, logs };
    default:
      return state;
  }
};
