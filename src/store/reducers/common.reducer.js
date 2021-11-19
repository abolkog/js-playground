import { commonTypes } from '../types';

const INITIAL_STATE = {
  history: [],
  display: 'none',
  position: null,
  jsonView: 'none',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case commonTypes.CONSOLE_LOG:
      const { history } = state;
      history.push(action.payload);
      return { ...state, history };
    case commonTypes.CLEAR_HISTORY:
      return { ...state, history: [] };
    case commonTypes.TOGGLE_MODAL:
      const display = state.display === 'none' ? 'block' : 'none';
      return { ...state, display };
    case commonTypes.TOGGLE_JSON_VIEW:
      const jsonView = state.jsonView === 'none' ? 'block' : 'none';
      return { ...state, jsonView };

    default:
      return state;
  }
};
