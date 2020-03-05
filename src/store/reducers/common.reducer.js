import _ from 'lodash';
import { commonTypes } from '../types';

const INITIAL_STATE = {
  history: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case commonTypes.CONSOLE_LOG:
      const { history } = state;
      if (action.payload) {
        if (!_.isString(action.payload)) {
          history.push(JSON.stringify(action.payload));
        } else {
          history.push(action.payload);
        }
      }
      return { ...state, history };
    case commonTypes.CLEAR_HISTORY:
      return { ...state, history: [] };
    default:
      return state;
  }
};
