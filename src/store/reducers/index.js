import { combineReducers } from 'redux';
import code from './code.reducer';
import common from './common.reducer';

export default combineReducers({
  code,
  common,
});
