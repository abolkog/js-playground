import { combineReducers } from 'redux';
import code from './CodeReducer';
import logs from './LogReducer';

export default combineReducers({
  code,
  logs
});
