import { CONSOLE_LOG } from '../actions/types';

const INITIAL_STATE = {
  history: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSOLE_LOG:
      const { history } = state;
      if (action.payload) history.push(action.payload);
      return { ...state, history };
    default:
      return state;
  }
};
